import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';

const Login = lazy(() => import('./Login'));
const Entervalidation =lazy(()=>import("./Entervalidation"))
function App () {
  return (
    <Router>
      <div>
      {/* <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/registered">Registered</Link>
            </li>
          </ul> */}
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/entervalidation" component={Entervalidation} />
        </Switch>
      </Suspense>
      </div>
    </Router>
  );
}

export default App;
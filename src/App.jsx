import React, { lazy, Suspense } from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import history from "./utils/history";
import "./App.css";

const Login = lazy(() => import("./Login"));
const Entervalidation = lazy(() => import("./Entervalidation"));
const Page = lazy(() => import("./Page"));
function App() {
  return (
    <Router history={history}>
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
            <Route exact path="/page" component={Page} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;

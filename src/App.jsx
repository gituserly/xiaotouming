import React, { lazy, Suspense } from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import history from "./utils/history";
import "./App.css";

const Login = lazy(() => import("./pages/Login"));
const Entervalidation = lazy(() => import("./pages/Entervalidation"));
const Page = lazy(() => import("./pages/Page"));
const Mypage = lazy(() => import("./pages/Mypage"));
const Releaseinstant = lazy(() => import("./pages/Releaseinstant"));
const Instantdetails = lazy(() => import("./pages/Instantdetails"));
const Instantsquare = lazy(() => import("./pages/Instantsquare"));
function App() {
  return (
    <Router history={history}>

        {/* <ul>
            <li>ages
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
            <Route exact path="/mypage" component={Mypage} />
            
            <Route
              exact
              path="/mypage/releaseinstant"
              component={Releaseinstant}
            />
            <Route
              exact
              path="/mypage/instantdetails"
              component={Instantdetails}
            />
             <Route exact path="/mypage/instantsquare" component={Instantsquare} />
          </Switch>
        </Suspense>
  
    </Router>
  );
}

export default App;

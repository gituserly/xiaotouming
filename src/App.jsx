import React, { lazy, Suspense } from 'react'
import { Router, Switch, Route, Link } from 'react-router-dom'
import Loading from './components/loading'
import history from './utils/history'
import './App.css'

const Login = lazy(() => import('./pages/Login'))
const Entervalidation = lazy(() => import('./pages/Entervalidation'))
const Page = lazy(() => import('./pages/Page'))
const Mypage = lazy(() => import('./pages/Mypage'))
const Releaseinstant = lazy(() => import('./pages/Releaseinstant'))
const Instantdetails = lazy(() => import('./pages/Instantdetails'))
const Instantsquare = lazy(() => import('./pages/Instantsquare'))
const Message = lazy(() => import('./pages/Message'))
const Commentreply = lazy(() => import('./pages/Commentreply'))

function App() {
  return (
    <Router history={history}>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/entervalidation" component={Entervalidation} />
          <Route exact path="/page" component={Page} />
          <Route exact path="/mypage" component={Mypage} />
          <Route exact path="/" component={Mypage} />
          <Route exact path="/mypage/message" component={Message} />

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
          <Route
            exact
            path="/mypage/instantdetails/commentreply"
            component={Commentreply}
          />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App

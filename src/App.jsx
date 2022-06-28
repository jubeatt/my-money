import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import Home from "pages/Home"
import Login from "pages/Login";
import Signup from "pages/Signup";
import Nav from "components/Nav";
import { useAuthContext } from "hooks/useAuthContext";

export default function App() {
  const { isUserInit, user } = useAuthContext()
  return isUserInit ? (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Redirect to="/login" />}
        </Route>
        <Route path="/signup">
          {!user ? <Signup /> : <Redirect to="/" />}
        </Route>
        <Route path="/login">
          {!user ? <Login /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </BrowserRouter>
  ) : <></>
}
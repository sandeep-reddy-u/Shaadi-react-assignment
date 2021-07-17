import Header from "./components/header/header";
import LoginPage from "./components/login/login";
import ContactList from "./components/contacts/list";
import Styles from "./App.module.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [loginState, setLoginState] = useState(
    sessionStorage.getItem("loggedIn") === "true"
  );

  useEffect(() => {
    sessionStorage.setItem("loggedIn", loginState.toString());
  }, [loginState]);

  return (
    <div className={Styles.App}>
      <Header loginState={loginState} updateLoginState={setLoginState} />
      <div className={Styles["App-container"]}>
        <Router>
          <Switch>
            {loginState ? (
              <Route path="/home">
                <ContactList />
              </Route>
            ) : (
              <Route path="/login">
                <LoginPage updateLoginState={setLoginState} />
              </Route>
            )}

            <Redirect to={loginState ? "/home" : "/login"} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;

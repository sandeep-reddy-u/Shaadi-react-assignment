import { memo, useRef, useState } from "react";
import Styles from "./login.module.scss";

interface Props {
  updateLoginState: (state: boolean) => void;
}

function LoginPage(props: Props) {
  const { updateLoginState } = props;

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState("");

  async function validate() {
    await setError("");
    if (
      usernameRef.current?.validity.valid &&
      passwordRef.current?.validity.valid
    ) {
      if (
        usernameRef.current.value === "Test" &&
        passwordRef.current.value === "Test@123"
      ) {
        await updateLoginState(true);
      } else {
        await setError("Failed to login. Invalid credentials.");
      }
    } else {
      await setError("Username and Password cannot be empty");
    }
  }

  function handleChange() {
    setError("");
  }

  return (
    <div className={Styles["login-page"]}>
      <div className={Styles["login-form"]}>
        <label htmlFor="username">Username</label>
        <input
          ref={usernameRef}
          name="username"
          id="username"
          placeholder="Enter username here..."
          required={true}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          ref={passwordRef}
          name="password"
          id="password"
          type="password"
          placeholder="Enter password here..."
          required={true}
          onChange={handleChange}
        />
        {error && <sup className={Styles.error}>{error}</sup>}

        <button onClick={validate}>Login</button>
      </div>
    </div>
  );
}

export default memo(LoginPage);

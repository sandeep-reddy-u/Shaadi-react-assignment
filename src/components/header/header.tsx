import Styles from "../../App.module.scss";

interface Props {
  loginState: boolean;
  updateLoginState: (state: boolean) => void;
}

export default function Header(props: Props) {
  const { loginState, updateLoginState } = props;

  function logout() {
    updateLoginState(false);
  }

  return (
    <header className={Styles["App-header"]}>
      <div>Contacts App</div>
      {loginState && <button onClick={logout}>Logout</button>}
    </header>
  );
}

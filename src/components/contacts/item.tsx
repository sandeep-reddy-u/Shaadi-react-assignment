import { User } from "../../interfaces/common-interface";
import Styles from "./list.module.scss";

interface Props {
  user: User;
}

export default function ContactItem(props: Props) {
  const { user } = props;
  return (
    <div className={Styles["contact-item"]}>
      <div>
        <span>{user.name.title}. </span>
        <span>{user.name.first} </span>
        <span>{user.name.last}</span>
      </div>
      <img src={user.picture.thumbnail} alt={"profile img"} />
    </div>
  );
}

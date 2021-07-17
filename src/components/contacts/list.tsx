import { useEffect, useState } from "react";
import ContactItem from "./item";
import { ContactAPIResponse, User } from "../../interfaces/common-interface";
import Styles from "./list.module.scss";

export default function ContactList() {
  const [list, setList] = useState<User[]>([]);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  async function updateContacts(page: number) {
    await setLoading(true);
    const resp = await fetch(
      `https://randomuser.me/api/?seed=contactUser&page=${page}&results=25`
    );
    const data: ContactAPIResponse = await resp.json();
    console.log(data);
    if (page === 1) {
      await setList(data.results || []);
    } else {
      await setList([...list].concat(data.results || []));
    }
    await setPage(data.info.page);
    await setLoading(false);
  }

  useEffect(() => {
    updateContacts(1);
  }, []);

  function handleScroll(ev: React.UIEvent<HTMLDivElement, UIEvent>) {
    const container = ev.target as HTMLDivElement;
    const remainingScrollHeight =
      container.scrollHeight - container.clientHeight - container.scrollTop;

    console.log(page, loading);
    if (remainingScrollHeight < 100 && !loading) {
      updateContacts(page + 1);
    }
  }

  return (
    <div className={Styles["list-container"]} onScroll={handleScroll}>
      {list.map((user: User) => (
        <ContactItem user={user} key={user.login.username} />
      ))}
      {loading && <div className={Styles.loading}>Loading ...</div>}
    </div>
  );
}

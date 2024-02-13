import style from "./style.module.css";
import { Link } from "react-router-dom";

export const NavBar = ({ itemsList }) => {
  return (
    <div className={style.container}>
      <div className={style.nav}>
        <div className={style.logo}>
          <img src="/favicon.ico" alt="logo" />
        </div>
        <div className={style.menu}>
          <ul>
            {itemsList.map((item, index) => (
              <li key={index}>
                <Link to={`/${item.url}`}>{item.nameNav}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

import style from "./style.module.css";
import { Link } from "react-router-dom";

export const NavBar = ({ itemsList }) => {
  return (
    <div className={style.container}>
      <div className={style.nav}>
        <div className={style.logo}>
          <img src="/logo111.jpeg" alt="logo" />
        </div>
        <p className={style.nameSite}>the magic of fashion</p>
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

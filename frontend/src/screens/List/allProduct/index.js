import React from "react";
import style from "./style.module.css";
import { Link } from "react-router-dom";

export const Product = ({ items }) => {
  return (
    <div className={style.container}>
      {items &&
        items.map(
          (
            { price, title, img, _id } //короче, тут URL присваевается id (далее в APP)
          ) => (
            <Link to={`/${_id}`} key={_id}>
              <div className={style.item} key={title}>
                <img
                  src={img}
                  alt="тут должна быть картинка какого-то помещения"
                />
                <p className={style.textClass}>
                  <b>{title}</b>
                </p>
                <p className={style.textClass}>Цена за сутки: {price} рублей</p>
              </div>
            </Link>
          )
        )}
    </div>
  );
};

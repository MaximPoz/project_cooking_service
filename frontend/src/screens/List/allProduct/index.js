import React from "react";
import style from "./style.module.css";
import { Link } from "react-router-dom";

export const Product = ({ items }) => {


  return (
    <div className={style.container}>
      {items &&
        items.map(
          (
            { price, area, title, img, address, description, _id } //короче, тут URL присваевается id (далее в APP)
          ) => (
            <Link to={`/${_id}`} key={_id}>
              <div className={style.item} key={title}>
                <img
                  src={img}
                  alt="тут должна быть картинка какого-то помещения"
                />
                <p className={style.textClass}>{title}</p>
                <p className={style.textClass}>Цена за сутки: {price}</p>
                <p className={style.textClass}>Площадь: {area}</p>
                <p className={style.textClass}>Адрес: {address}</p>
                <p className={style.textClass}>Описание: {description}</p>
              </div>
            </Link>
          )
        )}
    </div>
  );
};

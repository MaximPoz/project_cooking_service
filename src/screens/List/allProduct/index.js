import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { Link } from "react-router-dom";

export const Product = ({items}) => {
  return (
    <div className={style.container}>
      {items.map(({ image, price, id, title }) => ( //короче, тут URL присваевается id (далее в APP) 
      <Link to={`/product/${id}`} key={id}> 
      <div className={style.item} key={id}>
        <img className={style.imageClass} src={image} alt="" />
        <p className={style.textClass}>{title}</p>
        <p className={style.textClass}>Цена за номер: ${price}</p>
      </div>
      </Link>
    ))}
    </div>
  )
}
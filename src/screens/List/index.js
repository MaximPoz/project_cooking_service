import React, { useEffect, useState } from "react";
import style from "./style.module.css";

const API_PRODUCTS = "https://fakestoreapi.com/products";

export const List = () => {
  const [items, setItems] = useState([]);


  useEffect(() => {
    const fetchItems = async () => {
      try {
        let response = await fetch(API_PRODUCTS);
        let data = await response.json();
        console.log(`Данные получены: ${items.length} объектов`);
        setItems(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchItems();
  }, []);

  return (
    <div>
      {/* Применяем стиль к родительскому контейнеру */}
      <h1 className="welcome">List of premises</h1>
      <div className={style.container}>
        {items.map((item) => (
          <div className={style.item} key={item.id}>
            {/* Применяем стиль к каждому элементу */}
            <img className={style.imageClass} src={item.image} alt="" />
            <p className={style.textClass}>{item.title}</p>
            <p className={style.textClass}>Цена за номер: ${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

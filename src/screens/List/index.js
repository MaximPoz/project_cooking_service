import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { Product } from "./allProduct";

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
      <h1 className="welcome">Каталог</h1>
       
      <div className={style.container}>
      {items.length !== 0 ? <Product items={items}/> : <h1 className="welcome">Loading...</h1>}

      </div>
    </div>
  );
};

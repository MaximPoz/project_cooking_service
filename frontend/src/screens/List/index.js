import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { Product } from "./allProduct";
import { ToolBar } from "../../components/ToolBar/ToolBar";
import { TestComponent } from "./test";

const API_PRODUCTS = "https://fakestoreapi.com/products";

export const List = () => {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState("All");

  //Забираем файлы с API_PRODUCTS
  useEffect(() => {
    const fetchItems = async () => {
      try {
        let response = await fetch(API_PRODUCTS);
        let data = await response.json();
        console.log(`Данные получены c API_PRODUCTS: ${data.length} объектов`);

        setItems(data);
        console.log(data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchItems();
  }, []);

  const filteredItems =
    selected === "All"
      ? items
      : items.filter((item) => item.category === selected);

  return (
    <div>
      <h1 className="welcome">Каталог</h1>
      <ToolBar
        filters={[
          "All",
          "electronics",
          "jewelery",
          "men's clothing",
          "women's clothing",
        ]}
        selected={selected}
        onSelectFilter={(filter) => setSelected(filter)}
      />
      {items.length === 0 ? (
        <h1 className="welcome">Loading...</h1>
      ) : (
        <div className={style.container}>
          <Product items={filteredItems} />
        </div>
      )}
      <TestComponent />
    </div>
  );
};

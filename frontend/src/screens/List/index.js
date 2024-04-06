import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { Product } from "./allProduct";
import { ToolBar } from "../../components/ToolBar/ToolBar";
import axios from "axios";


const API_PRODUCTS = "http://localhost:5555/houses";

export const List = () => {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState("All");

  //Забираем файлы с API_PRODUCTS
  useEffect(() => {
    const fetchItems = async () => {
      try {
        let response = await axios.get(API_PRODUCTS);
        setItems(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchItems();
  }, []);


  const filteredItems =
  selected === "All"
    ? items.data // Если выбран фильтр "All", возвращаем все элементы
    : items.data.filter((item) => item.category === selected); // Фильтруем элементы по категории


  return (
    <div>
      <h1 className="welcome">Каталог</h1>
      <ToolBar
        filters={["All", "rooms", "apartments", "hotel"]}
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
    </div>
  );
};

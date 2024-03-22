import React, { useEffect, useState } from "react";
import style from "./style.module.css";

const API_MAX = "http://localhost:5555/houses";

export const TestComponent = () => {
  const [house, setHouse] = useState([]);

  //Забираем файлы с API_MAX
  useEffect(() => {
    const fetchItems = async () => {
      try {
        let response = await fetch(API_MAX);
        let data = await response.json();
        console.log(`Данные получены c API_MAX: ${data.count} объектов`);

        setHouse(data);
        console.log(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className={style.container}>
      {house.data &&
        house.data.map(({ price, area, title, img, address, description }) => (
          <div className={style.item} key={title}>
            <img src={img} alt="тут должна быть картинка какого-то помещения" />
            <p className={style.textClass}>{title}</p>
            <p className={style.textClass}>Цена за сутки: {price}</p>
            <p className={style.textClass}>Площадь: {area}</p>
            <p className={style.textClass}>Адрес: {address}</p>
            <p className={style.textClass}>Описание: {description}</p>
          </div>
        ))}
    </div>
  );
};

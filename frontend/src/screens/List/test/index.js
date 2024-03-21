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
        console.log(data.data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className={style.container}>
      {house.data &&
        house.data.map(({ author, publishYear, title, img }) => (
          <div className={style.item} key={title}>
            <p className={style.textClass}>{title}</p>
            <p className={style.textClass}>Автор: {author}</p>
            <p className={style.textClass}>Год публикации: {publishYear}</p>
            <img src={img} alt="img" />
          </div>
        ))}
    </div>
  );
};

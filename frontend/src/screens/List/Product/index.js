import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";

export const ProductPage = () => {
  const { _id } = useParams();
  console.log(_id);
  const API_PRODUCTS = "http://localhost:5555/houses";

  const [item, setItem] = useState({});
  const { price, area, title, img, address, description } = item;

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`${API_PRODUCTS}/${_id}`); //Из APP мы забираем с помощью параметров id (который передали компоненте) и присваеваем запросу API
        setItem(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchItem();
  }, [_id]);

  return (
    <div className={style.container}>
      <img src={img} alt="тут должна быть картинка какого-то помещения" />
      <p className={style.textClass}>{title}</p>
      <p className={style.textClass}>Цена за сутки: {price} рублей</p>
      <p className={style.textClass}>Площадь: {area} м²</p>
      <p className={style.textClass}>Адрес: {address} </p>
      <p className={style.textClass}>Описание: {description}</p>
    </div>
  );
};

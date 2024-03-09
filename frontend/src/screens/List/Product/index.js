import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { useParams } from "react-router-dom";


export const ProductPage = () => {
  const {id} = useParams()

  const API_PRODUCTS = "https://fakestoreapi.com/products";


  const [item, setItem] = useState({});



  useEffect(() => {
    const fetchItem = async () => {
      try {
        let response = await fetch(`${API_PRODUCTS}/${id}`); //Из APP мы забираем с помощью параметров id (который передали компоненте) и присваеваем запросу API
        let data = await response.json();
        setItem(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchItem();
  }, [id]);

  return (
    <div className={style.container}>
      <h1 className={style.textClass}>{item.title}</h1>
      <img className={style.imageClass} src={item.image} alt="" />
      <p className={style.priceClass}>Цена за номер: ${item.price}</p>
    </div>
  );
};
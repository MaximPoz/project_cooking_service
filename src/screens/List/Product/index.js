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
        let response = await fetch(`${API_PRODUCTS}/${id}`);
        let data = await response.json();
        setItem(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchItem();
  }, [id]);

  return (
    <div>
      <h1>{item.title}</h1>
      <img src={item.image} alt="" />
      <p>Цена за номер: ${item.price}</p>
    </div>
  );
};
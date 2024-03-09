import React from "react";
import { useForm } from "react-hook-form";
import style from "./style.module.css";
import { Link } from "react-router-dom";

export const LogIn = ({ updateState }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const userLogin = {
        username: data.Email,
        password: data.Password,
      };

      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLogin),
      });

      const json = await response.json();
      console.log(json);

      updateState(true); 
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={style.container}>
      <h2 className="welcome">Пожалуйста авторизуйтесь</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className={style.input}
          type="text"
          placeholder="Электронная почта"
          {...register("Email", { required: true,  })}
        />

        <input
          className={style.input}
          type="Password"
          placeholder="Пароль"
          {...register("Password", { required: true, maxLength: 100 })}
        />

        <input className="Btn" type="submit" value="Отправить" />
      </form>
      <hr />

      <Link to="/changePassword">
        <button className="Btn">Забыли пароль</button>
      </Link>
    </div>
  );
};

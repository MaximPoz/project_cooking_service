import React from "react";
import axios from "axios";
import style from "./style.module.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export const LogIn = ({ updateState }) => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({email, password}) => {
    console.log(email, password)
    axios
      .post("http://localhost:5555/users/login", {email, password})
      .then((res) => {
        console.log(res.data);
        updateState(true);
        navigate("/personalAccount");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className={style.container}>
      <h2 className="welcome">Пожалуйста авторизуйтесь</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className={style.input}
          type="text"
          placeholder="Электронная почта"
          {...register("email", { required: true })}
        />

        <input
          className={style.input}
          type="Password"
          placeholder="Пароль"
          {...register("password", { required: true, maxLength: 100 })}
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

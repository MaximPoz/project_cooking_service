import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import style from "./style.module.css";

export const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  const getRandomPassword = () => {
    return Math.floor(Math.random() * 999999);
  };
  let captcha = getRandomPassword();
  return (
    <div className={style.container}>
      <h3>Восстановление пароля</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className={style.input}
          type="text"
          placeholder="Электронная почта"
          {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
        />

        <p className={style.captcha}> Введите пин-код: {captcha}</p>

        <input
          className={style.captcha}
          type="number"
          placeholder="Защитный код"
          {...register("Captcha", { max: 6, min: 6, maxLength: 6 })}
        />

        <input className={style.submit} type="submit" value="Отправить" />
      </form>
    </div>
  );
};

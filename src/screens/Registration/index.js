import React from "react";
import style from "./style.module.css";
import { useForm } from "react-hook-form";

export const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit(onSubmit)}>

        <input
          className={style.input}
          type="text"
          placeholder="Имя"
          {...register("First name", { required: true, maxLength: 80 })}
        />

        <input
          className={style.input}
          type="text"
          placeholder="Электронная почта"
          {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
        />

        <input
          className={style.input}
          type="tel"
          placeholder="Номер телефона"
          {...register("Mobile number", {
            required: true,
            minLength: 6,
            maxLength: 12,
          })}
        />

        <input
          className={style.input}
          type="Password"
          placeholder="Пароль"
          {...register("Password", { required: true, maxLength: 100 })}
        />

        <input
          className={style.input}
          type="Password"
          placeholder="Повторите пароль"
          {...register("Password", { required: true, maxLength: 100 })}
        />

        <input className={style.submit} type="submit" value="Регистрация" />

      </form>
    </div>
  );
};

import React, { useState } from "react";
import style from "./style.module.css";
import { useForm } from "react-hook-form";

export const Registration = () => {
  const [pass, setPass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (data.Password == data.rePassword) {
      setPass(true);
      console.log(data);
    } else {
      setPass(false);
    }
  };

  return (
    <div className={style.container}>
      <h2 className="welcome">Регистрация</h2>
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
          type="password"
          placeholder="Пароль"
          {...register("Password", { required: true, maxLength: 100 })}
        />

        <input
          className={style.input}
          type="password"
          placeholder="Повторите пароль"
          {...register("rePassword", { required: true, maxLength: 100 })}
        />

        {pass ? (
          <input className='Btn' type="submit" value="Регистрация" />
        ) : (
          <input className='Btn' type="submit" value="Пароли разные" />
        )}
      </form>
    </div>
  );
};

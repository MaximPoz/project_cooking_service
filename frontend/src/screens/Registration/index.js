import React, { useState } from "react";
import style from "./style.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const Registration = () => {
  const [pass, setPass] = useState(false);
  const navigate = useNavigate();
  console.log(pass);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password === data.rePassword) {
      try {
        const response = await axios.post(
          "http://localhost:5555/users/registration",
          {
            firstName: data.firstName,
            email: data.email,
            mobileNumber: data.mobileNumber,
            password: data.password,
          }
        );

        if (response.status === 200) {
          // Регистрация успешна
          setPass(true);
          console.log(`Регистрация успешна ${response.data.message}`);
          navigate("/logIn"); // Перенаправление на страницу /logIn после успешной регистрации
        } else {
          // Ошибка регистрации
          setPass(false);
          console.error("Ошибка регистрации:", response.data.error);
        }
      } catch (error) {
        console.error("Ошибка при отправке запроса:", error);
        if (error.response && error.response.data && error.response.data.message) {
          // Вывод сообщения об ошибке пользователю
          alert(error.response.data.message);
        }
      }
    } else {
      setPass(false);
      alert(
        'Пароли не совпадают! Пожалуйста введите пароль и повторите его в поле "Повторите пароль"'
      );
      console.error("Пароли не совпадают");
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
          {...register("firstName", { required: true, maxLength: 80 })}
        />

        <input
          className={style.input}
          type="text"
          placeholder="Электронная почта"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />

        <input
          className={style.input}
          type="tel"
          placeholder="Номер телефона"
          {...register("mobileNumber", {
            required: true,
            minLength: 6,
            maxLength: 12,
          })}
        />

        <input
          className={style.input}
          type="password"
          placeholder="Пароль"
          {...register("password", { required: true, maxLength: 100 })}
        />

        <input
          className={style.input}
          type="password"
          placeholder="Повторите пароль"
          {...register("rePassword", { required: true, maxLength: 100 })}
        />

        <input className="Btn" type="submit" value="Регистрация" />
      </form>
    </div>
  );
};

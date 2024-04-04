import React, { useState } from "react";
import style from "./style.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Registration = () => {
  const [pass, setPass] = useState(false);
  const navigate = useNavigate();

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
          navigate("/regSuccess"); // Перенаправление на страницу /logIn после успешной регистрации
        } else {
          // Ошибка регистрации
          setPass(false);
          console.error("Ошибка регистрации:", response.data.error);
        }
      } catch (error) {
        console.error("Ошибка при отправке запроса:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          // Вывод сообщения об ошибке пользователю
          toast.error(error.response.data.message);
        }
      }
    } else {
      setPass(false);
      toast.error(
        'Пароли не совпадают! Пожалуйста введите пароль и повторите его в поле "Повторите пароль"'
      );
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
        {errors.firstName && <span>Поле "Имя" обязательно для заполнения</span>}

        <input
          className={style.input}
          type="text"
          placeholder="Электронная почта"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && (
          <span>
            Поле "Электронная почта" обязательно для заполнения и должно быть в
            формате example@example.com
          </span>
        )}

        <input
          className={style.input}
          type="tel"
          placeholder="Номер телефона"
          {...register("mobileNumber", {
            required: true,
            pattern: /^\+?[0-9]{6,12}$/,
          })}
        />
        {errors.mobileNumber && (
          <span>
            Поле "Номер телефона" обязательно для заполнения и должно содержать
            от 6 до 12 цифр, начиная с "+" (если номер начинается с кода страны)
          </span>
        )}

        <input
          className={style.input}
          type="password"
          placeholder="Пароль"
          {...register("password", { required: true, minLength: 8 })}
        />
        {errors.password && (
          <span>Пароль должен содержать не менее 8 символов</span>
        )}

        <input
          className={style.input}
          type="password"
          placeholder="Повторите пароль"
          {...register("rePassword", { required: true, minLength: 8 })}
        />
        {errors.rePassword && (
          <span>
            Поле "Повторите пароль" обязательно для заполнения и должно
            содержать не менее 8 символов
          </span>
        )}

        <input className="Btn" type="submit" value="Регистрация" />
      </form>
    </div>
  );
};

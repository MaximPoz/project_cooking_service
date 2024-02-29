import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import { useForm } from "react-hook-form";

export const ChangeProfile = () => {
  const [user, setUser] = useState({
    name: "Загрузка",
    email: "Загрузка",
    phone: "Загрузка",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await fetch("https://fakestoreapi.com/users/1");
        const data = await result.json();
        // console.log(data)
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  const upperCase = (string) => {
    return string
      ? string.charAt(0).toUpperCase() + string.slice(1)
      : "Че то там грузит";
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data); //данные которые нужно отправить на сервер
  // console.log(errors);

  return (
    <div className={style.personalAccount}>
      <h2 className={style.welcome}>
        {upperCase(user.name.firstname)} тут вы можете изменить свои личные
        данные
      </h2>
      <div className={style.userInfo}>
        <p>
          <strong>Имя:</strong> {upperCase(user.name.firstname)}
        </p>
        <p>
          <strong>E-mail:</strong> {user.email}
        </p>
        <p>
          <strong>Телефон:</strong> {user.phone}
        </p>
      </div>

      <form className={style.changeAccount} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={style.changeInfo}
          type="text"
          placeholder="First name"
          {...register("First name", { required: true, maxLength: 80 })}
        />
        <input
          className={style.changeInfo}
          type="text"
          placeholder="Email"
          {...register("Email", { required: true })}
        />
        <input
          className={style.changeInfo}
          type="tel"
          placeholder="Mobile number"
          {...register("Mobile number", {
            required: true,
            minLength: 6,
            maxLength: 12,
          })}
        />
        <input
          className={style.changeInfo}
          type="password"
          placeholder="Password"
          {...register("Password", {
            required: true,
          })}
        />

        <input className={style.changeBtn} type="submit" />
      </form>
    </div>
  );
};

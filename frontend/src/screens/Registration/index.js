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

  const onSubmit = async (data) => {
    if (data.password === data.rePassword) {
      try {
        let response = await fetch('http://localhost:5555/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            firstName: data.firstName,
            email: data.email,
            mobileNumber: data.mobileNumber,
            password: data.password,
          })
        });

        if (response.ok) {
          response = await response.json()
          // Регистрация успешна
          setPass(true);
          console.log(`Регистрация успешна ${response.message}`);
        } else {
          // Ошибка регистрации
          setPass(false);
          console.error('Ошибка регистрации:', response.statusText);
        }
      } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
      }
    } else {
      setPass(false);
      console.error('Пароли не совпадают');
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

<input className='Btn' type="submit" value="Регистрация" />

        {/* {pass ? (
          <input className='Btn' type="submit" value="Регистрация" />
        ) : (
          <input className='Btn' type="submit" value="Пароли разные" disabled />
        )} */}
      </form>
    </div>
  );
};

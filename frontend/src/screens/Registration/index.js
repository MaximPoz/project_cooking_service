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
    if (data.Password === data.rePassword) {
      setPass(true);
      console.log(data);
      const userData = {
          email:'John123@gmail.com',
          username:'johnd123',
          password:'123123',
          name:{
              firstname:'John',
              lastname:'Doe'
          },
          address:{
              city:'kilcoole',
              street:'7835 new road',
              number:3,
              zipcode:'12926-3874',
              geolocation:{
                  lat:'-37.3159',
                  long:'81.1496'
              }
          },
          phone:'1-570-236-7033'
      }
      //   email: data.Email,
      //   username: data.Email,
      //   password: data.Password,
      //   name: {
      //     firstname: data.Email,
      //     lastname: data.Email
      //   },
      //   address: {
      //     city: data.Email,
      //     street: data.Email,
      //     number: 0,
      //     zipcode: data.Email,
      //     geolocation: {
      //       lat: data.Email,
      //       long: data.Email
      //     }
      //   },
      //   phone: data["Mobile number"]
      // };
      
      try {
        const response = await fetch('https://fakestoreapi.com/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });

        const json = await response.json();
        console.log(json);
      } catch (error) {
        console.error('Error:', error);
      }
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

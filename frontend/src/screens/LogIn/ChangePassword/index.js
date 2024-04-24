import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

import style from "./style.module.css";

export const ChangePassword = () => {
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate();

  const { register, handleSubmit: handleFormSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5555/users/send-pin', { email: data.Email });
      setMessage(response.data.message);
      navigate("/emailPassword");
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className={style.container}>
      <h2 className="welcome">Восстановление пароля</h2>
      <form onSubmit={handleFormSubmit(onSubmit)}>
        <p className="textClass">Электронная почта</p>
        <input
          className={style.input}
          type="text"
          placeholder="Электронная почта"
          {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.Email && <span className={style.error}>Поле "Электронная почта" обязательно и должно быть в формате example@example.com</span>}

        <ReCAPTCHA
          className={style.reCAPTCHA}
          sitekey="6LcwysMpAAAAAJkItsh9LcA0UfpDvEzlZ8rdi9wd"
        />

        <input className="Btn" type="submit" value="Отправить" />
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

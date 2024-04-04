import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css";
import { EmailPassword } from "../EmailPassword";

//!Отправка данных на сервер
const sendEmail = async (email, message) => {
  // try {
  //   const response = await fetch('/send-email', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       email: email,
  //       message: message,
  //     }),
  //   });
  //   console.log(email, message)

  //   if (response.ok) {
  //     console.log('Email sent successfully!');
  //   } else {
  //     console.error('Failed to send email:', response.statusText);
  //   }
  // } catch (error) {
  //   console.error('Error sending email:', error);
  // }
};


export const ChangePassword = () => {
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const navigate = useNavigate();

  function generateCaptcha() {
    return Math.floor(Math.random() * 999999);
  }

// onCaptchaGenerated(casptc)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (parseInt(data.Captcha) === captcha) {
      // Сравниваем и переходим на следующую страницу + надо добавить отправку на почту пин-кода  
      sendEmail(data.Email, data.Captcha)
      navigate("/emailPassword");
    } else {
      alert("Неверный код. Пожалуйста, повторите попытку.");
      setCaptcha(generateCaptcha()); // Генерируем новую капчу
    }
  };

  return (
    <div className={style.container}>

      <h2 className="welcome">Восстановление пароля</h2>
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
          type="text"
          placeholder="Защитный код"
          {...register("Captcha", { max: 999999, min: 0 })}
        />


          <input className='Btn' type="submit" value="Отправить" />

      </form>
    </div>
  );
};

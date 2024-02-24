import React from "react";
import { useForm } from "react-hook-form";
import style from "./style.module.css";
import { Link } from "react-router-dom";

export const LogIn = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);
    console.log(errors);
  
    return (
      <div className={style.container}>

        <h3>Пожалуйста авторизуйтесь</h3>
        
        <form onSubmit={handleSubmit(onSubmit)}>

          <input
            className={style.input}
            type="text"
            placeholder="Электронная почта"
            {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
          />
        
          <input
            className={style.input}
            type="Password"
            placeholder="Пароль"
            {...register("Password", { required: true, maxLength: 100 })}
          />
  
          <input className={style.submit} type="submit" value="Отправить" />
        </form>
        <hr />
        
        <Link to="/changePassword"><button className={style.submit}>Забыли пароль</button></Link>
      </div>
    );
  };
  

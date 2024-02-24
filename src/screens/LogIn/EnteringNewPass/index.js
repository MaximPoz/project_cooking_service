import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import style from "./style.module.css";




export const EmailPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const onSubmit = (data) => console.log(data);
      console.log(errors);

      
    return (
        <div className={style.container}>
            <h3>Восстановление пароля</h3>

        <form onSubmit={handleSubmit(onSubmit)}>

          <input
            className={style.input}
            type="text"
            placeholder="Электронная почта"
            {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
          />

          <input
            className={style.input}
            type="text"
            placeholder="Ввод пин-кода"
            {...register("pinCod", { required: true, maxLength: 4 })}
          />
            
          <input className={style.submit} type="submit" value="Отправить" />

        </form>
        </div>
    )
}
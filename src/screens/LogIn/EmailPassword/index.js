import React from "react";
import { useForm } from "react-hook-form";
import style from "./style.module.css";


export const EmailPassword = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => alert(JSON.stringify(data));
  console.log(errors);


  return (
    <div className={style.container}>
      <h3>Введите пин-код</h3>
      <p>который получили в указанном ранее e-mail</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className={style.input}
          type="text"
          placeholder="Ввод пин-кода"
          {...register("pinCode", {
            required: "Поле обязательно к заполнению",
            // max: 6,
            // min: 6,
            minLength: {
              value: 6,
              message: "Минимум 6 символов"
            },
            maxLength: {
              value: 6,
              message: "Максимум 6 символов"
            },
          })}
        />
        <div className={style.errorsValid}>
          {errors?.pinCode && <p>{errors?.pinCode?.message || "Errors!!!"} </p>}
        </div>

        <input className={style.submit} type="submit" value="Отправить" />
      </form>
    </div>
  );
};

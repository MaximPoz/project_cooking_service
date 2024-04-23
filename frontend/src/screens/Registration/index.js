import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";

// export const Registration = () => {
//   const [pass, setPass] = useState(false);
//   const [isVerified, setIsVerified] = useState(false);

//   const navigate = useNavigate();

//   const handleRecaptchaChange = (value) => {
//     if (value) {
//       setIsVerified(true);
//     }
//   };

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   // const onSubmit = async (data) => {
//   //   if (data.password === data.rePassword) {
//   //     try {
//   //       const response = await axios.post(
//   //         "http://localhost:5555/users/registration",
//   //         {
//   //           firstName: data.firstName,
//   //           email: data.email,
//   //           mobileNumber: data.mobileNumber,
//   //           password: data.password,
//   //         }
//   //       );

//   //       if (response.status === 200) {
//   //         // Регистрация успешна
//   //         setPass(true);
//   //         console.log(`Регистрация успешна ${response.data.message}`);
//   //         navigate("/regSuccess"); // Перенаправление на страницу /logIn после успешной регистрации
//   //       } else {
//   //         // Ошибка регистрации
//   //         setPass(false);
//   //         console.error("Ошибка регистрации:", response.data.error);
//   //       }
//   //     } catch (error) {
//   //       console.error("Ошибка при отправке запроса:", error);
//   //       if (
//   //         error.response &&
//   //         error.response.data &&
//   //         error.response.data.message
//   //       ) {
//   //         // Вывод сообщения об ошибке пользователю
//   //         toast.error(error.response.data.message);
//   //       }
//   //     }
//   //   } else {
//   //     setPass(false);
//   //     toast.error(
//   //       'Пароли не совпадают! Пожалуйста введите пароль и повторите его в поле "Повторите пароль"'
//   //     );
//   //   }
//   // };

//   const onSubmit = async (data) => {
//     if (data.password === data.rePassword) {
//       try {
//         const response = await axios.post(
//           "http://localhost:5555/users/registration",
//           {
//             firstName: data.firstName,
//             email: data.email,
//             mobileNumber: data.mobileNumber,
//             password: data.password,
//           }
//         );
  
//         if (response.status === 200) {
//           setPass(true);
//           console.log(`Регистрация успешна ${response.data.message}`);
//           navigate("/regSuccess");
//         }
//       } catch (error) {
//         console.error("Ошибка при отправке запроса:", error);
//         if (error.response && error.response.data && error.response.data.errors) {
//           // Обработка ошибок валидации от сервера
//           const serverErrors = error.response.data.errors;
//           Object.keys(serverErrors).forEach((key) => {
//             errors[key] = { message: serverErrors[key] };
//           });
//         } else if (
//           error.response &&
//           error.response.data &&
//           error.response.data.message
//         ) {
//           toast.error(error.response.data.message);
//         }
//       }
//     } else {
//       setPass(false);
//       toast.error(
//         'Пароли не совпадают! Пожалуйста введите пароль и повторите его в поле "Повторите пароль"'
//       );
//     }
//   };
  

//   return (
//     <div className={style.container}>
//       <h2 className="welcome">Регистрация</h2>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <input
//           className={style.input}
//           type="text"
//           placeholder="Имя"
//           {...register("firstName", { required: true, maxLength: 20 })}
//         />
//         {errors.firstName && <span className={style.error}>{errors.firstName.message}</span>}
//         {errors.firstName && <span>Поле "Имя" обязательно для заполнения</span>}

//         <input
//           className={style.input}
//           type="text"
//           placeholder="Электронная почта"
//           // {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
//           {...register("email", { required: true })}
//         />
//         {/* {errors.email && (
//           <span>
//             Поле "Электронная почта" обязательно для заполнения и должно быть в
//             формате example@example.com
//           </span>
//         )} */}

//         <input
//           className={style.input}
//           type="tel"
//           placeholder="Номер телефона"
//           {...register("mobileNumber", {
//             required: true,
//             // pattern: /^\+?[0-9]{6,12}$/,

//           })}
//         />
//         {/* {errors.mobileNumber && (
//           <span>
//             Поле "Номер телефона" обязательно для заполнения и должно содержать
//             от 6 до 12 цифр, начиная с "+" (если номер начинается с кода страны)
//           </span>
//         )} */}

//         <input
//           className={style.input}
//           type="password"
//           placeholder="Пароль"
//           // {...register("password", { required: true, minLength: 8 })}
//           {...register("password", { required: true})}
//         />
//         {/* {errors.password && (
//           <span>Пароль должен содержать не менее 8 символов</span>
//         )} */}

//         <input
//           className={style.input}
//           type="password"
//           placeholder="Повторите пароль"
//           // {...register("rePassword", { required: true, minLength: 8 })}
//           {...register("rePassword", { required: true})}
//         />
//         {/* {errors.rePassword && (
//           <span>
//             Поле "Повторите пароль" обязательно для заполнения и должно
//             содержать не менее 8 символов
//           </span>
//         )} */}

//         <ReCAPTCHA
//           className={style.reCAPTCHA}
//           sitekey="6LcwysMpAAAAAJkItsh9LcA0UfpDvEzlZ8rdi9wd"
//           onChange={handleRecaptchaChange}
//         />

//         <input
//           disabled={!isVerified}
//           className={`Btn ${!isVerified ? "disabledBtn" : ""}`}
//           type="submit"
//           value="Регистрация"
//         />
//       </form>
//     </div>
//   );
// };

export const Registration = () => {
  const [pass, setPass] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [serverErrors, setServerErrors] = useState({});

  const navigate = useNavigate();

  const handleRecaptchaChange = (value) => {
    if (value) {
      setIsVerified(true);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors: clientErrors },
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
          setPass(true);
          console.log(`Регистрация успешна ${response.data.message}`);
          navigate("/regSuccess");
        }
      } catch (error) {
        console.error("Ошибка при отправке запроса:", error);
        if (error.response && error.response.data && error.response.data.errors) {
          setServerErrors(error.response.data.errors);
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
        <p className="textClass">Имя</p>
        <input
          className={`${style.input} ${ serverErrors.firstName ? style.inputError : ''}`}
          type="text"
          placeholder="Имя"
          {...register("firstName", { required: true, maxLength: 20 })}
        />
        {serverErrors.firstName && <span className={style.error}>{serverErrors.firstName}</span>}

        <p className="textClass" >Почта</p>
        <input
          className={`${style.input} ${ serverErrors.firstName ? style.inputError : ''}`}
          type="text"
          placeholder="Электронная почта"
          {...register("email", { required: true })}
        />
        {serverErrors.email && <span className={style.error}>{serverErrors.email}</span>}
        
        <p className="textClass">Мобила</p>
        <input
          className={`${style.input} ${ serverErrors.firstName ? style.inputError : ''}`}
          type="tel"
          placeholder="Номер телефона"
          {...register("mobileNumber", { required: true })}
        />
        {serverErrors.mobileNumber && <span className={style.error}>{serverErrors.mobileNumber}</span>}

        <p className="textClass">Пароль</p>
        <input
          className={`${style.input} ${ serverErrors.firstName ? style.inputError : ''}`}
          type="password"
          placeholder="Пароль"
          {...register("password", { required: true })}
        />
        {serverErrors.password && <span className={style.error}>{serverErrors.password}</span>}

        <p className="textClass">Повторите пароль</p>
        <input
          className={`${style.input} ${ serverErrors.firstName ? style.inputError : ''}`}
          type="password"
          placeholder="Повторите пароль"
          {...register("rePassword", { required: true })}
        />
        {serverErrors.rePassword && <span className={style.error}>{serverErrors.rePassword}</span>}

        <ReCAPTCHA
          className={style.reCAPTCHA}
          sitekey="6LcwysMpAAAAAJkItsh9LcA0UfpDvEzlZ8rdi9wd"
          onChange={handleRecaptchaChange}
        />

        <input
          disabled={!isVerified}
          className={`Btn ${!isVerified ? "disabledBtn" : ""}`}
          type="submit"
          value="Регистрация"
        />
      </form>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import style from "./style.module.css";

export const PersonalAccount = () => {
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
      : user.name;
  };

  return (
    <div className={style.personalAccount}>
      <h2 className="welcome">
        Добро пожаловать {upperCase(user.name.firstname)} в Ваш личный кабинет
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
      <div className={style.changeFormLink}>
        <a href="/changeProfile">Изменить данные</a>
      </div>
    </div>
  );
};

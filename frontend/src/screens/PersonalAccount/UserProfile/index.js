import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

export const PersonalAccount = () => {
  const [user, setUser] = useState();

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const {id} = decodedToken
 

  const API_USERS = 'http://localhost:5555/users'

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`${API_USERS}/${id}`); //Из APP мы забираем с помощью параметров id (который передали компоненте) и присваеваем запросу API
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchItem();
  }, [id]);


  const upperCase = (string) => {
    return string
      ? string.charAt(0).toUpperCase() + string.slice(1)
      : user.name;
  };

  return (
    <div className={style.personalAccount}>
      <h2 className="welcome">
        {user && (
          <>Добро пожаловать {upperCase(user.firstName)} в Ваш личный кабинет</>
        )}
      </h2>
      <div className={style.userInfo}>
        {user && (
          <>
            <p>
              <strong>Имя:</strong> {upperCase(user.firstName)}
            </p>
            <p>
              <strong>E-mail:</strong> {user.email}
            </p>
            <p>
              <strong>Телефон:</strong> {user.mobileNumber}
            </p>
          </>
        )}
      </div>
      <div className={style.changeFormLink}>
        <a href="/changeProfile">Изменить данные</a>
      </div>
    </div>
  );
};

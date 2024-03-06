import React from "react";
import style from "./style.module.css";

export const AboutUs = () => {
  return (
    <div className={style.backgroundImage}>
      <div className={style.container}>
        <div className={style.textContainer}>
          <h1 className={style.welcome}>
            Добро пожаловать в наш сервис бронирования жилья в Якутске!
          </h1>
          <p className={style.textClass}>
            В условиях пандемии и закрытых границ по всему миру возникла
            необходимость в надежном и удобном сервисе бронирования жилья. Наша
            компания возникла как ответ на этот вызов, предоставляя локальные
            возможности бронирования жилья прямо в черте города Якутска. Мы
            гордимся тем, что можем предложить широкий выбор вариантов
            размещения, от комфортабельных апартаментов до уютных квартир,
            соответствующих самым разнообразным запросам и бюджетам. Наша цель -
            сделать ваше пребывание в Якутске максимально приятным и комфортным.
            Мы стремимся обеспечить вас всем необходимым для удобного проживания
            в нашем городе. Наш сервис предлагает удобный процесс бронирования,
            оперативную поддержку и индивидуальный подход к каждому клиенту.
            Приходите к нам, чтобы найти идеальное жилье для вашего пребывания в
            Якутске. Добро пожаловать в наш уютный город и наш сервис
            бронирования жилья!"
          </p>
        </div>
      </div>
    </div>
  );
};

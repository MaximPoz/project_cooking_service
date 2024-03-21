import express from "express";
import mongoose from "mongoose";
import cors from 'cors'

import { PORT, mongoDBURL } from "./config.js";
import { House } from "./models/houseModel.js";
import housesRoute from "./routes/housesRoute.js";

// Создание экземпляра приложения Express
const app = express();

// Использование middleware для обработки входящих запросов в формате JSON
app.use(express.json());

//Даём доступ к localhost:3000 и методам
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Обработчик маршрута GET "/" для приветственного сообщения
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("До");
});

//Для каждого запроса с префиксом "/houses", будут обрабатываться в соответствии с логикой, определенной в роутере housesRoute
app.use('/houses', housesRoute);


// Подключение к базе данных MongoDB
mongoose
  .connect(mongoDBURL)
  .then(() => {
    // Вывод сообщения об успешном подключении к базе данных
    console.log("База данных подключена");
    // Запуск сервера на указанном порте
    app.listen(PORT, () => {
      console.log(`Порт ${PORT} запущен, можете работать.`);
    });
  })
  .catch((error) => {
    // Обработка ошибки, если не удалось подключиться к базе данных
    console.log(error);
  });

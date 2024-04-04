import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import cookieParser from 'cookie-parser';


import housesRoute from "./routes/housesRoute.js";
import userRoute from "./routes/userRoute.js";


// Создание экземпляра приложения Express
const app = express();

const port = process.env.PORT;
const DBURL = process.env.DBURL;

app.use(cookieParser());
app.use(express.urlencoded({ extended: false}));


// Использование middleware для обработки входящих запросов в формате JSON
app.use(express.json());

//включаем `CORS` для всех запросов
// app.use(cors())

//включаем `CORS` для localhost:3000 и методам
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);


//Для каждого запроса с префиксом "/houses", будут обрабатываться в соответствии с логикой, определенной в роутере housesRoute
app.use('/houses', housesRoute);
app.use('/users', userRoute);


// Обработчик маршрута GET "/" для приветственного сообщения
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Добро пожаловать!");
});


// Подключение к базе данных MongoDB
mongoose
  .connect(DBURL)
  .then(() => {
    console.log("База данных подключена");
    // Запуск сервера на указанном порте
    app.listen(port, () => {
      console.log(`Порт ${port} запущен, можете работать.`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

import express from "express";
import mongoose from "mongoose";

import { PORT, mongoDBURL } from "./config.js";
import { House } from "./models/houseModel.js";

// Создание экземпляра приложения Express
const app = express();

// Использование middleware для обработки входящих запросов в формате JSON
app.use(express.json());

// Обработчик маршрута GET "/" для приветственного сообщения
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("До");
});

// Обработчик маршрута POST "/house" для создания нового дома
app.post("/house", async (request, response) => {
  try {
    // Проверка наличия обязательных полей в теле запроса
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      // Если обязательные поля отсутствуют, возвращается ошибка 400
      return response.status(400).send({
        message: "Нужно отправить все поля: title, author, publishYear",
      });
    }
    // Создание нового дома на основе данных из тела запроса
    const newHouse = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };
    // Создание объекта дома в базе данных и получение созданного объекта
    const house = await House.create(newHouse);
    // Отправка созданного объекта дома в ответе с кодом состояния 201
    return response.status(201).send(house);
  } catch (error) {
    // Обработка ошибки, если что-то пошло не так при создании дома
    console.log(error.message);
    // Отправка сообщения об ошибке в ответе с кодом состояния 500
    response.status(500).send({ message: error.message });
  }
});

// Обработчик маршрута GET "/houses" для получения всех домов
app.get("/houses", async (request, response) => {
  try {
    // Получение всех домов из базы данных
    const houses = await House.find({});
    // Отправка списка домов в формате JSON в ответе с кодом состояния 200
    return response.status(200).json({
      count: houses.length,
      data: houses,
    });
  } catch (error) {
    // Обработка ошибки, если что-то пошло не так при получении домов
    console.log(error.message);
    // Отправка сообщения об ошибке в ответе с кодом состояния 500
    response.status(500).send({ message: error.message });
  }
});

//Получение одной карточки дома по id
app.get("/houses/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const house = await House.findById(id);

    return response.status(200).json(house);
  } catch (error) {
    console.log(error.message);

    response.status(500).send({ message: error.message });
  }
});

//Обновления данных в карточке дома по id
app.put("/houses/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      // Если обязательные поля отсутствуют, возвращается ошибка 400
      return response.status(400).send({
        message: "Нужно отправить все поля: title, author, publishYear",
      });
    }
    const { id } = request.params;
    const result = await House.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).send({ message: "Карточка дома не найдена" });
    }

    return response
      .status(200)
      .send({ message: "Карточка дома успешно обновлена" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: `Ошибка: ${error.message}` });
  }
});

//Удаление карточки дома
app.delete("/houses/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await House.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).send({ message: "Карточка дома не найдена" });
    }

    return response
      .status(200)
      .send({ message: "Карточка дома успешно удалена " });
      
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: `Ошибка: ${error.message}` });
  }
});

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

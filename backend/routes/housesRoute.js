import express from "express";
import { House } from "../models/houseModel.js";

const router = express.Router();


//!Обработчик маршрута POST "/house" для создания нового дома
router.post("/", async (request, response) => {
  const{title, price, area, address, description, category, img} = request.body;
  try {
    // Проверка наличия обязательных полей в теле запроса
    if (
      !title ||
      !price ||
      !area ||
      !address ||
      !description ||
      !category ||
      !img
    ) {
      // Если обязательные поля отсутствуют, возвращается ошибка 400
      return response.status(400).send({
        message: "Нужно отправить все поля: title, price, area, address, description, img and category",
      });
    }
    // Создание нового дома на основе данных из тела запроса
    const newHouse = {
      title: title,
      price: price,
      area: area,
      address: address,
      description: description,
      img: img,
      category: category
    };
    // Создание объекта дома в базе данных и получение созданного объекта
    const house = await House.create(newHouse);
    // Отправка созданного объекта дома в ответе с кодом состояния 201
    return response.status(201).send(house);
  } catch (error) {
    // Обработка ошибки, если что-то пошло не так при создании дома
    console.log(`Что то пошло не так ${error.message}`);
    // Отправка сообщения об ошибке в ответе с кодом состояния 500
    response.status(500).send({ message: error.message });
  }
});

//!Обработчик маршрута GET "/houses" для получения всех домов
router.get("/", async (request, response) => {
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

//!Получение одной карточки дома по id
router.get("/:_id", async (request, response) => {
  try {
    const { _id } = request.params;
    const house = await House.findById({_id});

    return response.status(200).json(house);
  } catch (error) {
    console.log(error.message);

    response.status(500).send({ message: error.message });
  }
});


//!Обновления данных в карточке дома по id
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.price ||
      !request.body.area ||
      !request.body.address ||
      !request.body.category ||
      !request.body.description
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

//!Удаление карточки дома
router.delete("/:id", async (request, response) => {
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

export default router;

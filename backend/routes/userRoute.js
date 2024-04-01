import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const router = express.Router();

// Обработчик маршрута POST "/users" для создания нового дома
router.post("/registration", async (request, response) => {
  const { firstName, email, mobileNumber, password } = request.body;
  const user = await User.findOne({ email });

  if (user) {
    return response
      .status(409)
      .json({ message: "Пользователь уже существует" });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    firstName,
    mobileNumber,
    email,
    password: hashPassword,
  });
  await newUser.save();
  return response.json({ message: "Пользователь успешно создан" });
});

// router.post("/login", async (request, response) => {
//   const { email, password } = request.body;

//   const user = await User.findOne({ email: email })

//     if (user) {
//       bcrypt.compare(password, user.password, (err, resp) => { // Сравниваем введенный пароль с хэшированным паролем пользователя
//         if (resp) {
//           const token = jwt.sign( // Генерируем JWT токен для пользователя
//             { email: user.email }, //Полезная нагрузка токена
//             "horse-sun-pikul-nails", // Секретный ключ для подписи токена
//             { expiresIn: "1d" }  // Время жизни токена (1 день)
//           );
//           response.cookie("token", token); // Устанавливаем токен в куки ответа
//           return response.status(200).json({ message: "Успешно авторизован" });
//         } else {
//           return resp.json({ message: "Пароль неправильный мой друг" });
//         }
//       });
//     } else {
//       return response.json({ message: "Пользователь не существует" });
//     }
//   });


router.post("/login", async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      bcrypt.compare(password, user.password, (err, resp) => { // Сравниваем введенный пароль с хэшированным паролем пользователя
        if (resp) {
          const token = jwt.sign( // Генерируем JWT токен для пользователя
            { email: user.email }, //Полезная нагрузка токена
            "horse-sun-pikul-nails", // Секретный ключ для подписи токена
            { expiresIn: "1d" }  // Время жизни токена (1 день)
          );
          response.cookie("token", token); // Устанавливаем токен в куки ответа
          return response.status(200).json({ message: "Успешно авторизован" });
        } else {
          return response.status(401).json({ message: "Пароль неправильный мой друг" });
        }
      });
    } else {
      return response.status(404).json({ message: "Пользователь не существует" });
    }
  } catch (error) {
    console.error("Ошибка при поиске пользователя:", error);
    return response.status(500).json({ message: "Ошибка при поиске пользователя" });
  }
});


router.get("/users", async (request, response) => {
  try {
    // Получение всех домов из базы данных
    const user = await User.find({});
    // Отправка списка домов в формате JSON в ответе с кодом состояния 200
    return response.status(200).json({
      count: user.length,
      data: user,
    });
  } catch (error) {
    // Обработка ошибки, если что-то пошло не так при получении домов
    console.log(error.message);
    // Отправка сообщения об ошибке в ответе с кодом состояния 500
    response.status(500).send({ message: error.message });
  }
});

export default router;

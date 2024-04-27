import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import nodemailer from "nodemailer";


const router = express.Router();
const jwt_secret = process.env.JWT_SECRET;


 // Проводим валидацию данных
const validateData = (data) => {
  const errors = {};
 
  if (!data.firstName || data.firstName.length < 3) {
    errors.firstName = "Имя пользователя должно содержать не менее 3 символов.";
  }
  if (!data.email || !data.email.includes("@")) {
    errors.email = "Укажите корректный адрес электронной почты.";
  }
  if (
    !data.mobileNumber ||
    data.mobileNumber.length < 6 ||
    data.mobileNumber.length > 12
  ) {
    errors.mobileNumber =
      "Номер телефона должен содержать не менее 11 символов.";
  }
  if (!data.password || data.password.length < 8) {
    errors.password = "Пароль должен содержать не менее 8 символов.";
  }

  return errors;
};

//!Создания нового пользователя
router.post("/registration", async (request, response) => {
  const { firstName, email, mobileNumber, password } = request.body;
  const errors = validateData(request.body);

  if (Object.keys(errors).length > 0) {
    return response.status(400).json({ success: false, errors });
  }

  const userEmail = await User.findOne({ email });

  if (userEmail) {
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

//!Авторизация
router.post("/login", async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      bcrypt.compare(password, user.password, (err, resp) => {
        // Сравниваем введенный пароль с хэшированным паролем пользователя

        if (resp) {
          const token = jwt.sign(
            // Генерируем JWT токен для пользователя
            { email: user.email, id: user._id, user: user.firstName }, //Полезная нагрузка токена
            jwt_secret, // Секретный ключ для подписи токена
            { expiresIn: "1d" } // Время жизни токена (1 день)
          );
          response.cookie("token", token); // Устанавливаем токен в куки ответа
          return response.status(200).json({ message: "Успешно авторизован" });
        } else {
          return response
            .status(405)
            .json({ message: "Пароль неправильный мой друг" });
        }
      });
    } else {
      return response
        .status(404)
        .json({ message: "Пользователь не существует" });
    }
  } catch (error) {
    console.error("Ошибка при поиске пользователя:", error);
    return response
      .status(500)
      .json({ message: "Ошибка при поиске пользователя" });
  }
});

//! Получение пользователя по id
router.get("/:_id", async (request, response) => {
  try {
    const { _id } = request.params;
    const user = await User.findById({ _id });

    return response.status(200).json(user);
  } catch (error) {
    console.log(error.message);

    response.status(500).send({ message: error.message });
  }
});

//!Обновления данных в карточке пользователя по id
router.put("/:id", async (request, response) => {
  console.log(request.body);
  try {
    const { id } = request.params;
    
    // Хэшируем новый пароль
    if (request.body.password) {
      const hashPassword = await bcrypt.hash(request.body.password, 10);
      request.body.password = hashPassword;
    }

    const result = await User.findByIdAndUpdate(id, request.body);
    
    // Сохраняем обновленные данные
    await result.save();

    console.log("Результат обновления:", result);

    if (!result) {
      return response
        .status(404)
        .send({ message: "Карточка пользователя не найдена" });
    }

    return response
      .status(200)
      .send({ message: "Карточка пользователя успешно обновлена" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: `Ошибка: ${error.message}` });
  }
});


//!Восстановление пароля (отправляем письмо пользователю)
router.post("/send-pin", async (req, res) => {
  const { email } = req.body;

  // Проверяем, существует ли пользователь с указанным E-mail
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ message: "Пользователь с таким E-mail не найден" });
  }

  // Генерируем случайный пин-код
  const pinCode = Math.floor(
    Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111
  );

  // Обновляем пин-код пользователя в базе данных
  user.pinCode = pinCode;
  await user.save();

  console.log("pinCode:", user.pinCode);

  // Отправляем письмо с пин-кодом
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "executioner2126@gmail.com", //введите тут логин почты ....@gmail.com
      pass: "xokd ouwx qtao bwnw", //16 значный пароль приложений из myaccount.google.com
    },
  });

  await transporter.sendMail({
    to: email,
    subject: "Восстановление пароля",
    text: `Ваш пин-код для восстановления пароля: ${pinCode}`,
  });

  res.status(200).json({ message: pinCode });
});

//!Сверка pin-code
router.post("/check-pin", async (req, res) => {
  const { email, pinCode } = req.body;
  console.log(email);
  // Проверяем, существует ли пользователь с указанным E-mail
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ message: "Пользователь с таким E-mail не найден" });
  }
  console.log(pinCode);
  console.log(user.pinCode);

  // Обновляем пин-код пользователя в базе данных
  if (user.pinCode == pinCode) {
    res.status(200).json({ message: user._id });
    user.pinCode = "";
    user.save();
  } else {
    res.status(400).json({ message: "neOk" });
  }
});

export default router;

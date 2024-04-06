import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const router = express.Router();

const jwt_secret = process.env.JWT_SECRET;

// Обработчик маршрута POST "/users" для создания нового пользователя
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

//Авторизация
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


router.get("/:_id", async (request, response) => {
  try {
    const { _id } = request.params;
    const house = await User.findById({_id});

    return response.status(200).json(house);
  } catch (error) {
    console.log(error.message);

    response.status(500).send({ message: error.message });
  }
});


const getProfile = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwt_secret, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
}

router.get("/profile", getProfile)


export default router;

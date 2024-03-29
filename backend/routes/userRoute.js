import express from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/userModel.js";


const router = express.Router();


// Обработчик маршрута POST "/users" для создания нового дома
router.post("/", async (request, response) => {
    console.log(request.body)

    const {firstName, email, mobileNumber, password} = request.body;

    const user = await User.findOne({email}) 

    if(user) {
        return response.json({message: 'Пользователь уже существует'})
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        firstName,
        mobileNumber,
        email,
        password: hashPassword,
    })
    await newUser.save()
    return response.json({message: 'Пользователь успешно создан'})
})


router.get("/", async (request, response) => {
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

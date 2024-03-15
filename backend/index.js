import express from "express";
import mongoose from "mongoose";

import { PORT, mongoDBURL } from "./config.js";
import { House } from "./models/houseModel.js";

const app = express();

app.use(express.json())

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to the BACKEND server mF");
});

app.post("/house", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all requests fields: title, author, publisher",
      });
    }
    const newHouse = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const house = await House.create(newHouse)

    return response.status(201).send(house);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

app.get("/houses", async (request, response) => {
    try {
        const houses = await House.find({});
        
        return response.status(200).json({
            count: houses.length,
            data: houses
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
  });
  

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database MONGO");
    app.listen(PORT, () => {
      console.log(`Port ${PORT} working!!!!`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

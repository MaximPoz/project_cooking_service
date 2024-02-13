import "./App.css";
import {NavBar} from "./components/NavBar";
import {FootBar} from "./components/FootBar";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  let itemsList = [
    { nameNav: "Список помещений", url: "list" },
    { nameNav: "Личный кабинет", url: "lk" },
    { nameNav: "Авторизация", url: "auth" },
    { nameNav: "Регистрация", url: "reg" },
  ];

  return (
    <>
      <BrowserRouter>
        <NavBar itemsList={itemsList} />
        <FootBar />

        <Routes>
          <Route path={`/${itemsList.url}`} element={`< ${itemsList.url} />`} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
import "./App.css";
import { NavBar } from "./components/NavBar";
import { FootBar } from "./components/FootBar";
import { LogIn } from "./screens/LogIn";
import { List } from "./screens/List";
import { PersonalAccount } from "./screens/PersonalAccount";
import { Registration } from "./screens/Registration";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  let itemsList = [
    { nameNav: "Список помещений", url: "list" },
    { nameNav: "Личный кабинет", url: "personalAccount" },
    { nameNav: "Авторизация", url: "LogIn" },
    { nameNav: "Регистрация", url: "reg" },
  ];

  return (
    <>
      <BrowserRouter>
        <NavBar itemsList={itemsList} />
        <FootBar />

        <Routes>
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/list" element={<List />} />
          <Route path="/personalAccount" element={<PersonalAccount />} />
          <Route path="/reg" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

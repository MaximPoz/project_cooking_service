import "./App.css";
import { NavBar } from "./components/NavBar";
import { FootBar } from "./components/FootBar";
import { LogIn } from "./screens/LogIn";
import { List } from "./screens/List";
import { PersonalAccount } from "./screens/PersonalAccount";
import { Registration } from "./screens/Registration";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChangePassword } from "./screens/ChangePassword";
import { EmailPassword } from "./screens/EmailPassword";
import { AboutUs } from "./screens/AboutUs";
import { Contacts } from "./screens/Contacts";

export default function App() {
  let itemsList = [
    { nameNav: "Список помещений", url: "list" },
    { nameNav: "Личный кабинет", url: "personalAccount" },
    { nameNav: "Авторизация", url: "logIn" },
    { nameNav: "Регистрация", url: "reg" },
  ];

  let footer = [
    { nameNav: "О нас", url: "aboutUs" },
    { nameNav: "Контакты", url: "contacts" },
  ];

  return (
    <>
      <BrowserRouter>
        <NavBar itemsList={itemsList} />
        <FootBar footer={footer} />

        <Routes>
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/emailPassword" element={<EmailPassword />} />
          <Route path="/list" element={<List />} />
          <Route path="/personalAccount" element={<PersonalAccount />} />
          <Route path="/reg" element={<Registration />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

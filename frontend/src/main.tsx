// import React from 'react'
import { App } from "./App";
import { store } from "./Services/store";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Registration } from "./Pages/Registration";

const container = document.getElementById("app");
const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/app.css'
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "@/services/store";
import App from "./app";

ReactDOM.createRoot(document.getElementById("app")).render(
    <Provider store={store}>
        <App/>
    </Provider>
);
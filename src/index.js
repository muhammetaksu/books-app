import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import FavoritesContextProvider from "./components/context/FavoritesContextProvider";
import LoaderContextProvider from "./components/context/LoaderContextProvider";
import GetDataContextProvider from "./components/context/GetDataContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <LoaderContextProvider>
                <GetDataContextProvider>
                    <FavoritesContextProvider>
                        <App />
                    </FavoritesContextProvider>
                </GetDataContextProvider>
            </LoaderContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);

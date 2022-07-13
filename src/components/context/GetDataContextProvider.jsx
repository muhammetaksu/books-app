import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../../API";
import { LoaderContext } from "./LoaderContextProvider";

export const GetDataContext = createContext(null);

export function GetDataContextProvider({ children }) {
    ////////
    const [books, setBooks] = useState([]);
    //////////

    const { setLoaderIsActive } = useContext(LoaderContext);

    //////////
    useEffect(() => {
        setLoaderIsActive(true);
        axios
            .get(API_URL)
            .then((res) => setBooks(res.data))
            .catch((err) => console.log(err))
            .finally(() =>
                setTimeout(() => {
                    setLoaderIsActive(false);
                }, 500)
            );
    }, []);

    const totalBooks = books.length;

    const values = {
        books,
    };

    return (
        <div>
            <GetDataContext.Provider value={values}>
                {children}
            </GetDataContext.Provider>
        </div>
    );
}

export default GetDataContextProvider;

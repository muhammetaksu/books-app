import React, { createContext, useContext, useEffect, useState } from "react";
import { Button, message, Space } from "antd";
import "antd/dist/antd.css";

export const FavoriteBooks = createContext(null);

export const FavoritesContextProvider = ({ children }) => {
    const [favBooks, setFavBooks] = useState([]);

    const success = (name) => {
        message.success(`${name} added to favorites`);
    };

    const error = (id) => {
        message.error(`Book added to favorites`);
    };

    const warning = (name) => {
        message.warning(`${name} removed from favorites`);
    };

    const removeToFavorites = (book) => {
        const bookId = book.id;
        const newFavs = favBooks.filter((q) => q.id !== bookId);
        setFavBooks(newFavs);
        localStorage.setItem("favoriteBooks", JSON.stringify(newFavs));
        console.log("Favori Listesi: ", newFavs);
        warning(book.title);
    };

    const addToFavorites = (book) => {
        const oldFavs = [...favBooks];
        const newFavs = oldFavs.concat(book);
        setFavBooks(newFavs);
        localStorage.setItem("favoriteBooks", JSON.stringify(newFavs));
        console.log("Favori Listesi: ", newFavs);
        success(book.title);
    };

    useEffect(() => {
        const localStorageFavoriteBooks = JSON.parse(
            localStorage.getItem("favoriteBooks")
        );
        if (localStorageFavoriteBooks == null) {
            setFavBooks([]);
        } else {
            setFavBooks(localStorageFavoriteBooks);
        }
    }, []);

    const values = {
        favBooks,
        setFavBooks,
        removeToFavorites,
        addToFavorites,
    };

    return (
        <div>
            <FavoriteBooks.Provider value={values}>
                {children}
            </FavoriteBooks.Provider>
        </div>
    );
};

export default FavoritesContextProvider;

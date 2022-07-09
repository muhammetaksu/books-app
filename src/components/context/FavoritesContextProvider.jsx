import React, { createContext, useEffect, useState } from "react";

export const FavoriteBooks = createContext(null);

export const FavoritesContextProvider = ({ children }) => {
    const [favBooks, setFavBooks] = useState([]);

    const removeToFavorites = (id) => {
        const newFavs = favBooks.filter((q) => q.id !== id);
        setFavBooks(newFavs);
        localStorage.setItem("favoriteBooks", JSON.stringify(newFavs));
        console.log("Favori Listesi: ", newFavs);
    };

    const addToFavorites = (book) => {
        const oldFavs = [...favBooks];
        const newFavs = oldFavs.concat(book);
        setFavBooks(newFavs);
        localStorage.setItem("favoriteBooks", JSON.stringify(newFavs));
        console.log("Favori Listesi: ", newFavs);
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

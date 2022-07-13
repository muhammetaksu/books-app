import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import BookDetail from "./components/BookDetail";
import BookList from "./components/BookList";
import Favorites from "./components/Favorites";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
    return (
        <div className="App">
            <Navbar />

            <Routes>
                <Route path="/" element={<BookList />} />
                <Route path="/book/:id" element={<BookDetail />} />
                <Route path="/favorites" element={<Favorites />} />
            </Routes>

            <Footer />
        </div>
    );
}

export default App;

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { BOOK_DETAIL_URL } from "../API";
import { FavoriteBooks } from "./context/FavoritesContextProvider";
import GoToTop from "./GoToTop";

function BookDetail() {
    const [bookDetail, setBookDetail] = useState([]);

    const { favBooks, removeToFavorites, addToFavorites } =
        useContext(FavoriteBooks);

    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`${BOOK_DETAIL_URL}${id}`)
            .then((res) => setBookDetail(res.data))
            .catch((err) => console.log(err));
    }, []);

    const favControl = (id) => {
        const select = favBooks.some((q) => q.id === id);
        return select;
    };

    console.log(bookDetail);

    return (
        <div className="container">
            <div className="row my-4">
                <div className="col-lg-4">
                    <img
                        className="mb-3"
                        src={bookDetail.image_url}
                        alt=""
                        // style={{ height: "60vh" }}
                    />
                    <div className="d-flex justify-content-center mb-2">
                        {favControl(bookDetail.id) ? (
                            <button
                                onClick={() => removeToFavorites(bookDetail.id)}
                                className="btn btn-bg-pink  rounded"
                            >
                                Favorilerden Kaldır
                            </button>
                        ) : (
                            <button
                                onClick={() => addToFavorites(bookDetail)}
                                className="btn btn-bg-green  rounded"
                            >
                                Favorilere Ekle
                            </button>
                        )}
                    </div>
                </div>
                <div className="col-lg-8 ">
                    <h2 className="rounded bg-light">{bookDetail.title}</h2>
                    <h4 className="  p-1 rounded bg-light">
                        <span className="fs-5">Author: </span>
                        {bookDetail.authors}
                    </h4>

                    <h4 className=" p-1 rounded bg-light">
                        <span className="fs-5">Genres: </span>
                        {bookDetail.genres}
                    </h4>
                    <h5 className="m-4 ">{bookDetail.description}</h5>
                </div>
            </div>
            <GoToTop />
        </div>
    );
}

export default BookDetail;

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { BOOK_DETAIL_URL } from "../API";
import { FavoriteBooks } from "./context/FavoritesContextProvider";
import { Image } from "antd";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Typography } from "@mui/material";
import { GetDataContext } from "./context/GetDataContextProvider";
import { LoaderContext } from "./context/LoaderContextProvider";
import "antd/dist/antd.min.css";

function BookDetail() {
    const [bookDetail, setBookDetail] = useState([]);
    ////////////////////
    const { favBooks, removeToFavorites, addToFavorites } =
        useContext(FavoriteBooks);
    const { books } = useContext(GetDataContext);
    const { tailSpinLoading, loaderIsActive, setLoaderIsActive } =
        useContext(LoaderContext);
    /////////////////////
    const { id } = useParams();

    /////////////////////
    useEffect(() => {
        setLoaderIsActive(true);
        axios
            .get(`${BOOK_DETAIL_URL}${id}`)
            .then((res) => setBookDetail(res.data))
            .catch((err) => console.log(err))
            .finally(() =>
                setTimeout(() => {
                    setLoaderIsActive(false);
                }, 250)
            );
    }, []);
    ////////////////////
    const favControl = (id) => {
        const select = favBooks.some((q) => q.id === id);
        return select;
    };
    ///////////////////
    const indexOfCurrentBook = books.findIndex((book) => {
        return bookDetail.id === book.id;
    });
    console.log("Current Index: ", indexOfCurrentBook);
    ////////////////////
    const currentBook = books.find((book) => {
        return book.id === bookDetail.id;
    });
    console.log("Current Book: ", currentBook);
    ///////////////////
    const indexOfNextBook = indexOfCurrentBook + 1;
    const indexOfPreviousBook = indexOfCurrentBook - 1;
    ///////////////////
    const nextBookObject = books.slice(indexOfNextBook, indexOfNextBook + 1);
    console.log("Next Book: ", nextBookObject);

    const previousBookObject = books.slice(
        indexOfPreviousBook,
        indexOfPreviousBook - 1
    );
    console.log("Previous Book: ", previousBookObject);
    ////////////////////
    const width = window?.innerWidth;
    ////////////////////
    const nextBook = (id) => {
        if (indexOfCurrentBook + 1 < books.length) {
            setBookDetail(nextBookObject[0]);
        } else {
            setBookDetail(books[0]);
        }
        window.scrollTo({ top: 0 });
    };

    const previousBook = (id) => {
        if (indexOfCurrentBook > 0) {
            const findNextBook = books.find((book, index) => {
                return index === indexOfCurrentBook - 1;
            });
            setBookDetail(findNextBook);
        } else {
            setBookDetail(books[books.length - 1]);
        }
        window.scrollTo({ top: 0 });
    };

    ///////////////////

    return (
        <>
            {loaderIsActive === true ? (
                <div
                    style={{ height: "60vh" }}
                    className="d-flex justify-content-center my-5"
                >
                    <div className="my-auto">{tailSpinLoading}</div>
                </div>
            ) : (
                <div id="book-detail-container" className="mx-5">
                    <Typography className="fw-bold text-center bg-light rounded p-2">
                        Book Number:{" "}
                        <span className="fs-5">{`${indexOfCurrentBook + 1} / ${
                            books.length
                        }`}</span>
                    </Typography>
                    <div className="row my-4 justify-content-center">
                        {width <= 991 ? (
                            <div className="row">
                                <div className="col-lg-3">
                                    <Image
                                        id="bookDetailImg"
                                        src={bookDetail.image_url}
                                    />

                                    <div className="d-flex justify-content-center mb-3">
                                        {favControl(bookDetail.id) ? (
                                            <button
                                                onClick={() =>
                                                    removeToFavorites(
                                                        bookDetail
                                                    )
                                                }
                                                className="btn btn-bg-pink mt-3 rounded"
                                            >
                                                Remove from Favorites
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    addToFavorites(bookDetail)
                                                }
                                                className="btn btn-bg-green mt-3 rounded"
                                            >
                                                Add to Favorites
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="col-lg-7 ">
                                    <h3 className="rounded bg-light">
                                        {bookDetail.title}
                                    </h3>
                                    <h5 className="  p-1 rounded bg-light">
                                        <span className="fs-6">Author: </span>
                                        {bookDetail.authors}
                                    </h5>

                                    <h5 className=" p-1 rounded bg-light">
                                        <span className="fs-6">Genres: </span>
                                        {bookDetail.genres}
                                    </h5>
                                    <p className="my-3 mx-1">
                                        {bookDetail.description}
                                    </p>
                                </div>
                                <div className="col-lg-1">
                                    <div className=" m-1">
                                        <button
                                            onClick={() =>
                                                previousBook(bookDetail.id)
                                            }
                                            className="carets border rounded bg-light m-0"
                                        >
                                            <CaretLeftOutlined /> Previous Book
                                        </button>
                                    </div>
                                </div>
                                <div className="col-lg-1">
                                    <div className=" m-1">
                                        <button
                                            onClick={() =>
                                                nextBook(bookDetail.id)
                                            }
                                            className="carets border rounded bg-light m-0"
                                        >
                                            Next Book <CaretRightOutlined />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="row">
                                <div className="col-lg-1 p-2">
                                    <button
                                        onClick={() =>
                                            previousBook(bookDetail.id)
                                        }
                                        className="carets"
                                    >
                                        <CaretLeftOutlined />
                                    </button>
                                </div>
                                <div className="col-lg-3 p-2">
                                    <Image
                                        id="bookDetailImg"
                                        src={bookDetail.image_url}
                                    />

                                    <div className="d-flex justify-content-center mb-2">
                                        {favControl(bookDetail.id) ? (
                                            <button
                                                onClick={() =>
                                                    removeToFavorites(
                                                        bookDetail
                                                    )
                                                }
                                                className="btn btn-bg-pink mt-3 rounded"
                                            >
                                                Remove from Favorites
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    addToFavorites(bookDetail)
                                                }
                                                className="btn btn-bg-green mt-3 rounded"
                                            >
                                                Add to Favorites
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="col-lg-7 p-2 ">
                                    <h2 className="rounded bg-light">
                                        {bookDetail.title}
                                    </h2>
                                    <h4 className="  p-1 rounded bg-light">
                                        <span className="fs-5">Author: </span>
                                        {bookDetail.authors}
                                    </h4>

                                    <h4 className=" p-1 rounded bg-light">
                                        <span className="fs-5">Genres: </span>
                                        {bookDetail.genres}
                                    </h4>
                                    <p
                                        style={{ fontSize: "large" }}
                                        className="m-4"
                                    >
                                        {bookDetail.description}
                                    </p>
                                </div>

                                <div className="col-lg-1 p-2">
                                    <button
                                        onClick={() => nextBook(bookDetail.id)}
                                        className="carets"
                                    >
                                        <CaretRightOutlined />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default BookDetail;

import React, { useContext, useEffect, useState } from "react";
import { FavoriteBooks } from "./context/FavoritesContextProvider";
import "animate.css";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowForwardSharpIcon from "@mui/icons-material/ArrowForwardSharp";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Typography from "@mui/material/Typography";
import { LoaderContext } from "./context/LoaderContextProvider";
import "antd/dist/antd.min.css";

function Favorites() {
    const { favBooks, removeToFavorites } = useContext(FavoriteBooks);
    const { loaderIsActive, setLoaderIsActive, tailSpinLoading } =
        useContext(LoaderContext);
    ////////// Paginate
    const [pageNumber, setPageNumber] = useState(1);
    const [booksPerPage, setbooksPerPage] = useState(5);
    const pagesVisited = pageNumber * booksPerPage;
    const displayBooks = favBooks.slice(
        pagesVisited - booksPerPage,
        pagesVisited
    );
    ////////
    const pageCount = Math.ceil(favBooks.length / booksPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    ////////
    const handleChange = (event, value) => {
        setLoaderIsActive(true);
        window.scrollTo({ top: 0 });
        setTimeout(() => {
            setPageNumber(value);
            setLoaderIsActive(false);
        }, 500);
    };

    const goToBottom = () => {
        window.scrollTo(0, 9999999999999);
    };
    const goToTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div style={{ minHeight: "70vh" }} className="container p-4">
            <div
                id="goTo"
                className="position-fixed"
                style={{
                    bottom: "30px",
                    right: "20px",
                    zIndex: "1",
                }}
            >
                <button
                    id="goBtn"
                    onClick={() => goToTop()}
                    className="d-inline rounded-top border-bottom border-0  "
                >
                    <ArrowDropUpIcon className="fs-2" />
                </button>
                <br />
                <button
                    id="goBtn"
                    onClick={() => goToBottom()}
                    className="d-inline rounded-bottom border-top border-0  "
                >
                    <ArrowDropDownIcon className="fs-2" />
                </button>
            </div>

            <div>
                <h2 className="my-4 fav-heads rounded border-bottom shadow">
                    Favorite Books
                </h2>
            </div>
            <div className="col-2 d-flex justify-content-center ms-auto">
                <Typography className="fw-bold text-center bg-light rounded p-2">
                    Page {pageNumber}
                </Typography>
            </div>

            <div className="row ">
                {loaderIsActive === true ? (
                    <div
                        style={{ height: "55vh" }}
                        className="d-flex justify-content-center my-5"
                    >
                        <div className="my-auto">{tailSpinLoading}</div>
                    </div>
                ) : displayBooks.length > 0 ? (
                    displayBooks.map((book) => (
                        <div
                            key={book.id}
                            className="col-12  d-flex justify-content-center mt-3 mb-3"
                        >
                            <div className=" row border rounded shadow">
                                <div
                                    id="favoritesImg"
                                    className="col-lg-3 col-md-4 d-flex ps-0 justify-center-start"
                                >
                                    {window.innerWidth < 768 ? (
                                        <div>
                                            <img
                                                style={{
                                                    height: "350px",
                                                }}
                                                src={book.image_url}
                                                className="img-fluid"
                                                alt="..."
                                            />
                                        </div>
                                    ) : (
                                        <div>
                                            <img
                                                style={{
                                                    height: "350px",
                                                }}
                                                src={book.image_url}
                                                className="img-fluid rounded-start"
                                                alt="..."
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="col-lg-3 col-md-3 py-3">
                                    <div className="row">
                                        <div className="p-0">
                                            <h5 className="card-title px-2">
                                                <span className=" fs-5 rounded fav-heads border-bottom mb-2">
                                                    Name:
                                                </span>
                                                <br />
                                                {book.title}
                                            </h5>
                                            <hr />
                                        </div>

                                        <div className="p-0">
                                            <h5 className="card-title px-2">
                                                <span className=" fs-5 rounded fav-heads border-bottom mb-2">
                                                    Author:
                                                </span>
                                                <br />
                                                {book.authors}
                                            </h5>
                                            <hr />
                                        </div>

                                        <div className="p-0">
                                            <h5 className="card-title px-2">
                                                <span className=" fs-5 rounded fav-heads border-bottom mb-2">
                                                    Genres:
                                                </span>
                                                <br />
                                                {book.genres}
                                            </h5>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-5 py-3">
                                    <div className="card-body">
                                        <h5 className="fs-5 rounded fav-heads border-bottom">
                                            Description
                                        </h5>
                                        <div className="mb-2">
                                            <p
                                                style={{
                                                    height: "220px",
                                                    overflowY: "auto",
                                                }}
                                                className="card-text px-3"
                                            >
                                                {book.description}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() =>
                                                removeToFavorites(book)
                                            }
                                            className="btn btn-warning mt-3"
                                        >
                                            Remove from Favorites
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="container d-flex justify-content-center">
                        <h5 className=" m-5 p-3 fav-heads rounded border-bottom shadow">
                            Favorite list is empty.
                        </h5>
                    </div>
                )}
            </div>
            <Stack spacing={2}>
                <Pagination
                    className="paginationBtns"
                    onChange={handleChange}
                    count={pageCount}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                    renderItem={(item) => (
                        <PaginationItem
                            components={{
                                previous: ArrowBackSharpIcon,
                                next: ArrowForwardSharpIcon,
                            }}
                            {...item}
                        />
                    )}
                />
            </Stack>
        </div>
    );
}
export default Favorites;

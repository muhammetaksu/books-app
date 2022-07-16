import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { FavoriteBooks } from "./context/FavoritesContextProvider";
import { GetDataContext } from "./context/GetDataContextProvider";
import { LoaderContext } from "./context/LoaderContextProvider";
import {
    Autocomplete,
    TextField,
    Pagination,
    PaginationItem,
    Stack,
    Typography,
    Toolbar,
} from "@mui/material";

import ArrowForwardSharpIcon from "@mui/icons-material/ArrowForwardSharp";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

function BookList() {
    ////////// Context
    const { books, setBooks } = useContext(GetDataContext);
    const { favBooks, removeToFavorites, addToFavorites } =
        useContext(FavoriteBooks);
    const { loaderIsActive, setLoaderIsActive, tailSpinLoading } =
        useContext(LoaderContext);

    ////////// Paginate
    const [pageNumber, setPageNumber] = useState(1);
    const [booksPerPage, setbooksPerPage] = useState(12);
    const pagesVisited = pageNumber * booksPerPage;
    const displayBooks = books.slice(pagesVisited - booksPerPage, pagesVisited);
    ////////
    const pageCount = Math.ceil(books.length / booksPerPage);
    const changePage = (p) => {
        setPageNumber(p);
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

    ///////

    const favControl = (id) => {
        const select = favBooks.some((q) => q.id === id);
        return select;
    };

    const navigate = useNavigate();

    const goToBottom = () => {
        window.scrollTo(0, 9999999999999);
    };
    const goToTop = () => {
        window.scrollTo(0, 0);
    };

    const goToBookDetail = (id) => {
        window.scrollTo(0, 0);
        navigate(`/book/${id}`);
    };

    return (
        <>
            <div style={{ minHeight: "75vh" }} className="mx-5">
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
                        Book List
                    </h2>
                </div>
                <div className="row">
                    <div className="col-10">
                        <div className="d-flex justify-content-left h-100">
                            <p className="my-auto">
                                Click on the picture to see the book details.
                            </p>
                        </div>
                    </div>
                    <div className="col-2 d-flex justify-content-center m-auto">
                        <Typography className="fw-bold text-center bg-light rounded p-2">
                            Page {pageNumber}
                        </Typography>
                    </div>
                </div>

                <div id="bookListRow" className="row">
                    {loaderIsActive === true ? (
                        <div
                            style={{ height: "50vh" }}
                            className="d-flex justify-content-center my-5"
                        >
                            <div className="my-auto">{tailSpinLoading}</div>
                        </div>
                    ) : (
                        displayBooks.map((book) => (
                            <div
                                key={book.id}
                                className="col-sm-6 col-md-4 col-lg-3 col-xl-2 my-4"
                            >
                                <div
                                    id="card-box"
                                    className="card item-card card-block h-100"
                                >
                                    <div
                                        id="card-title"
                                        className="card-title text-center d-flex bg-light"
                                    >
                                        <h6 className="m-auto d-flex">
                                            <i className="material-icons m-auto">
                                                {book.title}
                                            </i>
                                        </h6>
                                    </div>
                                    <img
                                        style={{ cursor: "zoom-in" }}
                                        title="Click here to see the book details."
                                        className="mb-auto"
                                        onClick={() => goToBookDetail(book.id)}
                                        id="img-box"
                                        src={book.image_url}
                                        alt="#"
                                    />
                                    <h5 className="item-card-title my-3 ">
                                        Yazar: {book.authors}
                                    </h5>
                                    <h6
                                        id="quote-box"
                                        className="item-card-title my-0 mx-1"
                                    >
                                        <i id=""> {book.Quote1} </i>
                                    </h6>
                                    {favControl(book.id) ? (
                                        <button
                                            id="removeBtn"
                                            onClick={() =>
                                                removeToFavorites(book)
                                            }
                                            className="btn btn-bg-pink m-0 "
                                        >
                                            Remove from Favorites
                                        </button>
                                    ) : (
                                        <button
                                            id="addBtn"
                                            onClick={() => addToFavorites(book)}
                                            className="btn btn-bg-green m-0 "
                                        >
                                            Add to Favorites
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
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
        </>
    );
}

export default BookList;

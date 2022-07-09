import React, { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router";
import { FavoriteBooks } from "./context/FavoritesContextProvider";
import { GetDataContext } from "./context/GetDataContextProvider";
import { LoaderContext } from "./context/LoaderContextProvider";
import GoToTop from "./GoToTop";

function BookList() {
    ////////// Context
    const { books } = useContext(GetDataContext);
    const { favBooks, removeToFavorites, addToFavorites } =
        useContext(FavoriteBooks);
    const { loaderIsActive } = useContext(LoaderContext);

    ////////// Paginate
    const [pageNumber, setPageNumber] = useState(0);
    const booksPerPage = 12;
    const pagesVisited = pageNumber * booksPerPage;
    const displayBooks = books.slice(pagesVisited, pagesVisited + booksPerPage);
    ////////
    const pageCount = Math.ceil(books.length / booksPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    ////////

    const favControl = (id) => {
        const select = favBooks.some((q) => q.id === id);
        return select;
    };

    const navigate = useNavigate();

    return (
        <>
            <div id="container" className="mx-5">
                <h2 className="my-4 fav-heads rounded border-bottom shadow">
                    Book List
                </h2>

                <div id="bookListRow" className="row">
                    {loaderIsActive === true ? (
                        <div className="d-flex justify-content-center my-5">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
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
                                        title="Click here to see the book details."
                                        className="mb-auto"
                                        onClick={() =>
                                            navigate(`/book/${book.id}`)
                                        }
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
                                            onClick={() =>
                                                removeToFavorites(book.id)
                                            }
                                            className="btn btn-bg-pink m-0 "
                                        >
                                            Favorilerden Kaldır
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => addToFavorites(book)}
                                            className="btn btn-bg-green m-0 "
                                        >
                                            Favorilere Ekle
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBtns"}
                previousLinkClassName={"previousBtn"}
                nextLinkClassName={"nextBtn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />
            <GoToTop />
        </>
    );
}

export default BookList;

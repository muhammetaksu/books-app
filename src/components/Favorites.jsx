import React, { useContext, useState } from "react";
import { FavoriteBooks } from "./context/FavoritesContextProvider";
import "animate.css";
import GoToTop from "./GoToTop";
import ReactPaginate from "react-paginate";

function Favorites() {
    const { favBooks, removeToFavorites } = useContext(FavoriteBooks);

    ////////// Paginate
    const [pageNumber, setPageNumber] = useState(0);
    const booksPerPage = 4;
    const pagesVisited = pageNumber * booksPerPage;
    const displayBooks = favBooks.slice(
        pagesVisited,
        pagesVisited + booksPerPage
    );
    ////////
    const pageCount = Math.ceil(favBooks.length / booksPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    ////////

    return (
        <div id="container" className="container">
            <div className="row ">
                {displayBooks.length > 0 ? (
                    displayBooks.map((book) => (
                        <div
                            key={book.id}
                            className="col-12  d-flex justify-content-center mt-3 mb-3"
                        >
                            <div className="row border rounded shadow">
                                <div
                                    id="bookDetailImg"
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
                                            <h5 className="card-title">
                                                <span className=" fs-5 rounded fav-heads border-bottom mb-2">
                                                    Name:
                                                </span>
                                                <br />
                                                {book.title}
                                            </h5>
                                            <hr />
                                        </div>

                                        <div className="p-0">
                                            <h5 className="card-title">
                                                <span className=" fs-5 rounded fav-heads border-bottom mb-2">
                                                    Author:
                                                </span>
                                                <br />
                                                {book.authors}
                                            </h5>
                                            <hr />
                                        </div>

                                        <div className="p-0">
                                            <h5 className="card-title">
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
                                                removeToFavorites(book.id)
                                            }
                                            className="btn btn-warning mt-3"
                                        >
                                            Remove From Favorites
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="container">
                        <h3 className="m-5 fav-heads rounded border-bottom shadow">
                            Favorite list is empty.
                        </h3>
                    </div>
                )}
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
        </div>
    );
}
export default Favorites;

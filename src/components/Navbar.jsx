import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoriteBooks } from "./context/FavoritesContextProvider";

function Navbar() {
    const { favBooks } = useContext(FavoriteBooks);
    const goToTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <>
            <nav
                style={{
                    backgroundColor: "#282d32",
                    position: "sticky",
                    top: "0",
                    zIndex: "1",
                }}
                className="navbar navbar-expand-lg"
            >
                <div className="container-fluid ms-3">
                    <Link
                        onClick={() => goToTop()}
                        className="navbar-brand text-white"
                        to="/"
                    >
                        Kampüs365 Book App
                    </Link>
                    <button
                        className="navbar-toggler text-white"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <svg
                            className="text-white bi bi-list"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                            />
                        </svg>
                    </button>
                    <div
                        className="collapse navbar-collapse flex-row-reverse"
                        id="navbarNavAltMarkup"
                    >
                        <div className="navbar-nav me-3">
                            <Link
                                className="nav-link text-white active "
                                onClick={() => goToTop()}
                                aria-current="page"
                                to="/favorites"
                            >
                                <button
                                    type="button"
                                    className="btn btn-light position-relative"
                                >
                                    Favorite List
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {favBooks.length}
                                    </span>
                                </button>
                            </Link>
                        </div>
                        <div className="navbar-nav me-3">
                            <Link
                                className="nav-link text-white active "
                                onClick={() => goToTop()}
                                aria-current="page"
                                to="/"
                            >
                                Homepage
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <div className="footer-dark">
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-md-3 item">
                            <h3>Services</h3>
                            <ul>
                                <Link to="/">Homepage</Link>
                                <br />
                                <Link to="/favorites">Favorites</Link>
                                <br />
                                <a href="#container">Go to Top</a>
                            </ul>
                        </div>
                        <div className="col-sm-6 col-md-3 item">
                            <h3>About</h3>
                            <ul>
                                <li>
                                    <a href="#">Company</a>
                                </li>
                                <li>
                                    <a href="#">Team</a>
                                </li>
                                <li>
                                    <a href="#">Careers</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-6 item text">
                            <h3>Kampüs 365</h3>
                            <p>
                                Praesent sed lobortis mi. Suspendisse vel
                                placerat ligula. Vivamus ac sem lacus. Ut
                                vehicula rhoncus elementum. Etiam quis tristique
                                lectus. Aliquam in arcu eget velit pulvinar
                                dictum vel in justo.
                            </p>
                        </div>
                    </div>
                    <p className="copyright">Company Name © 2018</p>
                </div>
            </footer>
        </div>
    );
}

export default Footer;

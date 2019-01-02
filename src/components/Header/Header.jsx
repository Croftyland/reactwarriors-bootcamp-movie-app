import React from "react";
import User from "./User";
import {Link} from "react-router-dom";

class Header extends React.Component {
    render() {
        const { toggleModal, user } = this.props;
        return (
            <nav className="navbar navbar-dark bg-primary">
                <div className="container">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to={`/`}>Home</Link>
                        </li>
                    </ul>
                    {user ? (
                        <User />
                    ) : (
                        <button
                            className="btn btn-success"
                            type="button"
                            onClick={toggleModal}
                        >
                            Login
                        </button>
                    )}
                </div>
            </nav>
        );
    }
}

export default Header;

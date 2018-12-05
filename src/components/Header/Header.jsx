import React from "react";
import UserMenu from "./User";

class Header extends React.Component {
    render() {
        const { toggleModal, user } = this.props;
        return (
            <nav className="navbar navbar-dark bg-primary">
                <div className="container">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link">Home</a>
                        </li>
                    </ul>
                    {user ? (
                        <UserMenu />
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

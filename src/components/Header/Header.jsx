import React from "react";
import Login from "./Login/Login";
import User from "./User";
import PropTypes from "prop-types";

class Header extends React.Component {
    render() {
        const { user, toggleLoginModal } = this.props;

        return (
            <nav className="navbar navbar-dark bg-primary">
                <div className="container">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link">Home</a>
                        </li>
                    </ul>
                    {user ? (
                        <User user={user} />
                    ) : (
                        <Login toggleLoginModal={toggleLoginModal} />
                    )}
                </div>
            </nav>
        );
    }
}

Header.defaultProps = {
    user: null
};

Header.propTypes = {
    user: PropTypes.object,
    toggleLoginModal: PropTypes.func.isRequired
};

export default Header;
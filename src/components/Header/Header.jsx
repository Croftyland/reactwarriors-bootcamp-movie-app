import React from "react";
import Login from "./Login/Login";
import User from "./User";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";

@inject(({ userStore }) => ({
  userStore
}))
@observer
class Header extends React.Component {
  render() {
    const {
      userStore: { isAuth }
    } = this.props;
    return (
      <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
        <div className="container">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item mr-2">
              <Link style={{ color: "white" }} to="/">
                Home
              </Link>
            </li>
            {isAuth ? (
              <li className="nav-item">
                <Link style={{ color: "white" }} to="/favorites">
                  Favorites
                </Link>
              </li>
            ) : (
              false
            )}
          </ul>
          {isAuth ? <User  /> : <Login />}
        </div>
      </nav>
    );
  }
}

export default Header;

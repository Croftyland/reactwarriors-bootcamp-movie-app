import React from "react";
import {
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown
} from "reactstrap";
import CallApi from "../../api/api";
import HOC from "../HOC/HOC";

class User extends React.Component {
    constructor() {
        super();

        this.state = {
            logoutDropdown: false
        };
    }

    logoutDropdownToggle = () => {
        this.setState({
            logoutDropdown: !this.state.logoutDropdown
        });
    };

    logout = () => {
        const { resetUserInfo } = this.props;

        CallApi.delete("/authentication/session", {
            body: {
                session_id: this.props.session_id
            }
        })
            .then(data => console.log(data));
        resetUserInfo();
    };

    render() {
        const { user } = this.props;

        return (
            <React.Fragment>
                <UncontrolledDropdown>
                    <DropdownToggle nav>
                        <img
                            className="rounded-circle"
                            src={`https://www.gravatar.com/avatar/${
                                user.avatar.gravatar.hash
                                }.jpg?s=40`}
                            alt="avatar"
                            onClick={this.logoutDropdownToggle}
                        />
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header>Выйти?</DropdownItem>
                        <DropdownItem onClick={this.logout}>Да</DropdownItem>
                        <DropdownItem>Нет</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </React.Fragment>
        );
    }
}

export default HOC(User);
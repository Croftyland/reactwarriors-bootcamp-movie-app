import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import AppContextHOC from "../HOC/AppContextHOC";
import { inject, observer } from "mobx-react";

@inject(({ userStore }) => ({
  userStore
}))
@observer
class UserMenu extends React.Component {
  state = {
    dropdownOpen: false
  };
  toggleDropdown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  render() {
    console.log(this.props);
    const { userStore : {user, onLogout }} = this.props;
    return (
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
          <DropdownToggle tag="div" onClick={this.toggleDropdown}>
            <img
                alt="avatar"
                width="40"
                className="rounded-circle"
                src={`https://secure.gravatar.com/avatar/${
                    user.avatar.gravatar.hash
                    }.jpg?s=64"`}
            />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={onLogout}>Выход</DropdownItem>
          </DropdownMenu>
        </Dropdown>
    );
  }
}

export default AppContextHOC(UserMenu);

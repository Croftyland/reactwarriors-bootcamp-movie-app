import React from "react";
import AddMovieHOC from "../HOC/AddMovieHOC";
import AppContextHOC from "../HOC/AppContextHOC";
import UIIcon from "../UIComponents/UIIcon";

class FavoriteIcon extends React.Component {
    render() {
        const { onClick, isAdd } = this.props;
        return <UIIcon onClick={onClick} isAdd={isAdd} type="heart" />;
    }
}

export default AppContextHOC(AddMovieHOC(FavoriteIcon, "favorite"));

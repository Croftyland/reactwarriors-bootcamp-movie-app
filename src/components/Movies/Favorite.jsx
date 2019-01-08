import React from "react";
import AddFavoriteHOC from "../HOC/AddFavoriteHOC";
import AppContextHOC from "../HOC/AppContextHOC";
import UIIcon from "../UIComponents/UIIcon";

const Favorite = ({changeFavorite, isAdd}) => {
    return (
        <UIIcon isAdd={isAdd} type="heart" onClick={changeFavorite("favorite")}/>
    );
};

export default AppContextHOC(AddFavoriteHOC(Favorite, "favoriteMovies"));

/*  componentDidUpdate(prevProps, prevState) {
     if (
       prevState.user === null &&
       !_.isEqual(prevState.user, this.state.user)
     ) {
       console.log("render didupdate");
       this.getFavoriteMovies();
       this.getWatchListMovies();
     }
   } */


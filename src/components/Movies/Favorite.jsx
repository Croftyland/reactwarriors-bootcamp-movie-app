import React from "react";
import AddFavoriteHOC from "../HOC/AddFavoriteHOC";
import AppContextHOC from "../HOC/AppContextHOC";
import UIIcon from "../UIComponents/UIIcon";

const Favorite = ({ changeFavorite, isAdd }) => {
  return (
    <UIIcon isAdd={isAdd} type="heart" onClick={changeFavorite("favorite")} />
  );
};

export default AppContextHOC(AddFavoriteHOC(Favorite, "favoriteMovies"));

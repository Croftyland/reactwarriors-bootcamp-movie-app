import React from "react";
import  AddMovieHOC  from "../HOC/AddMovieHOC";
import UIIcon from "../UIComponents/UIIcon";
import AppContextHOC from "../HOC/AppContextHOC";

const WatchList = ({ changeFavorite, isAdd }) => {
  return (
    <UIIcon
      isAdd={isAdd}
      type="bookmark"
      onClick={changeFavorite("watchlist")}
    />
  );
};
export default  AppContextHOC(AddMovieHOC(WatchList, "watchlistMovies"));

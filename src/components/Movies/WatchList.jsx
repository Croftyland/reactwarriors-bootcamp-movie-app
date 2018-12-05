import React from "react";
import AddFavoriteHOC from "../HOC/AddFavoriteHOC";
import AppContextHOC from "../HOC/AppContextHOC";
import UIIcon from "../UIComponents/UIIcon";

const WatchList = ({ changeFavorite, isAdd }) => {
  return (
    <UIIcon
      isAdd={isAdd}
      type="bookmark"
      onClick={changeFavorite("watchlist")}
    />
  );
};
export default AppContextHOC(AddFavoriteHOC(WatchList, "watchlistMovies"));

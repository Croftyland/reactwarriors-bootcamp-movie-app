import React from "react";
import PropTypes from "prop-types";
import Favorite from "../Movies/Favorite";
import WatchList from "../Movies/WatchList";

export default class MovieItem extends React.Component {
  static propTypes = {
    session_id: PropTypes.string,
    user: PropTypes.object,
    item: PropTypes.object.isRequired
  };

  render() {
    const { item } = this.props;
    return (
      <div className="card" style={{ width: "100%" }}>
        <img
          className="card-img-top card-img--height"
          src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
            item.poster_path}`}
          alt=""
        />
        <div className="card-body">
          <h6 className="card-title">{item.title}</h6>
          <div className="card-text">Рейтинг: {item.vote_average}</div>
          <Favorite item={item} />
          <WatchList item={item} />
        </div>
      </div>
    );
  }
}

import React from "react";
import PropTypes from "prop-types";
import Favorite from "../Movies/Favorite";
import WatchList from "../Movies/WatchList";
import { Link } from "react-router-dom"

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
          <Link className="card-title" to={`/movie/${item.id}`}>{item.title}</Link>
          <div className="card-text">Рейтинг: {item.vote_average}</div>
          <Favorite item={item} />
          <WatchList item={item} />
        </div>
      </div>
    );
  }
}

import React from "react";
import MovieItem from "./MovieItem";
import PropTypes from "prop-types";
import MoviesHOC from "../HOC/MoviesHOC"

const MoviesList = ({ movies, user, session_id }) => (
  <div className="row">
    {movies.map(movie => {
      return (
        <div key={movie.id} className="col-6 mb-4">
          <MovieItem
            item={movie}
            user={user}
            session_id={session_id}
          />
        </div>
      );
    })}
  </div>
);

MoviesList.defaultProps = {
  movies: []
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired
};

export default  MoviesHOC(MoviesList);

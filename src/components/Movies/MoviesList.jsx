import React from "react";
import MovieItem from "./MovieItem";
import PropTypes from "prop-types";
import MoviesHOC from "./MoviesHOC";

const MoviesList = ({
                        movies,
                        user,
                        session_id,
                        showModal,
                        toggleLoginModal
                    }) => (
    <div className="row">
        {movies.map(movie => {
            return (
                <div key={movie.id} className="col-6 mb-4">
                    <MovieItem
                        item={movie}
                        user={user}
                        session_id={session_id}
                        showModal={showModal}
                        toggleLoginModal={toggleLoginModal}
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
    movies: PropTypes.array.isRequired,
    user: PropTypes.object
};

export default MoviesHOC(MoviesList);
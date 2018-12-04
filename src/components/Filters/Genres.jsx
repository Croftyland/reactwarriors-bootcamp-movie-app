import React from "react";
import GenresHOC from "./GenresHOC";
import PropTypes from "prop-types";

const Genres = ({ genres, with_genres, resetGenres, onChange }) => (
    <React.Fragment>
        <div>
            <button
                type="button"
                className="btn btn-outline-dark mb-2"
                onClick={resetGenres}
            >
                Показать все жанры
            </button>
        </div>
        <div className="mb-3">
            {genres.map(genre => {
                return (
                    <div key={genre.id} className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value={genre.id}
                            id={`genre${genre.id}`}
                            onChange={onChange}
                            checked={with_genres.includes(String(genre.id))}
                        />
                        <label className="form-check-label" htmlFor={`genre${genre.id}`}>
                            {genre.name}
                        </label>
                    </div>
                );
            })}
        </div>
    </React.Fragment>
);

Genres.defaultProps = {
    genres: []
};

Genres.propTypes = {
    genres: PropTypes.array.isRequired
};

export default GenresHOC(Genres);
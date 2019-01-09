import React from "react";
import { inject, observer } from "mobx-react";

@inject(({ moviesPageStore }) => ({
    genresList: moviesPageStore .genresList,
    resetGenres: moviesPageStore .resetGenress,
    with_genres: moviesPageStore .filters.with_genres,
    changeFilters: moviesPageStore .changeFilters,
    getGenres: moviesPageStore.getGenres
}))
@observer
class Genres extends React.Component {
  componentDidMount() {
    this.props.getGenres();
  }
  render() {
    const {
        genresList,
        resetGenres,
        changeFilters,
        with_genres

    } = this.props;
    return (
      <React.Fragment>
        <button
          type="button"
          className="btn btn-outline-dark mb-2 w-100"
          onClick={resetGenres}
        >
          Показать все жанры
        </button>

        <div className="mb-3">
          {genresList.map(genre => {
            return (
              <div key={genre.id} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={genre.id}
                  id={`genre${genre.id}`}
                  onChange={changeFilters}
                  checked={with_genres.includes(String(genre.id))}
                />
                <label
                  className="form-check-label"
                  htmlFor={`genre${genre.id}`}
                >
                  {genre.name}
                </label>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default Genres;

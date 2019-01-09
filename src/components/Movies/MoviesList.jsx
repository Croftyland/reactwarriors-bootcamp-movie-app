import React from "react";
import MovieItem from "./MovieItem";
import Loader from "react-loader-spinner";
import { inject, observer } from "mobx-react";

@inject(({ moviesPageStore }) => ({
  moviesPageStore
}))
@observer
class MoviesList extends React.Component {
  componentDidMount() {
    this.props.moviesPageStore.getMovies();
  }

  render() {
    const {
      moviesPageStore: { isLoading, movies }
    } = this.props;
    return isLoading ? (
        <span className="spinner">
        <Loader type="Audio" color="salmon" height={80} width={80} />
      </span>
    ) : (
        <div className="row">
          {movies.map(movie => {
            return (
                <div key={movie.id} className="col-6 mb-4">
                  <MovieItem item={movie} />
                </div>
            );
          })}
        </div>
    );
  }
}

export default MoviesList;
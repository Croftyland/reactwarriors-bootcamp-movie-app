import React from "react";
import MovieItem from "./MovieItem";
import { observer, inject } from "mobx-react";
import Loader from "react-loader-spinner";

@inject(({ moviesPageStore, userStore }) => ({
  moviesPageStore,
  userStore
}))
@observer
class MoviesList extends React.Component {

  componentDidMount() {
    this.props.moviesPageStore.getMovies(
    );
  }

  render() {
    const {
      moviesPageStore: { isLoading, movies },
      userStore: { user, session_id }
    } = this.props;

    if (isLoading) {
      return (
          <span className="loader">
          <Loader type="ThreeDots" />
        </span>
      );
    }
    return (
        <div className="row">
          {movies.map(movie => {
            return (
                <div key={movie.id} className="col-6 mb-4">
                  <MovieItem item={movie} user={user} session_id={session_id} />
                </div>
            );
          })}
        </div>
    );
  }
}

export default MoviesList;

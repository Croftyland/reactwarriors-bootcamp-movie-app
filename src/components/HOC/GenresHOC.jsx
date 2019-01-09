import React from "react";
import { inject, observer } from "mobx-react";

export default Component => {
  @inject(({ moviesPageStore }) => ({
    moviesPageStore
  }))
  @observer
  class GenresHOC extends React.Component {
    componentDidMount() {
      this.props.moviesPageStore.getGenres();
    }

    render() {
      const {
        moviesPageStore: { genresList }
      } = this.props;

      return <Component genres={genresList} {...this.props} />;
    }
  }
  return GenresHOC;
};
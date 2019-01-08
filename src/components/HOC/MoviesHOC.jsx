import React from "react";
import { inject, observer } from "mobx-react";
import UILoader from "../UIComponents/UILoader";

export default Component => {
    @inject(({ moviesPageStore }) => ({
        moviesPageStore
    }))
    @observer
    class MoviesHOC extends React.Component {
        componentDidMount() {
            this.props.moviesPageStore.getMovies();
        }

        render() {
            const {
                moviesPageStore: { isLoading, movies }
            } = this.props;
            return isLoading ? <UILoader /> : <Component {...this.props} movies={movies} />;
        }
    }
    return MoviesHOC;
};
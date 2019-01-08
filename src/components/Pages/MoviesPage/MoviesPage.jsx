import React from "react";
import Filters from "../../Filters/Filters";
import MoviesList from "../../Movies/MoviesList";
import { inject, observer } from "mobx-react";

@inject(({ moviesPageStore }) => ({
    moviesPageStore
}))
@observer
class MoviesPage extends React.Component {
    render() {
        const {
            moviesPageStore: { clearAllFilters }
        } = this.props;

        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col-4">
                        <div className="card" style={{ width: "100%" }}>
                            <div className="card-body">
                                <h3>Фильтры:</h3>
                                <Filters />
                                <button
                                    type="button"
                                    className="btn btn-danger w-100"
                                    onClick={clearAllFilters}
                                >
                                    Очистить Фильтры
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <MoviesList />
                    </div>
                </div>
            </div>
        );
    }
}

export default MoviesPage;
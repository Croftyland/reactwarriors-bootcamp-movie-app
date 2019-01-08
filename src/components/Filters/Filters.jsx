import React from "react";
import SortBy from "./SortBy";
import PrimaryReleaseYear from "./PrimaryReleaseYear";
import Pagination from "./Pagination";
import Genres from "./Genres";
import { observer, inject } from "mobx-react";

@inject(({ moviesPageStore }) => ({
    moviesPageStore
}))
@observer
class Filters extends React.Component {
    render() {
        console.log("render Filters");
        const {
            moviesPageStore: { onClearFilters }
        } = this.props;
        return (
            <form className="mb-3">
                <button
                    type="button"
                    className="btn btn-light"
                    onClick={onClearFilters}
                >
                    Сбросить фильтры
                </button>
                <SortBy />
                <PrimaryReleaseYear />
                <Genres />
                <Pagination />
            </form>
        );
    }
}
export default Filters;

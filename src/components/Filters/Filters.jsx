import React from "react";
import SortBy from "./SortBy";
import Pagination from "./Pagination";
import PrimaryReleaseYear from "./PrimaryReleaseYear";
import Genres from "./Genres";
import {observer} from "mobx-react";

@observer
class Filters extends React.Component {
    render() {
        return (
            <form className="mb-3">
                <SortBy/>
                <Genres/>
                <Pagination/>
                <PrimaryReleaseYear/>
            </form>
        );
    }
}

export default Filters;
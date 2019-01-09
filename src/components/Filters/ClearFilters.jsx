import React from "react";
import {observer, inject} from "mobx-react"

@inject (({ moviesPageStore }) =>({
   moviesPageStore
}))
@observer
class ClearFilters extends React.Component {
    render() {

            const {
                moviesPageStore: {clearFilters}
            } = this.props;
        return (
            <div>
                <button type="button" className="btn btn-primary" onClick = {clearFilters}>
                    Очистить фильтры
                </button>
            </div>
        );
    }
}
export default ClearFilters
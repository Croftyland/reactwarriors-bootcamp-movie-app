import React from "react";
import UISelect from "../UIComponents/UISelect";
import { observer, inject } from "mobx-react";

@inject(({ moviesPageStore }) => ({
    moviesPageStore
}))
@observer
class PrimaryReleaseYear extends React.Component {
    static defaultProps = {
        options: [
            {
                label: "2018",
                value: "2018"
            },
            {
                label: "2017",
                value: "2017"
            },
            {
                label: "2016",
                value: "2016"
            },
            {
                label: "2015",
                value: "2015"
            }
        ]
    };

    render() {
        const { moviesPageStore:{filters,onChangeFilters}, options } = this.props;
        console.log("PrimaryReleaseYear render");
        return (
            <UISelect
                id="primary_release_year"
                name="primary_release_year"
                value={filters.primary_release_year}
                onChange={onChangeFilters}
                labelText="Год релиза:"
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </UISelect>
        );
    }
}
export default PrimaryReleaseYear;

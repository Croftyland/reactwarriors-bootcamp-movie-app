import React from "react";
import PropTypes from "prop-types";
import UISelect from "../UIComponents/UISelect";

export default class SortBy extends React.PureComponent {
    static propTypes = {
        onChangeFilters: PropTypes.func.isRequired,
        sort_by: PropTypes.string.isRequired
    };
    static defaultProps = {
        options: [
            {
                label: "Популярные по убыванию",
                value: "popularity.desc"
            },
            {
                label: "Популярные по возростанию",
                value: "popularity.asc"
            },
            {
                label: "Рейтинг по убыванию",
                value: "vote_average.desc"
            },
            {
                label: "Рейтинг по возростанию",
                value: "vote_average.asc"
            }
        ]
    };

    render() {
        const { sort_by, onChangeFilters, options } = this.props;
        console.log("sort by");
        return (
            <UISelect
                id="sort_by"
                name="sort_by"
                sort_by={sort_by}
                value={sort_by}
                onChange={onChangeFilters}
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
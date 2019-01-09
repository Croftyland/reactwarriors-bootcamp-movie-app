import React from "react";
import UISelect from "../UIComponents/UISelect";
import { inject, observer } from "mobx-react";

@inject(({ moviesPageStore }) => ({
  moviesPageStore
}))
@observer
class SortBy extends React.Component {
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
    const {
      moviesPageStore: {
        filters: { sort_by },
        onChangeFilters
      },
      options
    } = this.props;
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
export default SortBy;

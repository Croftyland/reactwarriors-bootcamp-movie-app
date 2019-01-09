import React from "react";
import UISelect from "../UIComponents/UISelect";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";

@inject(({ moviesPageStore }) => ({
  moviesPageStore
}))
@observer
class PrimaryReleaseYear extends React.Component {
  static propTypes = {
    moviesPageStore: PropTypes.object.isRequired
  };

  static defaultProps = {
    options: [
      {
        label: "Все фильмы",
        value: ""
      },
      {
        label: "2019",
        value: "2019"
      },
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
    const {
      moviesPageStore: {
        filters: { primary_release_year },
        onChangeFilters
      },
      options
    } = this.props;

    return (
      <UISelect
        id="primary_release_year"
        name="primary_release_year"
        primary_release_year={primary_release_year}
        value={primary_release_year}
        onChange={onChangeFilters}
        labelText="Год релиза:"
      >
        {options.map(option => (
          <option
            key={option.value}
            value={option.value}
            defaultValue={primary_release_year}
          >
            {option.label}
          </option>
        ))}
      </UISelect>
    );
  }
}
export default PrimaryReleaseYear;

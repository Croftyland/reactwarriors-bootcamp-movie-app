import React from "react";
import CallApi from "../../api/api";

export default Component =>
    class GenresHOC extends React.Component {
        constructor() {
            super();

            this.state = {
                genresList: []
            };
        }

        componentDidMount() {
            CallApi.get("/genre/movie/list", {
                params: {
                    language: "ru-RU"
                }
            }).then(data => {
                this.setState({
                    genresList: data.genres
                });
            });
        }

        onChange = event => {
            this.props.onChangeFilters({
                target: {
                    name: "with_genres",
                    value: event.target.checked
                        ? [...this.props.with_genres, event.target.value]
                        : this.props.with_genres.filter(
                            genre => genre !== event.target.value
                        )
                }
            });
        };

        resetGenres = () => {
            this.props.onChangeFilters({
                target: {
                    name: "with_genres",
                    value: []
                }
            });
        };

        render() {
            const { genresList } = this.state;
            const { with_genres } = this.props;
            return (
                <Component
                    resetGenres={this.resetGenres}
                    onChange={this.onChange}
                    genresList={genresList}
                    with_genres={with_genres}
                />
            );
        }
    };

import {observable, action, configure, reaction, values, runInAction} from "mobx";
import CallApi from "../api/api";

configure({ enforceActions: "always" });

const initialFilters = {
    sort_by: "popularity.desc",
    primary_release_year: "2018",
    with_genres: []
};

class MoviesPageStore {
    constructor() {
        reaction(
            () => this.filters.with_genres.length,
            () => {
                console.log(this.filters.sort_by);
                this.onChangePagination({ page: 1 });
                this.getMovies();
            }
        );
        reaction(
            () => values(this.filters),
            () => {
                console.log(this.filters.sort_by);
                this.onChangePagination({ page: 1 });
                this.getMovies();
            }
        );

        reaction(
            () => this.page,
            () => {
                this.getMovies();
            }
        );
    }

    @observable movies = [];

    @observable isLoading = false;

    @observable filters = initialFilters;

    @observable genresList = [];

    @observable page = 1;

    @observable total_pages = "";

    @action
    getMovies = () => {
        this.isLoading = true;
        const { sort_by, primary_release_year, with_genres } = this.filters;
        const queryStringParams = {
            language: "ru-RU",
            sort_by: sort_by,
            page: this.page,
            primary_release_year: primary_release_year
        };

        if (with_genres.length > 0)
            queryStringParams.with_genres = with_genres.join(",");

        CallApi.get("/discover/movie", {
            params: queryStringParams
        }).then(data => {
            this.onChangePagination({
                page: data.page,
                total_pages: data.total_pages
            });
            this.movies = data.results;
            this.isLoading = false;
        });
    };

    @action
    getGenres = () => {
        CallApi.get("/genre/movie/list", {
            params: {
                language: "ru-RU"
            }
        }).then(data => {
            runInAction(
                () => {
                    this.genresList.replace(data.genres);
                }
            )

        });
    };


    @action
    updateLoading = value => {
        this.isLoading = value;
    };



    @action
    onChangePage = page => {
        this.page = page;
    };

    @action
    updateFilters = filters => {
        for (const key in filters) {
            this.filters[key] = filters[key];
        }
    };

    @action
    clearAllFilters = () => {
        this.updateFilters(initialFilters);
        this.page = 1;
        this.total_pages = "";
    };

    @action
    onChangeFilters = event => {
        this.filters[event.target.name] = event.target.value;
    };

    @action
    onChangeGenres = event => {
        this.onChangeFilters({
            target: {
                name: "with_genres",
                value: event.target.checked
                    ? [...this.filters.with_genres, event.target.value]
                    : this.filters.with_genres.filter(
                        genre => genre !== event.target.value
                    )
            }
        });
    };

    @action
    onClearFilters = () => {
        for (let key in initialFilters){
            switch (key) {
                case "with_genres":
                    this.filters[key].clear();
                    break;
                default:
                    this.filters[key] = initialFilters[key];
            }
        }
        this.page = 1;
        this.total_pages = "";
    };

    @action
    nextPage = () => {
        this.onChangePage(this.page + 1);
    };

    @action
    prevPage = () => {
        this.onChangePage(this.page - 1);
    };
}

export const moviesPageStore = new MoviesPageStore();
import { observable, action, configure, reaction, values,flow } from "mobx";
import CallApi from "../api/api";

configure({ enforceActions: "always" });

const defaultFilters = {
    sort_by: "popularity.desc",
    primary_release_year: "2018",
    with_genres: []
};

class MoviesPageStore {
    @observable movies = [];

    @observable isLoading = false;

    @observable filters = defaultFilters;

    @observable genresList = [];

    @observable page = 1;

    @observable total_pages = "";

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



    getMovies = flow(function*() {
        moviesPageStore.isLoading = true;
            const { sort_by, primary_release_year, with_genres
            } = moviesPageStore.filters;
            let queryParams = {
                language: "ru-RU",
                sort_by: sort_by,
                page: this.page,
                primary_release_year: primary_release_year
            };
            if (with_genres.length > 0) {
                queryParams.with_genres = with_genres.join(",");
            }
            const data = yield CallApi.get("/discover/movie", {
                params: queryParams
            });
            moviesPageStore.movies.replace(data.results);
            moviesPageStore.total_pages = data.total_pages;
            moviesPageStore.isLoading = false;

    });

    @action
    onChangePagination = ({ page, total_pages }) => {
        this.page = page;
        this.total_pages = total_pages;
    };

    @action
    getGenres = () => {
        CallApi.get("/genre/movie/list", {
            params: {
                language: "ru-RU"
            }
        }).then(data => {
            this.updateGenresList(data.genres);
        });
    };

    @action
    updateGenresList = genres => {
        this.genresList = genres;
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
        this.updateFilters(defaultFilters);
        this.page = 1;
        this.total_pages = "";
    };

    @action
    onChangeFilters = event => {
        this.filters[event.target.name] = event.target.value;
    };

    @action
    changeFilters = event => {
        const { with_genres } = this.filters;
        const value = event.target.checked
            ? [...with_genres, event.target.value]
            : with_genres.filter(genre => genre !== event.target.value);
        this.filters.with_genres = value;
    };;

    @action
    resetGenres = () => {
        this.onChangeFilters({
            target: {
                name: "with_genres",
                value: []
            }
        });
    };

    @action
    nextPage = () => {
        this.onChangePagination({
            page: this.page + 1,
            total_pages: this.total_pages
        });
    };

    @action
    prevPage = page => event => {
        this.onChangePagination({
            page: this.page - 1,
            total_pages: this.total_pages
        });
    };
}

export const moviesPageStore = new MoviesPageStore();
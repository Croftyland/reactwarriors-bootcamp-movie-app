import { observable, action, computed } from "mobx";
import CallApi from "../api/api";
import Cookies from "universal-cookie";


const cookies = new Cookies();

class UserStore {
    @observable user = {};
    @observable session_id = {};
    @observable watchlistMovies = [];
    @observable favoriteMovies = [];

    @computed get isAuth() {
        return Boolean(Object.keys(this.user).length);
    }

    @action
    updateAuth = (user, session_id) => {
        cookies.set("session_id", session_id, {
            path: "/",
            maxAge: 2592000
        });
        this.session_id = session_id;
        this.user = user;

    };

    @action
    updateUser = user => {
        this.user = user;
    };

    @action
    updateSessionId = session_id => {
        cookies.set("session_id", session_id, {
            path: "/",
            maxAge: 2592000
        });
        this.session_id = session_id;
    };

    @action
    getUser = () => {
        this.isLoading = true;
        const session_id = cookies.get("session_id");
        if (session_id) {
            CallApi.get("/account", {
                params: {
                    session_id: session_id
                }
            }).then(user => {
                this.updateAuth(user, session_id);
            });
        }
    };

    @action
    onLogout = () => {
        cookies.remove("session_id", { path: "/" });
        this.user = {};
        this.session_id = null;
        CallApi.delete("/authentication/session", {
            body: {
                session_id: this.session_id
            }
        });
    };

    @action
    getFavoriteMovies = () => {
        let userFavMovies = [];
        CallApi.get(`/account/${this.user.id}/favorite/movies`, {
            params: {
                session_id: this.session_id
            }
        }).then(data => {
            data.results.map(movie => {
                return userFavMovies.push(movie.id);
            });
            this.favoriteMovies = userFavMovies;
        });
    };

    @action
    getWatchListMovies = () => {
        let userWatchlistMovies = [];
        CallApi.get(`/account/${this.user.id}/watchlist/movies`, {
            params: {
                session_id: this.session_id
            }
        }).then(data => {
            data.results.map(movie => {
                return userWatchlistMovies.push(movie.id);
            });
            this.watchlistMovies = userWatchlistMovies;
        });
    };
}

export const userStore = new UserStore();


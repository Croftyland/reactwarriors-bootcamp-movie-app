import React from "react";
import Header from "./Header/Header";
import CallApi from "../api/api";
import Cookies from "universal-cookie";
import LoginModal from "./Header/Login/Login";
import MoviesPage from "./Pages/MoviesPage/MoviesPage"
import MoviePage from "./Pages/MoviePage/MoviePage"
import { BrowserRouter, Route } from "react-router-dom";
import _ from "lodash"
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBookmark, faHeart } from "@fortawesome/free-solid-svg-icons";
import {
    faBookmark as bookmarkRegular,
    faHeart as heartRegular
} from "@fortawesome/free-regular-svg-icons";
library.add(faBookmark, faHeart, bookmarkRegular, heartRegular);

const cookies = new Cookies();
export const AppContext = React.createContext();
export default class App extends React.Component {
    constructor() {
        super();

        this.state = {
            user: null,
            session_id: null,
            showLoginModal: false,
            watchlistMovies: [],
            favoriteMovies: []
        };
    }

    toggleModal = () => {
        this.setState(prevState => ({
            showLoginModal: !prevState.showLoginModal
        }));
    };

    updateAuth = (user, session_id) => {
        cookies.set("session_id", session_id, {
            path: "/",
            maxAge: 2592000
        });
        this.setState({
            user: user,
            session_id: session_id
        });
    };
    updateUser = user => {
        this.setState({
            user: user
        });
    };

    updateSessionId = session_id => {
        cookies.set("session_id", session_id, {
            path: "/",
            maxAge: 2592000
        });
        this.setState({
            session_id: session_id
        });
    };

    onClear = () => {
        const PureState = {
            filters: {
                sort_by: "popularity.desc",
                primary_release_year: "2018",
                with_genres: []
            },
            page: 1,
            total_pages: ""
        };

        this.setState({ ...PureState });
    };

    componentDidMount() {
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
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.user === null && !_.isEqual(prevState.user, this.state.user))
        {
            console.log("render didupdate");
            this.getFavoriteMovies();
            this.getWatchListMovies();

        }

    }

    onLogout = () => {
        CallApi.delete("/authentication/session", {
            body: {
                session_id: this.state.session_id
            }
        }).then(data => {
            cookies.remove("session_id");
            this.setState({
                user: null,
                session_id: null,
                favoriteMovies: [],
                watchlistMovies: []
            });
        });
    };


    getFavoriteMovies = () => {
        let userFavMovies = [];
        CallApi.get(`/account/${this.state.user.id}/favorite/movies`, {
            params: {
                session_id: this.state.session_id
            }
        }).then(data => {
            data.results.map(movie => {
                return userFavMovies.push(movie.id);
            });
            this.setState({
                favoriteMovies: userFavMovies
            });
            console.log(this.state.favoriteMovies);
        });
    };

    getWatchListMovies = () => {
        let userWatchlistMovies = [];
        CallApi.get(`/account/${this.state.user.id}/watchlist/movies`, {
            params: {
                session_id: this.state.session_id
            }
        }).then(data => {
            data.results.map(movie => {
                return userWatchlistMovies.push(movie.id);
            });
            this.setState({
                watchlistMovies: userWatchlistMovies
            });
            console.log(this.state.watchlistMovies);
        });
    };

    render() {
        console.log("render APP");
        const {  user, session_id } = this.state;
        return (
            <BrowserRouter>
            <AppContext.Provider
                value={{
                    user: user,
                    updateUser: this.updateUser,
                    onLogout: this.onLogout,
                    session_id: session_id,
                    toggleModal: this.toggleModal,
                    showLoginModal: this.state.showLoginModal,
                    updateSessionId: this.updateSessionId,
                    watchlistMovies: this.state.watchlistMovies,
                    favoriteMovies: this.state.favoriteMovies,
                    updateAuth: this.updateAuth
                }}
            >
                <div>
                    <LoginModal />
                    <Header
                        user={user}
                        updateAuth={this.updateAuth}
                        updateSessionId={this.updateSessionId}
                        toggleModal={this.toggleModal}
                        showLoginModal={this.state.showLoginModal}
                    />
                    <Route exact path="/" component={MoviesPage}/>
                    <Route path="/movie/:id" component={MoviePage}/>
                </div>
            </AppContext.Provider>
            </BrowserRouter>
        );
    }
}

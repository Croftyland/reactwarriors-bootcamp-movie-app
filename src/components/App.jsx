import React from "react";
import Header from "./Header/Header";
import { observer, inject } from "mobx-react";
import MoviesPage from "./Pages/MoviesPage/MoviesPage";
import MoviePage from "./Pages/MoviePage/MoviePage";
import { BrowserRouter, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBookmark, faHeart } from "@fortawesome/free-solid-svg-icons";
import {
    faBookmark as bookmarkRegular,
    faHeart as heartRegular
} from "@fortawesome/free-regular-svg-icons";
import LoginModal from "./Header/LoginModal";
library.add(faBookmark, faHeart, bookmarkRegular, heartRegular);

export const AppContext = React.createContext();

@inject(({ userStore, loginFormStore }) => ({
    userStore,
    loginFormStore
}))
@observer
class App extends React.Component {
    componentDidMount() {
        this.props.userStore.getUser();
    }


    render() {
        const {
            userStore: {
                getFavoriteMovies,
                getWatchListMovies
            }
        } = this.props;
        return (
            <BrowserRouter>
                <AppContext.Provider
                    value={{
                        getFavoriteMovies: getFavoriteMovies,
                        getWatchListMovies: getWatchListMovies
                    }}
                >
                    <div>
                        <Header />
                        <Route exact path="/" component={MoviesPage} />
                        <Route path="/movie/:id" component={MoviePage} />
                    </div>
                  <LoginModal/>
                </AppContext.Provider>
            </BrowserRouter>
        );
    }
}
export default App;

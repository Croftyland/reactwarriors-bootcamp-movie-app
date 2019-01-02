import React, {Component} from 'react';
import CallApi from "../../../api/api";
import Favorite from "../../Movies/Favorite";
import WatchList from "../../Movies/WatchList";
import { Route, Switch } from "react-router-dom";
import Tabs from "./Tabs/Tabs"

import MovieCredits from "./Tabs/MovieCredits"
import MovieDetail from "./Tabs/MovieDetails"
import MovieVideos from "./Tabs/MovieVideos"


export default class MoviePage extends Component {

    constructor() {
        super();
        this.state = {
            movie: []
        }
    }

    componentDidMount() {
        CallApi.get(`/movie/${this.props.match.params.id}`).then(data => {
            this.setState({
                movie: data
            });
        });
    }

    render() {
        const {movie} = this.state;
        const bgHeader = {
            background: "#3f474d",
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${
                this.state.movie.backdrop_path
                })`,
            color: "#fff",
            backgroundPosition: "center",
            backgroundSize: "cover",
            boxShadow: "inset 0px 0px 20px 500px #292d30c4"
        };
        return (
            <div className="movie-page">
                <div className="movie_header--wraper" style={bgHeader}>
                    <div className="container ">
                        <div className="movie_header p-3 row align-items-start ">
                            <div className="movie_header__poster col-xs-12 col-md-4 ">
                                <img
                                    className="w-100"
                                    src={
                                        movie.poster_path
                                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                            : "https://lajoyalink.com/wp-content/uploads/2018/03/Movie.jpg"
                                    }
                                    alt={movie.title}
                                />
                            </div>
                            <div className="movie_header__overview col-xs-12 col-md-8">
                                <h2 className="movie_title ">{movie.original_title}</h2>
                                <div className="row movie_icons d-flex justify-content-around p-4">
                                </div>
                                <p>{movie.overview}</p>
                            </div>
                            <span className="icons">
                  <Favorite item={movie}/>
                </span>
                            <span className="icons">
                  <WatchList item={movie}/>
                </span>
                        </div>
                        <Tabs id={this.props.match.params.id} />

                        <Switch>
                            <Route
                                path='/movie/:id/movie-detail'
                                render={(props) => <MovieDetail {...props} item={movie} />}
                            />
                            <Route
                                path='/movie/:id/videos'
                                render={(props) => <MovieVideos {...props} />}
                            />
                            <Route
                                path='/movie/:id/movie-credits'
                                render={(props) => <MovieCredits {...props} item={movie} />}
                            />
                        </Switch>

                    </div>
                </div>
            </div>
        );
    }
}

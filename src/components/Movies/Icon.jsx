import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {API_URL, API_KEY_3, fetchApi} from "../../api/api";


export default class Icon extends React.Component {

    state = {
        favorite: false,
        watchlist: false
    };


    changeFavour = (name) => () => {
        console.log(name);
        const {session_id, user, item, toggleModal} = this.props;
        if (session_id) {
            this.setState(prevState => ({
                [name]: !prevState[name]
            }), () => {
                fetchApi(
                    `${API_URL}/account/{${
                        user.id
                        }}/${name}?api_key=${API_KEY_3}&session_id=${session_id}`,
                    {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            "Content-type": "application/json;charset=utf-8"
                        },
                        body: JSON.stringify({
                            media_type: "movie",
                            media_id: item.id,
                            [name]: this.state[name]
                        })
                    }
                ).then(data => {
                    console.log(data);
                });
            });

        } else {
            toggleModal();
        }
    };

    render() {
        return (
            <div>
                <a className="heart-icon mr-1" onClick={this.changeFavour("favorite")}>
                    {this.state.favorite
                        ? <FontAwesomeIcon icon={['fas', 'heart']}/>
                        : <FontAwesomeIcon icon={['far', 'heart']}/>

                    }
                </a>
                <a className="heart-icon mr-1" onClick={this.changeFavour("watchlist")}>
                    {this.state.watchlist
                        ? <FontAwesomeIcon icon={['fas', 'bookmark']}/>
                        : <FontAwesomeIcon icon={['far', 'bookmark']}/>

                    }
                </a>
            </div>
        )
    }
};
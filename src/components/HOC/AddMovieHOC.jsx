import React from "react";
import CallApi from "../../api/api";


const AddMovieHOC = (Component, type) =>

    class AddMovieHOC extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                isAdd: this.props[type].includes(this.props.item.id)
            };
        }

        changeFavorite = name => () => {
            const { session_id, user, item, toggleModal } = this.props;

            if (session_id) {
                this.setState(
                    prevState => ({
                        isAdd: !this.state.isAdd
                    }),
                    () => {
                        CallApi.post(`/account/{${user.id}}/${name}`, {
                            params: {
                                session_id: session_id
                            },
                            body: {
                                media_type: "movie",
                                media_id: item.id,
                                [name]: this.state.isAdd
                            }
                        }).then(data => {
                            console.log(data);
                        });
                    }
                );
            } else {
                toggleModal();
            }
        };

        componentDidUpdate(prevProps, prevState) {
            let isAdd = this.props[type].includes(this.props.item.id);
            if (prevProps[type] !== this.props[type]) {
                this.setState({
                    isAdd
                });
            }
        }

        render() {
            return (
                <Component
                    {...this.props}
                    changeFavorite={this.changeFavorite}
                    isAdd={this.state.isAdd}
                />
            );
        }
    };
export default AddMovieHOC;
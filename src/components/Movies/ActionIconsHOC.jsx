import React from "react";
import CallApi from "../../api/api";

const ActionIconsHOC = (Component, type) =>
    class ActionIconsHOC extends React.Component {
        displayName: "ActionIconsHOC";

        constructor() {
            super();

            this.state = {
                isAdd: false
            };
        }

        addMovieAction = () => {
            const { user, item, session_id, toggleLoginModal } = this.props;
            console.log(this.props);
            if (session_id) {
                this.setState(
                    {
                        isAdd: !this.state.isAdd
                    },
                    () => {
                        CallApi.post(`/account/${user.id}/${type}`, {
                            params: {
                                session_id: session_id
                            },
                            body: {
                                media_type: "movie",
                                media_id: item.id,
                                [type]: this.state.isAdd
                            }
                        }).then(data => {
                            console.log(data);
                        });
                    }
                );
            } else {
                toggleLoginModal();
            }
        };

        render() {
            return (
                <Component
                    {...this.props}
                    onClick={this.addMovieAction}
                    isAdd={this.state.isAdd}
                />
            );
        }
    };

export default ActionIconsHOC;
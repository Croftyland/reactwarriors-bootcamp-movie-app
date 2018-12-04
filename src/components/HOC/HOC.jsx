import React from "react";
import { AppContext } from "../App";

export default Component =>
    class HOC extends React.Component {
        render() {
            return (
                <AppContext.Consumer>
                    {context => <Component {...this.props} {...context} />}
                </AppContext.Consumer>
            );
        }
    };
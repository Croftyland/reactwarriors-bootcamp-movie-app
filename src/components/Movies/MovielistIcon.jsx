import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActionIconsHOC from "./ActionIconsHOC";

class WatchlistIcon extends React.Component {
    render() {
        const { onClick, isAdd } = this.props;
        return (
            <span
                onClick={onClick}
                className={`${isAdd ? "red" : null} icon-watchlist`}
            >
        <FontAwesomeIcon icon={[isAdd ? "fas" : "far", "bookmark"]} />
      </span>
        );
    }
}

export default ActionIconsHOC(WatchlistIcon, "watchlist");
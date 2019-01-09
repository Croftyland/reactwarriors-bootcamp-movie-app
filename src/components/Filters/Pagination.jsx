import React from "react";
import classNames from "classnames";

import { observer, inject } from "mobx-react";

@inject(({ moviesPageStore }) => ({
    moviesPageStore
}))
@observer
class Pagination extends React.Component {
    render() {
        const {
            moviesPageStore: { page, total_pages, prevPage, nextPage }
        } = this.props;
        return (
            <nav className="d-flex align-items-center">
                <ul className="pagination mb-0 mr-3">
                    <li
                        className={classNames("page-item", {
                            disabled: page === 1
                        })}
                    >
            <span className="page-link" onClick={prevPage(page)}>
               Назад
            </span>
                    </li>
                    <li
                        className={classNames("page-item", {
                            disabled: total_pages === 1 || total_pages === page
                        })}
                    >
            <span className="page-link" onClick={nextPage}>
              Вперед
            </span>
                    </li>
                </ul>
                <span>
          {page} of {total_pages}
        </span>
            </nav>
        );
    }
}

export default Pagination;

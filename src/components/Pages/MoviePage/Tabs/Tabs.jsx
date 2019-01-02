import React from 'react';
import {
    Nav, NavItem,
    NavLink as TabNavLink,

} from 'reactstrap';


import { NavLink } from "react-router-dom";



export default class Tabs extends React.Component {

    render() {

        const { id } = this.props
        return (

            <div className="mt-5">
                <Nav tabs>
                    <NavItem >
                        <TabNavLink tag="div">
                            <NavLink
                                to={`/movie/${id}/movie-detail`}
                                className="movie-tab"
                            >
                                Детали
                            </NavLink>

                        </TabNavLink>
                    </NavItem>
                    <NavItem >
                        <TabNavLink tag="div">
                            <NavLink
                                to={`/movie/${id}/videos`}
                                className="movie-tab"
                            >
                                Ведео
                            </NavLink>

                        </TabNavLink>
                    </NavItem>
                    <NavItem >
                        <TabNavLink tag="div">
                            <NavLink
                                to={`/movie/${id}/movie-credits`}
                                className="movie-tab"
                            >
                                Актеры
                            </NavLink>

                        </TabNavLink>
                    </NavItem>
                </Nav>

            </div>
        );
    }
}
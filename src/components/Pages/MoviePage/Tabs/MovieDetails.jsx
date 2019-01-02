import React from 'react';
import { Table } from 'reactstrap';



class MovieDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            movie: []
        }
    }
    render() {
        const { movie } = this.props

        return (<div>
            <Table striped>

                <tbody>
                <tr>
                    <td>Статус</td>
                    <td>{movie.status}</td>
                </tr>
                <tr>
                    <td>Дата выхода</td>
                    <td>{movie.release_date}</td>
                </tr>
                <tr>
                    <td>Продолжительность</td>
                    <td> {movie.runtime ? (`${movie.runtime} мин`) : "Нет информации"} </td>
                </tr>
                <tr>
                    <td>Язык оригинала</td>
                    <td>{movie.original_language}</td>
                </tr>
                <tr>
                    <td>Страна</td>
                    <td>{!!movie.production_countries &&
                    movie.production_countries.length > 0
                        ? movie.production_countries[0].name
                        : "Нет информации"} </td>

                </tr>
                <tr>
                    <td>Бюджет</td>
                    <td>{movie.budget} $</td>
                </tr>
                <tr>
                    <td>Сборы</td>
                    <td>{movie.revenue} $</td>
                </tr>
                <tr>
                    <td>Компания</td>
                    <td>{
                        !!movie.production_companies &&
                        movie.production_companies.length > 0
                            ? movie.production_companies.map((movie) => {
                                return (<React.Fragment key={`companies${movie.id}`}> <span className="badge badge-primary"> {movie.name} </span> <br /></React.Fragment>)
                            })
                            : "Нет информации"
                    }</td>
                </tr>
                <tr>
                    <td>Жанры</td>
                    <td>
                        {!!movie.genres &&
                        movie.genres.length > 0
                            ? movie.genres.map((movie) => {
                                return (<React.Fragment key={`genres${movie.id}`}><span className="badge badge-success"> {movie.name} </span> <br /></React.Fragment>)
                            })
                            : "Нет информации"

                        }
                    </td>
                </tr>
                </tbody>
            </Table>


        </div>);

    }
}

export default MovieDetail;
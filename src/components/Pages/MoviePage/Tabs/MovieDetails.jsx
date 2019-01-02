import React from 'react';
import { Table } from 'reactstrap';



class MovieDetail extends React.Component {
    state = {

    }
    render() {
        const { item } = this.props
        // console.log(item)

        // const {
        //     item,
        //     item: { production_countries = [], production_companies = [], genres = [] }
        // } = this.props;

        return (<div>
            <Table striped>

                <tbody>
                <tr>
                    <td>Статус</td>
                    <td>{item.status}</td>
                </tr>
                <tr>
                    <td>Дата выхода</td>
                    <td>{item.release_date}</td>
                </tr>
                <tr>
                    <td>Продолжительность</td>
                    <td> {item.runtime ? (`${item.runtime} мин`) : "Нет информации"} </td>
                </tr>
                <tr>
                    <td>Язык оригинала</td>
                    <td>{item.original_language}</td>
                </tr>
                <tr>
                    <td>Страна</td>
                    <td>{!!item.production_countries &&
                    item.production_countries.length > 0
                        ? item.production_countries[0].name
                        : "Нет информации"} </td>

                </tr>
                <tr>
                    <td>Бюджет</td>
                    <td>{item.budget} $</td>
                </tr>
                <tr>
                    <td>Сборы</td>
                    <td>{item.revenue} $</td>
                </tr>
                <tr>
                    <td>Компания</td>
                    <td>{
                        !!item.production_companies &&
                        item.production_companies.length > 0
                            ? item.production_companies.map((item) => {
                                return (<React.Fragment key={`companies${item.id}`}> <span className="badge badge-primary"> {item.name} </span> <br /></React.Fragment>)
                            })
                            : "Нет информации"
                    }</td>
                </tr>
                <tr>
                    <td>Жанры</td>
                    <td>
                        {!!item.genres &&
                        item.genres.length > 0
                            ? item.genres.map((item) => {
                                return (<React.Fragment key={`genres${item.id}`}><span className="badge badge-success"> {item.name} </span> <br /></React.Fragment>)
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
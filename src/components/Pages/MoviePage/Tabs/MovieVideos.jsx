import React from 'react';
import CallApi from '../../../../api/api';
//import Load from "../../../Loader/Load"

class MovieVideos extends React.Component {
    state = {
        videos: [],
        preloader: false
    }

    componentDidMount() {
        this.setState({
            preloader: true
        });

        CallApi.get(`/movie/${this.props.match.params.id}/videos`, {
            params: {
                language: "ru-RU"
            }
        })
            .then(data => {
                console.log(data.results)
                this.setState({
                    videos: data.results,
                    preloader: false
                });
            })

    }


    render() {

        const {videos, preloader} = this.state

        console.log("videos", this.state.videos)
        return (<div className="d-flex justify-content-center flex-wrap">

            { preloader ? (
                <div className="mt-5">

                </div>
            ) : (

                (videos.length) > 0  ? (
                    videos.map((item)=> {
                        console.log(item)
                        return (

                            <div className="card" key={item.key} style={{"width": "400px", "height": "415px", "margin":"20px"}}>

                                <iframe
                                    width="100%" height="100%"
                                    src={`https://www.youtube.com/embed/${item.key}`}
                                    frameBorder="0" allow="accelerometer;
                            autoplay; encrypted-media; gyroscope;
                            picture-in-picture"
                                    title={item.key}
                                    allowFullScreen>
                                </iframe>
                                <div className="card-body">

                                    <p className="card-text">{item.name}</p>

                                </div>
                            </div>

                        )
                    })
                ): (<div className="mt-5">Нет видео</div>) )
            }

        </div>);
    }
}

export default MovieVideos;
import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import { responsive, statusShowTime } from '~/constants';
import { listFilmBySchedule } from '~/services/FilmService';
import FilmTitle from '../FilmTitle/FilmTitle';

const UpcomingFilm = ({handleShowVideo}) => {
    const [film, setFilm] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const data = await listFilmBySchedule(statusShowTime[2]);
            setFilm(data);
        };
        fetch();
    }, []);

    return (
        <Row>
            <h1 className="title-type-film">PHIM SẮP CHIẾU</h1>
            <Carousel
                responsive={responsive}
                swipeable={true}
                draggable={true}
                showDots={true}
                infinite={false}
                partialVisible={false}
                dotListClass="custom-dot-list-style"
            >
                {film.map((item, index) => (
                    <div className="slider" key={index}>
                        <FilmTitle film={item} handleShowVideo={handleShowVideo} />
                    </div>
                ))}
            </Carousel>
            <div className="button look h5 mt-5">TÌM HIỂU THÊM</div>
        </Row>
    );
};

export default UpcomingFilm;

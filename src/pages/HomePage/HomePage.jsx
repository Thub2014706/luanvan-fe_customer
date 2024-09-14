import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import FilmTitle from '~/components/FilmTitle/FilmTitle';
import { responsive, statusShowTime } from '~/constants';
import { listFilmBySchedule } from '~/services/FilmService';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import VideoModal from '~/components/VideoModal/VideoModal';

const HomePage = () => {
    const [film1, setFilm1] = useState([]);
    const [film2, setFilm2] = useState([]);
    const [showVideo, setShowVideo] = useState(false);
    const [itemShow, setItemShow] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            const data1 = await listFilmBySchedule(statusShowTime[1]);
            setFilm1(data1);
            const data2 = await listFilmBySchedule(statusShowTime[2]);
            setFilm2(data2);
        };
        fetch();
    }, []);

    console.log('dđ', showVideo);
    const handleShowVideo = (item) => {
        setItemShow(item);
        setShowVideo(true);
    };

    const handleCloseVideo = () => {
        setItemShow(null);
        setShowVideo(false);
    };

    return (
        <div>
            <Container>
                <Row>
                    <h1 className="title-type-film">PHIM ĐANG CHIẾU</h1>
                    <Carousel
                        responsive={responsive}
                        swipeable={true}
                        draggable={true}
                        showDots={true}
                        infinite={false}
                        partialVisible={false}
                        dotListClass="custom-dot-list-style"
                    >
                        {film1.map((item, index) => (
                            <div className="slider" key={index}>
                                <FilmTitle film={item} handleShowVideo={handleShowVideo} />
                            </div>
                        ))}
                    </Carousel>
                    <div className="button look h5 mt-5">XEM THÊM</div>
                </Row>
                <Row style={{ marginTop: '100px' }}>
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
                        {film2.map((item, index) => (
                            <div className="slider" key={index}>
                                <FilmTitle film={item} handleShowVideo={handleShowVideo} />
                            </div>
                        ))}
                    </Carousel>
                </Row>
                {itemShow !== null && (
                    <VideoModal show={showVideo} handleClose={handleCloseVideo} trailer={itemShow.trailer} />
                )}
            </Container>
        </div>
    );
};

export default HomePage;

import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import FilmTitle from '~/components/FilmTitle/FilmTitle';
import { responsive, statusShowTime } from '~/constants';
import { listFilmBySchedule } from '~/services/FilmService';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import VideoModal from '~/components/VideoModal/VideoModal';
import FilmShowing from '~/components/FilmShowing/FilmShowing';
import UpcomingFilm from '~/components/UpcomingFilm/UpcomingFilm';

const HomePage = () => {
    const [showVideo, setShowVideo] = useState(false);
    const [itemShow, setItemShow] = useState(null);

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
                    <FilmShowing handleShowVideo={handleShowVideo} />
                </Row>
                <Row style={{ marginTop: '100px' }}>
                    <UpcomingFilm handleShowVideo={handleShowVideo} />
                </Row>
                {itemShow !== null && (
                    <VideoModal show={showVideo} handleClose={handleCloseVideo} trailer={itemShow.trailer} />
                )}
            </Container>
        </div>
    );
};

export default HomePage;

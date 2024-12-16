import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import BookBar from '~/components/BookBar/BookBar';
import FilmShowing from '~/components/FilmShowing/FilmShowing';
import UpcomingFilm from '~/components/UpcomingFilm/UpcomingFilm';
import VideoModal from '~/components/VideoModal/VideoModal';

const BookNowPage = () => {
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
        <Container>
            <ToastContainer style={{ zIndex: 1000000000000 }} />

            <BookBar />
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
    );
};

export default BookNowPage;

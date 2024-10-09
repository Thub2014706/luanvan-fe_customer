import React from 'react';
import { Container } from 'react-bootstrap';
import DetailFilm from '~/components/DetailFilm/DetailFilm';
import ReviewFilm from '~/components/ReviewFilm/ReviewFilm';

const DetailFilmPage = () => {
    return (
        <div className="pb-5">
            <Container className="text-white" style={{ paddingLeft: '70px', paddingRight: '70px' }}>
                <DetailFilm />
                <ReviewFilm />
            </Container>
        </div>
    );
};

export default DetailFilmPage;

import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Chair from '~/components/Chair/Chair';
import FilmTitle from '~/components/FilmTitle/FilmTitle';
import { statusShowTime } from '~/constants';
import { listFilmBySchedule } from '~/services/FilmService';

const HomePage = () => {
    const [filmIng, setFilmIng] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            const data = await listFilmBySchedule(statusShowTime[1]);
            setFilmIng(data);
        };
        fetch();
    }, []);

    return (
        <div>
            <Container>
                <Row>
                  <h1 className='title-type-film'>PHIM ĐANG CHIẾU</h1>
                  {filmIng.map((item) => (
                      <Col><FilmTitle film={item} /></Col>
                  ))}
                </Row>
            </Container>
        </div>
    );
};

export default HomePage;

import React, { useEffect, useState } from 'react';
import { Carousel, Container, Row } from 'react-bootstrap';
import FilmTitle from '~/components/FilmTitle/FilmTitle';
import { responsive, statusShowTime } from '~/constants';
import { listFilmBySchedule } from '~/services/FilmService';
import 'react-multi-carousel/lib/styles.css';
import VideoModal from '~/components/VideoModal/VideoModal';
import FilmShowing from '~/components/FilmShowing/FilmShowing';
import UpcomingFilm from '~/components/UpcomingFilm/UpcomingFilm';
import { listAdvertisement } from '~/services/AdvertisementService';
import ImageBase from '~/components/ImageBase/ImageBase';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [showVideo, setShowVideo] = useState(false);
    const [itemShow, setItemShow] = useState(null);
    const [images, setImages] = useState([]);
    const [index, setIndex] = useState(0);

    const handleShowVideo = (item) => {
        setItemShow(item);
        setShowVideo(true);
    };

    const handleCloseVideo = () => {
        setItemShow(null);
        setShowVideo(false);
    };

    useEffect(() => {
        const fetch = async () => {
            const data = await listAdvertisement();
            setImages(data);
        };
        fetch();
    }, []);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <div>
            <Container>
                <Row>
                    <Carousel activeIndex={index} onSelect={handleSelect}>
                        {images.map((item) => (
                            <Carousel.Item>
                                <Link to={item.link}>
                                    <ImageBase pathImg={item.image} style={{width: '100%'}} />
                                </Link>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Row>
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

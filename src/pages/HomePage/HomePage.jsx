import React, { useEffect, useState } from 'react';
import { Badge, Carousel, Container, Row } from 'react-bootstrap';
import 'react-multi-carousel/lib/styles.css';
import VideoModal from '~/components/VideoModal/VideoModal';
import FilmShowing from '~/components/FilmShowing/FilmShowing';
import UpcomingFilm from '~/components/UpcomingFilm/UpcomingFilm';
import { listAdvertisement } from '~/services/AdvertisementService';
import ImageBase from '~/components/ImageBase/ImageBase';
import { Link, useNavigate } from 'react-router-dom';
import ChatBot from '~/components/ChatBot/ChatBot';
import chat from '~/assets/images/chat.png';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

const HomePage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [showVideo, setShowVideo] = useState(false);
    const [itemShow, setItemShow] = useState(null);
    const [images, setImages] = useState([]);
    const [index, setIndex] = useState(0);
    const [showChat, setShowChat] = useState(false);
    const navigate = useNavigate();
    const socket = io(process.env.REACT_APP_API_URL);
    const [number, setNumber] = useState(0);

    useEffect(() => {
        if (socket && user) {
            socket.emit('number', user.data.id);
        }

        socket.on('number', (num) => {
            setNumber(num);
        });

        // socket.on('message', (msg) => {
        //     if (!msg.seen && !msg.senderType) {
        //         setNumber((prevCount) => prevCount + 1);
        //     }
        // });

        return () => {
            socket.off('number');
            // socket.off('message');
        };
    }, [user, socket]);
    console.log(number);

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

    const handleChat = () => {
        if (user) {
            setShowChat(!showChat);
        } else {
            setShowChat(false);
            navigate('/sign-in');
        }
    };

    return (
        <div>
            <Container>
                <Row>
                    <Carousel activeIndex={index} onSelect={handleSelect}>
                        {images.map((item) => (
                            <Carousel.Item>
                                <Link to={item.link}>
                                    <ImageBase pathImg={item.image} style={{ width: '100%' }} />
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
                <div style={{ position: 'fixed', left: 'auto', right: '30px', bottom: '30px', cursor: 'pointer' }}>
                    <img style={{position: 'relative'}} src={chat} height={50} alt="" onClick={handleChat} />
                    <Badge style={{top: 0, position: 'absolute', transform: 'translate(-50%, 0%)'}} pill bg="danger">
                        {number}
                    </Badge>
                </div>
                {showChat && (
                    <ChatBot
                        handleClose={() => {
                            setShowChat(false);
                            // socket.emit('leave', user.data.id);
                        }}
                    />
                )}
            </Container>
        </div>
    );
};

export default HomePage;

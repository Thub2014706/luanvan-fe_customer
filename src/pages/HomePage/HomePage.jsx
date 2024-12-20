import React, { useEffect, useRef, useState } from 'react';
import { Badge, Carousel, Container, Form, Row } from 'react-bootstrap';
import 'react-multi-carousel/lib/styles.css';
import VideoModal from '~/components/VideoModal/VideoModal';
import FilmShowing from '~/components/FilmShowing/FilmShowing';
import UpcomingFilm from '~/components/UpcomingFilm/UpcomingFilm';
import { listAdvertisement } from '~/services/AdvertisementService';
import ImageBase from '~/components/ImageBase/ImageBase';
import { Link, useNavigate } from 'react-router-dom';
import ChatBot from '~/components/ChatBot/ChatBot';
import chat from '~/assets/images/chat.png';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { setSocketConnect } from '~/features/socket/socketSlide';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import WindowModal from '~/components/WindowModal/WindowModal';
import { detailPopup } from '~/services/PopupService';
import { ToastContainer } from 'react-toastify';

const HomePage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [showVideo, setShowVideo] = useState(false);
    const [itemShow, setItemShow] = useState(null);
    const [images, setImages] = useState([]);
    const [index, setIndex] = useState(0);
    const [showChat, setShowChat] = useState(false);
    const navigate = useNavigate();
    const [number, setNumber] = useState(0);
    const dispatch = useDispatch();
    const [img, setImg] = useState();

    useEffect(() => {
        const fetch = async () => {
            const data = await detailPopup();
            if (data) {
                setImg(data.image);
            }
        };
        fetch();
    }, []);

    useEffect(() => {
        if (user) {
            const socket = io(process.env.REACT_APP_API_URL, {
                query: { userId: user.data.id },
            });
            console.log(socket);
            

            dispatch(setSocketConnect(socket));
            socket.emit('number', user.data.id);
            socket.on('numberFirst', (num) => {
                console.log(num);

                setNumber(num);
            });

            socket.on('removeNumber', (num) => {
                setNumber(num);
            });

            socket.on('addNumber', (num) => {
                console.log('tesst1');
                setNumber(num);
            });

            return () => {
                socket.off('numberFirst');
                socket.off('removeNumber');
                socket.off('addNumber');
                socket.disconnect();
            };
        }
    }, [user, dispatch]);
    // console.log('numbe ', number);

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

    // console.log(localStorage.getItem('modal'));

    return (
        <div>
                <ToastContainer style={{ zIndex: 1000000000000 }} />

            {img && <WindowModal img={img} />}
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
                    <img style={{ position: 'relative' }} src={chat} height={50} alt="" onClick={handleChat} />
                    {number > 0 && (
                        <Badge
                            style={{ top: 0, position: 'absolute', transform: 'translate(-50%, 0%)' }}
                            pill
                            bg="danger"
                        >
                            {number}
                        </Badge>
                    )}
                </div>
                {showChat && (
                    <ChatBot
                        handleClose={() => {
                            setShowChat(false);
                            // socket.emit('leave', user.data.id);
                        }}
                        show={showChat}
                    />
                )}
            </Container>
        </div>
    );
};

export default HomePage;

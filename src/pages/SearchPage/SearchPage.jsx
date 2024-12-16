import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import { Link, useLocation } from 'react-router-dom';
import FilmTitle from '~/components/FilmTitle/FilmTitle';
import ImageBase from '~/components/ImageBase/ImageBase';
import { responsive } from '~/constants';
import { searchFilm } from '~/services/FilmService';
import img1 from '~/assets/images/ic-branch-map.svg';
import img2 from '~/assets/images/ic-branch-room.svg';
import { lengthRoomByTheater, lengthSeatByTheater } from '~/services/TheaterService';
import { ToastContainer } from 'react-toastify';

const SearchPage = () => {
    const location = useLocation();
    const { search } = location.state || '';
    const [theaters, setTheaters] = useState([]);
    const [films, setFilms] = useState([]);
    // console.log('aaaa',search);

    useEffect(() => {
        const fetch = async () => {
            const data = await searchFilm(search);
            const data1 = await Promise.all(
                data.theaters.map(async (item) => {
                    const lengthRoom = await lengthRoomByTheater(item._id);
                    const lengthSeat = await lengthSeatByTheater(item._id);
                    return { ...item, lengthRoom, lengthSeat };
                }),
            );
            setTheaters(data1);
            setFilms(data.films);
        };
        fetch();
    }, [search]);

    return (
        <div>
                <ToastContainer style={{ zIndex: 1000000000000 }} />

            <Container className="pb-5">
                {films.length === 0 && theaters.length === 0 && (
                    <p className="text-center text-white mt-5">Không có kết quả tìm kiếm!</p>
                )}
                {films.length > 0 && (
                    <div>
                        <h1 className="font-title text-white text-center my-5">KẾT QUẢ TÌM KIẾM PHIM</h1>
                        <Carousel
                            responsive={responsive}
                            swipeable={true}
                            draggable={true}
                            showDots={true}
                            infinite={false}
                            partialVisible={false}
                            dotListClass="custom-dot-list-style"
                        >
                            {films.map((item) => (
                                <FilmTitle film={item} />
                            ))}
                        </Carousel>
                    </div>
                )}
                {theaters.length > 0 && (
                    <div>
                        <h1 className="font-title text-white text-center my-5">KẾT QUẢ TÌM KIẾM RẠP</h1>
                        <Row>
                            {theaters.map((item) => (
                                <Col xs={12} lg={6} xl={4} className="mb-4">
                                    <Link
                                        to={`/theater/${item._id}`}
                                        className="d-flex justify-content-center position-relative"
                                        style={{ maxWidth: '400px' }}
                                    >
                                        <ImageBase
                                            pathImg={item.image}
                                            style={{
                                                width: '100%',
                                                height: '300px',
                                                objectFit: 'cover',
                                            }}
                                        />
                                        <div className="info-title-theater">
                                            <h3 className="font-title">{item.name.toUpperCase()}</h3>
                                            <div className="d-flex">
                                                <div>
                                                    <img src={img2} alt="" />
                                                </div>
                                                <div className="ms-2">
                                                    <span>
                                                        {item.lengthRoom} phòng chiếu với {item.lengthSeat} ghế.
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <div>
                                                    <img src={img1} alt="" />
                                                </div>
                                                <div className="ms-2">
                                                    <span>
                                                        {item.address}, {item.ward}, {item.district}, {item.province}.
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default SearchPage;

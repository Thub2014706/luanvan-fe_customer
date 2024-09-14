import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { nameDay } from '~/constants';
import { listScheduleNotScreened } from '~/services/ScheduleService';
import { listTheater } from '~/services/TheaterService';
import Name from '../Name/Name';
import { detailFilm, listFilmByTheater } from '~/services/FilmService';
// import img1 from '~/assets/images/icon-calendar-1.svg';
// import img2 from '~/assets/images/icon-movie-1.svg';
// import img3 from '~/assets/images/icon-maps-1.svg';

const BookBar = () => {
    const [selectDay, setSelectDay] = useState(0);
    const [date, setDate] = useState(moment(Date()).format('YYYY-MM-DD'));
    const [showTimes, setShowTimes] = useState([]);
    const [films, setFilms] = useState([]);
    const [theaters, setTheaters] = useState([]);
    const [theater, setTheater] = useState('');

    const now = new Date();
    const array = [0, 1, 2, 3, 4, 5, 6];
    const week = [];

    array.forEach((item) => {
        const date = new Date(now);
        date.setDate(date.getDate() + item);
        week.push({ date: date.getDate(), day: date.getDay(), full: moment(date).format('YYYY-MM-DD') });
    });

    useEffect(() => {
        const fetch = async () => {
            const data = await listTheater();
            setTheaters(data);
        };
        fetch();
    }, []);

    useEffect(() => {
        const fetch = async () => {
            if (theater !== '') {
                const data = await listFilmByTheater(theater);
                setFilms(data);
            }
        };
        fetch();
    }, [theater]);

    console.log(theater);
    

    return (
        <div className="py-5">
            <Container>
                <Row className="card-item-schedule">
                    <Col xs="auto" className="d-flex">
                        <h3 className="align-items-center d-inline-flex text-white font-title">ĐẶT VÉ NHANH</h3>
                    </Col>
                    <Col>
                        <div className="">
                            <Form.Label className="d-flex justify-content-between">
                                <h5 style={{ color: '#f3ea28' }}>1. Rạp</h5>
                                {/* <img src={img3} height={26} width={26} className="icon-color" alt="" /> */}
                            </Form.Label>
                            <Form.Select value={theater} onChange={(e) => setTheater(e.target.value)}>
                                <option value="">Chọn rạp</option>
                                {theaters.map((item) => (
                                    <option key={item._id} value={item._id}>
                                        {item.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </div>
                    </Col>
                    <Col>
                        <div className="">
                            <Form.Label className="d-flex justify-content-between">
                                <h5 style={{ color: '#f3ea28' }}>2. Phim</h5>
                                {/* <img src={img2} height={26} width={26} className="icon-color" alt="" /> */}
                            </Form.Label>
                            <Form.Select>
                                <option value="">Chọn phim</option>
                                {films.map((item) => (
                                    <option key={item._id} value={item._id}>
                                        {item.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </div>
                    </Col>
                    <Col>
                        <div className="">
                            <Form.Label className="d-flex justify-content-between">
                                <h5 style={{ color: '#f3ea28' }}>3. Ngày</h5>
                                {/* <img src={img1} height={26} width={26} className="icon-color" alt="" /> */}
                            </Form.Label>
                            <Form.Select>
                                <option value="">Chọn ngày</option>

                                {week.map((item) => (
                                    <option key={item.full} value={item.full}>
                                        {now.getDay() === item.day ? 'Hôm nay' : nameDay[item.day]} -{' '}
                                        {moment(item.full).format('DD/MM/YYYY')}
                                    </option>
                                ))}
                            </Form.Select>
                        </div>
                    </Col>

                    <Col>
                        <div className="">
                            <Form.Label className="d-flex justify-content-between">
                                <h5 style={{ color: '#f3ea28' }}>4. Suất</h5>
                                {/* <img src={img2} height={26} width={26} className="icon-color" alt="" /> */}
                            </Form.Label>
                            <Form.Select>
                                <option value="">Chọn phim</option>
                                {films.map((item) => (
                                    <option key={item._id} value={item._id}>
                                        <Name id={item.film} detail={detailFilm} />
                                    </option>
                                ))}
                            </Form.Select>
                        </div>
                    </Col>
                    <Col xs="auto" className="align-items-center d-flex">
                        <div className="button book-now h-100 h5 text-center">ĐẶT NGAY</div>
                    </Col>
                </Row>
                <div
                    style={{
                        color: 'white',
                        height: '1px',
                        backgroundColor: 'white',
                        border: 'none',
                        marginTop: '50px',
                    }}
                />
            </Container>
        </div>
    );
};

export default BookBar;

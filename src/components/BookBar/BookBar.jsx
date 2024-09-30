import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { nameDay } from '~/constants';
import Name from '../Name/Name';
import { showTimeFilter } from '~/services/ShowTimeService';
import { detailRoom } from '~/services/RoomService';
import { Link } from 'react-router-dom';
// import img1 from '~/assets/images/icon-calendar-1.svg';
// import img2 from '~/assets/images/icon-movie-1.svg';
// import img3 from '~/assets/images/icon-maps-1.svg';

const BookBar = () => {
    const [showTimes, setShowTimes] = useState([]);
    const [showTime, setShowTime] = useState();
    const [films, setFilms] = useState([]);
    const [film, setFilm] = useState('');
    const [theaters, setTheaters] = useState([]);
    const [theater, setTheater] = useState('');
    const [dates, setDates] = useState([]);
    const [date, setDate] = useState('');

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
            const data = await showTimeFilter(theater, film, date);
            setTheaters(data.theaters);
            setFilms(data.films);
            setDates(data.dates);
            setShowTimes(data.showTimes);
        };
        fetch();
    }, [theater, film, date]);

    // console.log(date, showTimes);

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
                            <Form.Select value={film} onChange={(e) => setFilm(e.target.value)}>
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
                            <Form.Select value={date} onChange={(e) => setDate(e.target.value)}>
                                <option value="">Chọn ngày</option>
                                {dates.map((item) => {
                                    const dateObj = new Date(item.date);
                                    return (
                                        <option key={item.date} value={item.date}>
                                            {now.getDay() === dateObj.getDay() ? 'Hôm nay' : nameDay[dateObj.getDay()]}{' '}
                                            - {moment(item.date).format('DD/MM/YYYY')}
                                        </option>
                                    );
                                })}
                            </Form.Select>
                        </div>
                    </Col>

                    {/* <img src={img2} height={26} width={26} className="icon-color" alt="" /> */}
                    <Col>
                        <div className="">
                            <Form.Label className="d-flex justify-content-between">
                                <h5 style={{ color: '#f3ea28' }}>4. Suất</h5>
                            </Form.Label>
                            <Form.Select value={showTime} onChange={(e) => setShowTime(e.target.value)}>
                                <option value="">Chọn suất chiếu</option>
                                {showTimes.map((item) => (
                                    <option key={item._id} value={item._id}>
                                        {item.timeStart} - {item.translate} -{' '}
                                        <Name id={item.room} detail={detailRoom} />
                                    </option>
                                ))}
                            </Form.Select>
                        </div>
                    </Col>
                    <Col xs="auto" className="align-items-center d-flex">
                        <Link
                            to={showTime && `/book-seat`}
                            state={showTime && { id: showTime }}
                            className="button book-now h-100 h5 text-center text-decoration-none"
                        >
                            ĐẶT NGAY
                        </Link>
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

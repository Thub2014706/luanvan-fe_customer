import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import Name from '~/components/Name/Name';
import { nameDay } from '~/constants';
import { detailFilm } from '~/services/FilmService';
import { listScheduleNotScreened } from '~/services/ScheduleService';
import img1 from '~/assets/images/icon-calendar-1.svg';
import img2 from '~/assets/images/icon-movie-1.svg';
import img3 from '~/assets/images/icon-maps-1.svg';
import { listTheater } from '~/services/TheaterService';
import { ToastContainer } from 'react-toastify';

const SchedulePage = () => {
    const [selectDay, setSelectDay] = useState(0);
    const [date, setDate] = useState(moment(Date()).format('YYYY-MM-DD'));
    const [showTimes, setShowTimes] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [theater, setTheater] = useState([]);

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
            const data1 = await listScheduleNotScreened('');
            setSchedules(data1);
            const data2 = await listTheater();
            setTheater(data2);
        };
        fetch();
    }, []);

    // console.log(films);
    return (
        <div className="py-5">
                <ToastContainer style={{ zIndex: 1000000000000 }} />

            <Container>
                <Row>
                    <Col>
                        <div className="card-item-schedule">
                            <Form.Label className="d-flex justify-content-between">
                                <h5 style={{ color: '#f3ea28' }}>Ngày</h5>
                                <img
                                    src={img1}
                                    style={{ height: '20px', width: '20px' }}
                                    className="icon-color"
                                    alt=""
                                />
                            </Form.Label>
                            <Form.Select>
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
                        <div className="card-item-schedule">
                            <Form.Label className="d-flex justify-content-between">
                                <h5 style={{ color: '#f3ea28' }}>Phim</h5>
                                <img
                                    src={img2}
                                    style={{ height: '20px', width: '20px' }}
                                    className="icon-color"
                                    alt=""
                                />
                            </Form.Label>
                            <Form.Select>
                                <option value="">Chọn phim</option>
                                {schedules.map((item) => (
                                    <option key={item._id} value={item._id}>
                                        <Name id={item.film} detail={detailFilm} />
                                    </option>
                                ))}
                            </Form.Select>
                        </div>
                    </Col>
                    <Col>
                        <div className="card-item-schedule">
                            <Form.Label className="d-flex justify-content-between">
                                <h5 style={{ color: '#f3ea28' }}>Rạp</h5>
                                <img
                                    src={img3}
                                    style={{ height: '20px', width: '20px' }}
                                    className="icon-color"
                                    alt=""
                                />
                            </Form.Label>
                            <Form.Select>
                                <option value="">Chọn rạp</option>
                                {theater.map((item) => (
                                    <option key={item._id} value={item._id}>
                                        {item.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </div>
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

export default SchedulePage;

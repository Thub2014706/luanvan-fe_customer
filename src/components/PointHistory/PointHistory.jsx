import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { allPointHistory } from '~/services/PointHistorySevice';
import ImageBase from '../ImageBase/ImageBase';
import { pointHis, signAge, standardAge } from '~/constants';
import moment from 'moment';
import Pagination from '../Pagination/Pagination';

const PointHistory = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [points, setPoints] = useState([]);
    const [number, setNumber] = useState(1);
    const [length, setLength] = useState();

    useEffect(() => {
        const fetch = async () => {
            const data = await allPointHistory(user.data.id, 1);
            setPoints(data.data);
            setLength(data.length);
        };
        fetch();
    }, [user]);
    console.log('aaaaaaaa', points);

    const handleNumber = async (num) => {
        setNumber(num);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        const data = await allPointHistory(user?.data.id, num);
        setPoints(data.data);
        setLength(data.length);
    };

    return (
        <div>
            <h1 className="font-title mb-5">LỊCH SỬ ĐIỂM TÍCH LŨY</h1>
            {points.length > 0 ? (
                <>
                    {points.map((item) => (
                        <div className="my-5">
                            <div className="d-flex">
                                <h5>Mã vé: {item.order.idOrder} </h5>
                                {/* <span className="ms-2">(Trạng thái: {step === 1 ? 'Đã hoàn tất' : 'Đã hoàn vé'})</span> */}
                            </div>
                            {item.orderModel === 'OrderTicket' ? (
                                <Row className="mb-5">
                                    <Col xs="auto">
                                        <ImageBase
                                            pathImg={item.order.showTime.schedule.film.image}
                                            style={{
                                                height: '140px',
                                                width: '100px',
                                                objectFit: 'cover',
                                                borderRadius: '5px',
                                                border: '1px solid gray',
                                            }}
                                        />
                                    </Col>
                                    <Col>
                                        <h4 className="font-title">{item.order.showTime.schedule.film.name}</h4>
                                        <p>{item.name}</p>
                                        <p>{moment(item.createdAt).format('HH:mm DD/MM/YYYY')}</p>
                                    </Col>
                                    <Col>
                                        <h5 className="text-end">
                                            {item.name === pointHis[0] ? (
                                                `-${item.point.toLocaleString('it-IT')}`
                                            ) : (
                                                <span style={{ color: '#f3ea28' }}>
                                                    +{item.point.toLocaleString('it-IT')}
                                                </span>
                                            )}
                                        </h5>
                                    </Col>
                                </Row>
                            ) : (
                                <Row className="mb-5">
                                    <Col xs="auto">
                                        <ImageBase
                                            pathImg={item.order.combo[0].id.image}
                                            style={{
                                                height: '100px',
                                                width: '100px',
                                                objectFit: 'cover',
                                                borderRadius: '5px',
                                                border: '1px solid gray',
                                            }}
                                        />
                                    </Col>
                                    <Col>
                                        <h4 className="font-title">{item.order.combo[0].name}</h4>
                                        <p>{item.name}</p>
                                        <p>{moment(item.createdAt).format('HH:mm DD/MM/YYYY')}</p>
                                    </Col>
                                    <Col>
                                        <h5 className="text-end">
                                            {item.name === pointHis[0] ? (
                                                `-${item.point.toLocaleString('it-IT')}`
                                            ) : (
                                                <span style={{ color: '#f3ea28' }}>
                                                    +{item.point.toLocaleString('it-IT')}
                                                </span>
                                            )}
                                        </h5>
                                    </Col>
                                </Row>
                            )}
                            <hr />
                        </div>
                    ))}
                    <Pagination currentPage={number} length={length} selectNumber={handleNumber} />
                </>
            ) : (
                <h5 className="mt-5">Không có lịch sử nào.</h5>
            )}
        </div>
    );
};

export default PointHistory;

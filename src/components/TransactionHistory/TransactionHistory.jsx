import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { allOrderByUser } from '~/services/OrderTicketService';
import ImageBase from '../ImageBase/ImageBase';
import { signAge, standardAge } from '~/constants';
import moment from 'moment';

const TransactionHistory = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const data = await allOrderByUser(user?.data.id);
            setOrders(data);
        };
        fetch();
    }, [user]);
    console.log(orders);

    return (
        <div className="bg-info-user">
            <h1 className="font-title mb-4">LỊCH SỬ GIAO DỊCH</h1>
            {orders.map((item) => (
                <div className="mb-2">
                    <Row>
                        <Col xs="auto">
                            <ImageBase
                                pathImg={item.film.image}
                                style={{
                                    height: '270px',
                                    width: '200px',
                                    objectFit: 'cover',
                                    borderRadius: '5px',
                                    border: '1px solid gray',
                                }}
                            />
                        </Col>
                        <Col>
                            <h4 className="font-title">
                                {item.film.name} [{signAge[standardAge.findIndex((age) => age === item.film.age)]}]
                            </h4>
                            <p>{moment(item.showTime.data).format('DD/MM/YYYY')}</p>
                            <p>
                                Từ {item.showTime.timeStart} - Đến {item.showTime.timeEnd}
                            </p>
                            <p>Rạp: {item.theater}</p>
                            <p>Phòng: {item.room}</p>
                        </Col>
                    </Row>
                </div>
            ))}
        </div>
    );
};

export default TransactionHistory;

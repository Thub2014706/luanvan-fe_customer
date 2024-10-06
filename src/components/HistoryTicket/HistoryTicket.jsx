import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ImageBase from '../ImageBase/ImageBase';
import { allOrderByUser } from '~/services/OrderTicketService';
import { signAge, standardAge } from '~/constants';
import moment from 'moment';
import ModalDetailTicket from '../ModalDetailTicket/ModalDetailTicket';
import ModalTicketRefund from '../ModalTicketRefund/ModalTicketRefund';

const HistoryTicket = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [orders, setOrders] = useState([]);
    const [showDetail, setShowDetail] = useState(false);
    const [detail, setSetail] = useState();
    const [showRefund, setShowRefund] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const data = await allOrderByUser(user?.data.id);
            setOrders(data);
        };
        fetch();
    }, [user]);
    console.log(orders);

    const handleShowDetail = (item) => {
        setShowDetail(true);
        setSetail(item);
    };

    const handleCloseDetail = () => {
        setShowDetail(false);
        setSetail();
    };

    const handleShowRefund = () => {
        setShowRefund(true);
        handleCloseDetail();
    };

    const handleCloseRefund = () => {
        setShowRefund(false);
    };

    return (
        <div>
            {orders.map((item) => (
                <div className="mb-5">
                    <h5>Mã vé: {item.item.idOrder}</h5>
                    <Row className="mb-5">
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
                            <p>
                                {moment(item.showTime.data).format('DD/MM/YYYY')}
                                <span className="ms-3">
                                    {item.showTime.timeStart} - {item.showTime.timeEnd}
                                </span>
                            </p>
                            <p>Rạp: {item.theater}</p>
                            <p>
                                Phòng: {item.room.name} ({item.room.type})
                            </p>
                            <p>
                                Ghế:{' '}
                                {item.seats.map((mini, index) => (
                                    <span>
                                        {String.fromCharCode(64 + mini.row)}
                                        {mini.col}
                                        {index < item.seats.length - 1 && ', '}
                                    </span>
                                ))}
                            </p>
                            <p>
                                Tổng thanh toán:{' '}
                                <span style={{ color: '#f3ea28' }}>{item.item.price.toLocaleString('it-IT')} VNĐ</span>
                            </p>
                            <div className="button b1" onClick={() => handleShowDetail(item)}>
                                Chi tiết
                            </div>
                            <div className="button b2 ms-2">Vé</div>
                        </Col>
                    </Row>
                    <hr />
                </div>
            ))}
            {detail && (
                <ModalDetailTicket
                    show={showDetail}
                    handleClose={handleCloseDetail}
                    item={detail}
                    handleShowRefund={handleShowRefund}
                />
            )}
            <ModalTicketRefund show={showRefund} handleClose={handleCloseRefund} />
        </div>
    );
};

export default HistoryTicket;

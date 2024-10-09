import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ImageBase from '../ImageBase/ImageBase';
import { allOrderByUser } from '~/services/OrderTicketService';
import { signAge, standardAge } from '~/constants';
import moment from 'moment';
import ModalDetailTicket from '../ModalDetailTicket/ModalDetailTicket';
import ModalTicketRefund from '../ModalTicketRefund/ModalTicketRefund';
import { allTicketRefund } from '~/services/TicketRefundService';

const HistoryTicket = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [orders, setOrders] = useState([]);
    const [showDetail, setShowDetail] = useState(false);
    const [detail, setSetail] = useState();
    const [showRefund, setShowRefund] = useState(false);
    const [idRefund, setIdRefund] = useState(false);
    const [step, setStep] = useState(1);

    useEffect(() => {
        const fetch = async () => {
            if (step === 1) {
                const data = await allOrderByUser(user?.data.id);
                setOrders(data);
            } else {
                const data = await allTicketRefund(user?.data.id);
                setOrders(data);
            }
        };
        fetch();
    }, [user, step]);
    console.log(orders);

    const handleShowDetail = (item) => {
        setShowDetail(true);
        setSetail(item);
    };

    const handleCloseDetail = () => {
        setShowDetail(false);
        setSetail();
    };

    const handleShowRefund = (idRefund) => {
        setIdRefund(idRefund);
        setShowRefund(true);
        handleCloseDetail();
    };

    const handleCloseRefund = () => {
        setIdRefund();
        setShowRefund(false);
    };

    return (
        <div>
            <div className="d-flex bg-ticket mt-2">
                <h5 onClick={() => setStep(1)} style={{ color: step === 1 ? '#f3ea28' : 'white', cursor: 'pointer' }}>
                    Vé đã hoàn tất
                </h5>
                <h5
                    className="ms-3"
                    onClick={() => setStep(2)}
                    style={{ color: step === 2 ? '#f3ea28' : 'white', cursor: 'pointer' }}
                >
                    Vé đã hoàn
                </h5>
            </div>
            {orders.length > 0 ? (
                orders.map((item) => (
                    <div className="my-5">
                        <div className="d-flex">
                            <h5>Mã vé: {item.item.idOrder} </h5>
                            <span className="ms-2">(Trạng thái: {step === 1 ? 'Đã hoàn tất' : 'Đã hoàn vé'})</span>
                        </div>
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
                                    {moment(item.showTime.date).format('DD/MM/YYYY')}
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
                                    <span style={{ color: '#f3ea28' }}>
                                        {item.item.price.toLocaleString('it-IT')} VNĐ
                                    </span>
                                </p>
                                <div className="button b1" onClick={() => handleShowDetail(item)}>
                                    Chi tiết
                                </div>
                                {/* {step === 1 && (
                                    <div className="button ticket ms-2" onClick={() => handleShowDetail(item)}>
                                        Đánh giá
                                    </div>
                                )} */}
                                {step === 1 && <div className="button b2 ms-2">Vé</div>}
                            </Col>
                        </Row>
                        <hr />
                    </div>
                ))
            ) : (
                <h5 className="mt-5">Không có vé nào.</h5>
            )}
            {detail && (
                <ModalDetailTicket
                    show={showDetail}
                    handleClose={handleCloseDetail}
                    item={detail}
                    handleShowRefund={handleShowRefund}
                    status={step}
                />
            )}
            <ModalTicketRefund show={showRefund} handleClose={handleCloseRefund} idRefund={idRefund} />
        </div>
    );
};

export default HistoryTicket;

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
import Pagination from '../Pagination/Pagination';
import TicketModal from '../TicketModal/TicketModal';

const HistoryTicket = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [orders, setOrders] = useState([]);
    const [showDetail, setShowDetail] = useState(false);
    const [detail, setSetail] = useState();
    const [showRefund, setShowRefund] = useState(false);
    const [idRefund, setIdRefund] = useState(false);
    const [step, setStep] = useState(1);
    const [number, setNumber] = useState(1);
    const [length, setLength] = useState();
    const [showTicket, setShowTicket] = useState(false);
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            if (step === 1) {
                setNumber(1);
                const data = await allOrderByUser(user?.data.id, 1);
                setOrders(data.data);
                setLength(data.length);
            } else {
                setNumber(1);
                const data = await allTicketRefund(user?.data.id, 1);
                setOrders(data.data);
                setLength(data.length);
            }
        };
        fetch();
    }, [user, step, showRefund]);
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

    const handleNumber = async (num) => {
        setNumber(num);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        const data = step === 1 ? await allOrderByUser(user?.data.id, num) : await allTicketRefund(user?.data.id, num);
        setOrders(data.data);
        setLength(data.length);
    };

    const handleShowTicket = (item) => {
        setOrder(item);
        setShowTicket(true);
    };

    const handleCloseTicket = () => {
        setOrder(null);
        setShowTicket(false);
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
                <>
                    {orders.map((item) => (
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
                                        {item.film.name} [
                                        {signAge[standardAge.findIndex((age) => age === item.film.age)]}]
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
                                    {step === 1 && (
                                        <div className="button b2 ms-2" onClick={() => handleShowTicket(item)}>
                                            Vé
                                        </div>
                                    )}
                                </Col>
                            </Row>
                            <hr />
                        </div>
                    ))}
                    <Pagination currentPage={number} length={length} selectNumber={handleNumber} />
                </>
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
            {order !== null && <TicketModal show={showTicket} handleClose={handleCloseTicket} order={order} />}

            <ModalTicketRefund show={showRefund} handleClose={handleCloseRefund} idRefund={idRefund} />
        </div>
    );
};

export default HistoryTicket;

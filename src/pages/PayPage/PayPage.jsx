import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DiscountModal from '~/components/DiscountModal/DiscountModal';
import { showToast } from '~/constants';
import { clearAll } from '~/features/cart/cartSlice';
import { detailDiscount } from '~/services/DiscountService';
import { momoPaymentTicket } from '~/services/MomoService';
import { addOrderTicket } from '~/services/OrderTicketService';
import { holdPay } from '~/services/RedisService';
import { detailUserById } from '~/services/UserService';

const PayPage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const cartTicket = useSelector((state) => state.cart.cartTicket);
    const [detailUser, setDetailUser] = useState(null);
    const [showDis, setShowDis] = useState(false);
    const [selectDis, setSelectDis] = useState();
    const [detailDis, setDetailDis] = useState();
    const [point, setPoint] = useState(0);
    const [usePoint, setUsePoint] = useState(0);
    const timeoutRef = useRef(null);
    const [time, setTime] = useState(180);
    const [timePay, setTimePay] = useState(180);
    const navigate = useNavigate();
    const [price, setPrice] = useState(cartTicket.price);
    const dispath = useDispatch();
    // console.log('e',cartTicket);
    // window.history.replaceState(null, '', '/');

    useEffect(() => {
        const fetch = async () => {
            const data = await holdPay({
                showTime: cartTicket.showTime,
                seatId: cartTicket.seats,
                userId: user?.data.id,
            });
            console.log(data);
            setTimePay(data);
        };
        fetch();
    }, [cartTicket, user]);

    // console.log(location.pathname);

    useEffect(() => {
        const fetch = async () => {
            const data = await detailUserById(user?.data.id);
            setDetailUser(data);
        };
        fetch();
    }, [user]);

    useEffect(() => {
        const fetch = async () => {
            setPrice(
                cartTicket.price -
                    usePoint -
                    (detailDis ? (cartTicket.price - usePoint) * (detailDis.percent / 100) : 0),
            );
        };
        fetch();
    }, [cartTicket.price, detailDis, usePoint]);

    useEffect(() => {
        const fetch = async () => {
            if (selectDis) {
                const data = await detailDiscount(selectDis);
                setDetailDis(data);
            } else {
                setDetailDis();
            }
        };
        fetch();
    }, [selectDis]);

    const handleShowDiscount = () => {
        setShowDis(true);
    };

    const handleCloseDiscount = () => {
        setShowDis(false);
    };

    const handlePoint = (e) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        const value = Number(e.target.value);

        setPoint(value);
        timeoutRef.current = setTimeout(() => {
            if (value < 20000 && value > 0) {
                showToast('Điểm thanh toán phải tối thiểu 20.000đ', 'warning');
            } else if (value > detailUser.point) {
                showToast('Điểm thanh toán đã vượt quá số điểm của bạn', 'warning');
            } else if (value > cartTicket.price) {
                showToast('Điểm thanh toán đã vượt quá số tiền thanh toán', 'warning');
            } else setUsePoint(value);
        }, 700);
    };

    useEffect(() => {
        let interval;
        let startTime;
        const startCountdown = () => {
            startTime = Date.now();
            interval = setInterval(() => {
                const timePassed = Math.floor((Date.now() - startTime) / 1000);
                setTime((time) => {
                    if (time <= 0) {
                        clearInterval(interval);
                        dispath(clearAll());
                        navigate('/checkout', { state: { timeOut: true }, replace: true });
                        return 0;
                    } else return timePay - timePassed;
                });
            }, 1000);
        };
        startCountdown();

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [timePay, navigate, dispath]);

    const handlePay = async () => {
        const data = await momoPaymentTicket({
            amount: price,
        });
        let discount
        if (selectDis) {
            discount = { id: selectDis, useDiscount: (cartTicket.price - usePoint) * (detailDis.percent / 100) }
        }

        await addOrderTicket(
            {
                idOrder: data.orderId,
                showTime: cartTicket.showTime,
                seat: cartTicket.seats,
                price,
                discount,
                paymentMethod: 'momo',
                member: user?.data.id,
                combo: cartTicket.combos,
                usePoint: point,
            },
            user?.accessToken,
        );
        window.location.href = data.payUrl;
    };
    // console.log(selectDis);

    return (
        <div>
            <Container className="py-5 text-white">
                <h2 className="text-white font-title text-center mb-5">THANH TOÁN</h2>
                <Row>
                    <Col xs={8}>
                        <div className="p-5 card-info-pay">
                            <div>
                                <h5 className="font-title">MÃ KHUYẾN MÃI</h5>
                                {detailDis && <p>Mã code: {detailDis.code}</p>}
                                <div className="button b1" onClick={handleShowDiscount}>
                                    Chọn mã khuyến mãi
                                </div>
                            </div>
                            <div className="mt-4">
                                <h5 className="font-title">ĐIỂM THANH TOÁN</h5>
                                {detailUser !== null && <p>Bạn có {detailUser.point} điểm tích lũy</p>}
                                <Form.Control
                                    type="number"
                                    value={point > 0 ? point : ''}
                                    disabled={detailUser?.point < 20000 || cartTicket.price < 20000 ? true : false}
                                    onChange={handlePoint}
                                    placeholder="Sử dụng điểm thanh toán (tối thiểu 20.000đ)"
                                />
                            </div>
                        </div>
                    </Col>
                    <Col xs={4}>
                        <div className="p-5 card-pay">
                            <div className="d-flex justify-content-between">
                                <span>Tổng cộng</span>
                                <span>{cartTicket.price.toLocaleString('it-IT')} VNĐ</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Mã khuyến mãi</span>
                                <span>
                                    {detailDis
                                        ? `- ${(
                                              (cartTicket.price - usePoint) *
                                              (detailDis.percent / 100)
                                          ).toLocaleString('it-IT')}`
                                        : 0}{' '}
                                    VNĐ
                                </span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Điểm tích lũy</span>
                                <span>{usePoint > 0 ? `- ${usePoint.toLocaleString('it-IT')}` : 0} VNĐ</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <h5>Tổng thanh toán</h5>
                                <h5>{price.toLocaleString('it-IT')} VNĐ</h5>
                            </div>
                            <div
                                className="mt-4"
                                style={{
                                    border: '1px solid white',
                                    borderRadius: '2px',
                                    padding: '5px',
                                    maxWidth: '200px',
                                }}
                            >
                                <p className="text-center">Thời gian thanh toán</p>
                                <div className="h5 text-center">
                                    {time && `${Math.floor(time / 60)}`.padStart(2, 0)} :{' '}
                                    {`${time % 60}`.padStart(2, 0)}
                                </div>
                            </div>
                            <div
                                className="text-center h5 mt-5"
                                style={{
                                    borderRadius: '5px',
                                    padding: '10px',
                                    backgroundColor: 'white',
                                    color: '#663399',
                                    cursor: 'pointer',
                                }}
                                onClick={handlePay}
                            >
                                Thanh toán với Momo
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <DiscountModal
                show={showDis}
                handleClose={handleCloseDiscount}
                selectDis={selectDis}
                setSelectDis={(value) => setSelectDis(value)}
            />
        </div>
    );
};

export default PayPage;

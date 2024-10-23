import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DiscountModal from '~/components/DiscountModal/DiscountModal';
import { showToast, signAge, standardAge } from '~/constants';
import { clearAll } from '~/features/cart/cartSlice';
import { detailDiscount } from '~/services/DiscountService';
import { detailFilmBySchedule } from '~/services/FilmService';
import { momoPaymentTicket } from '~/services/MomoService';
import { addOrderTicket } from '~/services/OrderTicketService';
import { holdPay } from '~/services/RedisService';
import { detailRoom } from '~/services/RoomService';
import { detailSeat } from '~/services/SeatService';
import { detailShowTimeById } from '~/services/ShowTimeService';
import { detailTheater } from '~/services/TheaterService';
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
    const [detail, setDetail] = useState();
    const [seats, setSeats] = useState();
    // console.log('e',cartTicket);
    // window.history.replaceState(null, '', '/');

    useEffect(() => {
        const fetch = async () => {
            if (cartTicket.showTime !== null) {
                const showTime = await detailShowTimeById(cartTicket.showTime);
                console.log(showTime);

                const film = await detailFilmBySchedule(showTime.schedule);
                const theater = await detailTheater(showTime.theater);
                const room = await detailRoom(showTime.room);
                setDetail({ showTime, film, theater, room });
                setSeats(
                    await Promise.all(
                        cartTicket.seats.map(async (item) => {
                            const seat = await detailSeat(item);
                            return seat;
                        }),
                    ),
                );
            }
        };
        fetch();
    }, [cartTicket]);

    useEffect(() => {
        const fetch = async () => {
            const data = await holdPay({
                showTime: cartTicket.showTime,
                seatId: cartTicket.seats,
                userId: user?.data.id,
            });
            // console.log(data);
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
            setPrice(cartTicket.price - usePoint - (detailDis ? cartTicket.price * (detailDis.percent / 100) : 0));
        };
        fetch();
    }, [cartTicket.price, detailDis, usePoint]);

    useEffect(() => {
        const fetch = async () => {
            if (selectDis) {
                setPoint(0);
                setPoint(0);
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
            } else if (value > cartTicket.price * (detailDis ? 1 - detailDis?.percent / 100 : 1) * 0.9) {
                showToast('Điểm thanh toán đã vượt quá 90% số tiền thanh toán', 'warning');
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

    const handleMax = () => {
        setPoint((cartTicket.price - (detailDis ? cartTicket.price * (detailDis.percent / 100) : 0)) * 0.9);
        setUsePoint((cartTicket.price - (detailDis ? cartTicket.price * (detailDis.percent / 100) : 0)) * 0.9);
    };

    const handlePay = async () => {
        if (point < 20000 && point > 0) {
            showToast('Điểm thanh toán phải tối thiểu 20.000đ', 'warning');
        } else if (point > detailUser.point) {
            showToast('Điểm thanh toán đã vượt quá số điểm của bạn', 'warning');
        } else if (point > cartTicket.price * (detailDis ? 1 - detailDis?.percent / 100 : 1) * 0.9) {
            showToast('Điểm thanh toán đã vượt quá 90% số tiền thanh toán', 'warning');
        } else {
            const data = await momoPaymentTicket({
                amount: price,
            });
            let discount;
            if (selectDis) {
                discount = { id: selectDis, useDiscount: (cartTicket.price - usePoint) * (detailDis.percent / 100) };
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
        }
    };
    // console.log(selectDis);

    return (
        <div>
            <Container className="py-5 text-white">
                <h2 className="text-white font-title text-center mb-5">THANH TOÁN</h2>
                <Row>
                    <Col xs={8}>
                        <div className="p-5 card-info-pay">
                            {detail && seats && (
                                <div>
                                    <h5 className="font-title">
                                        {detail.film.name} [
                                        {
                                            signAge[
                                                Object.values(standardAge).findIndex((age) => age === detail.film.age)
                                            ]
                                        }
                                        ]
                                    </h5>
                                    <p>Rạp: {detail.theater.name}</p>
                                    <p>
                                        Phòng: {detail.room.name} ({detail.room.type})
                                    </p>
                                    <p>
                                        Ghế:{' '}
                                        {seats.map((item, index) => (
                                            <span key={index} className="text-white">
                                                {String.fromCharCode(64 + item.row)}
                                                {item.col}
                                                {index < seats.length - 1 && ', '}
                                            </span>
                                        ))}
                                    </p>
                                    <p>
                                        Suất chiếu: {detail.showTime.timeStart} - {detail.showTime.timeEnd}{' '}
                                        {moment(detail.showTime.date).format('DD/MM/YYYY')}
                                    </p>
                                </div>
                            )}
                            <hr />
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
                                {detailUser?.point >= 20000 &&
                                    cartTicket.price * (detailDis ? 1 - detailDis?.percent / 100 : 1) * 0.9 >=
                                        20000 && (
                                        <div className="button b1 mb-4" onClick={handleMax}>
                                            Sử dụng tối đa điểm
                                        </div>
                                    )}
                                <Form.Control
                                    type="number"
                                    value={point > 0 ? point : ''}
                                    disabled={
                                        detailUser?.point < 20000 ||
                                        cartTicket.price * (detailDis ? 1 - detailDis?.percent / 100 : 1) * 0.9 < 20000
                                            ? true
                                            : false
                                    }
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
                                        ? `- ${(cartTicket.price * (detailDis.percent / 100)).toLocaleString('it-IT')}`
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

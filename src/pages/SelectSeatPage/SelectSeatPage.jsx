import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Name from '~/components/Name/Name';
import SelectCombo from '~/components/SelectCombo/SelectCombo';
import SelectSeat from '~/components/SelectSeat/SelectSeat';
import { showToast, signAge, standardAge, typeUserPrice } from '~/constants';
import { cartTicketValue } from '~/features/cart/cartSlice';
import { detailFilmBySchedule } from '~/services/FilmService';
import { allOrderTicketSelled } from '~/services/OrderTicketService';
import { detailPriceByUser } from '~/services/PriceService';
import { cancelHold, holdSeat } from '~/services/RedisService';
import { detailRoom } from '~/services/RoomService';
import { allSeatRoom } from '~/services/SeatService';
import { detailShowTimeById } from '~/services/ShowTimeService';
import { detailTheater } from '~/services/TheaterService';

const SelectSeatPage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const location = useLocation();
    const [showTime, setShowTime] = useState();
    const [room, setRoom] = useState();
    const [selled, setSelled] = useState([]);
    const [film, setFilm] = useState();
    const [seats, setSeats] = useState([]);
    const { id } = location.state || {};
    const [time, setTime] = useState(180);
    const [priceSeat, setPriceSeat] = useState(0);
    const [priceCombo, setPriceCombo] = useState(0);
    const [selectSeat, setSelectSeat] = useState([]);
    const [selectCombo, setSelectCombo] = useState([]);
    const dispatch = useDispatch();

    const renderStep = (step) => {
        switch (step) {
            case 1:
                return (
                    <SelectSeat selectSeat={selectSeat} setSelectSeat={setSelectSeat} selled={selled} seats={seats} />
                );
            case 2:
                return <SelectCombo setSelect={setSelectCombo} />;
            default:
                return null;
        }
    };

    useEffect(() => {
        const fetch = async () => {
            if (selectSeat.length > 0) {
                let data = await Promise.all(
                    selectSeat.map(
                        async (item) =>
                            await detailPriceByUser(
                                typeUserPrice[3],
                                showTime.date,
                                showTime.timeStart,
                                room._id,
                                item._id,
                            ),
                    ),
                );
                const sum = data.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                setPriceSeat(sum);
            } else {
                setPriceSeat(0);
            }
        };
        fetch();
    }, [selectSeat, room, showTime]);

    useEffect(() => {
        const fetch = async () => {
            const data = await allOrderTicketSelled(id);
            setSelled(data);
        };
        fetch();
    }, [id]);

    useEffect(() => {
        const fetch = async () => {
            if (selectCombo.length > 0) {
                const sum = selectCombo.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
                setPriceCombo(sum);
            } else {
                setPriceCombo(0);
            }
        };
        fetch();
    }, [selectCombo]);

    useEffect(() => {
        const handleBeforeUnload = async () => {
            await cancelHold({ seatId: selectSeat.map((item) => item._id), showTime: id });
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [selectSeat, id]);

    console.log(selectSeat);
    useEffect(() => {
        const fetch = async () => {
            const showTime = await detailShowTimeById(id);
            const roomData = await detailRoom(showTime.room);
            const filmData = await detailFilmBySchedule(showTime.schedule);
            const data = await allSeatRoom(showTime.room);
            setShowTime(showTime);
            setSeats(data);
            setRoom(roomData);
            setFilm(filmData);
        };
        fetch();
    }, [id]);

    useEffect(() => {
        let interval;
        const startCountdown = () => {
            interval = setInterval(() => {
                setTime((time) => {
                    if (time === 0) {
                        clearInterval(interval);
                        setSelectSeat([]);
                        setSelectCombo([]);
                        setPriceCombo(0);
                        setPriceSeat(0);
                        setStep(1);
                        return 0;
                    } else return time - 1;
                });
            }, 1000);
        };
        // if (status) {
        //     startCountdown();
        // } else {
        //     // clearInterval(interval);
        //     setTime(180);
        // }
        if (step === 2) {
            startCountdown();
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [step]);

    const handleNext = async () => {
        if (selectSeat.length === 0) {
            showToast('Vui lòng chọn ghế!', 'warning');
        } else {
            let hasGap = false;

            selectSeat.forEach((item) => {
                const arrayRow = seats.filter((mini) => mini.row === item.row);
                const seatIndex = arrayRow.indexOf(item);

                // Kiểm tra ghế trống bên trái
                if (
                    arrayRow[seatIndex - 2] &&
                    arrayRow[seatIndex - 2].isDelete === false &&
                    arrayRow[seatIndex - 1] &&
                    arrayRow[seatIndex - 1].isDelete === false &&
                    (selled.includes(arrayRow[seatIndex - 2]._id) ||
                        selectSeat.includes(arrayRow[seatIndex - 2]) ||
                        arrayRow[seatIndex - 2].status === false) &&
                    !selectSeat.includes(arrayRow[seatIndex - 1]) &&
                    !selled.includes(arrayRow[seatIndex - 1]._id) &&
                    arrayRow[seatIndex - 1].status === true
                ) {
                    hasGap = true;
                }

                // Kiểm tra ghế trống bên phải
                if (
                    arrayRow[seatIndex + 2] &&
                    arrayRow[seatIndex + 2].isDelete === false &&
                    arrayRow[seatIndex + 1] &&
                    arrayRow[seatIndex + 1].isDelete === false &&
                    (selled.includes(arrayRow[seatIndex + 2]._id) ||
                        selectSeat.includes(arrayRow[seatIndex + 2]) ||
                        arrayRow[seatIndex + 2].status === false) &&
                    !selectSeat.includes(arrayRow[seatIndex + 1]) &&
                    !selled.includes(arrayRow[seatIndex + 1]._id) &&
                    arrayRow[seatIndex + 1].status === true
                ) {
                    hasGap = true;
                }

                // Kiểm tra ghế trống bên trái
                if (
                    (!arrayRow[seatIndex - 2] ||
                        (arrayRow[seatIndex - 2] && arrayRow[seatIndex - 2].isDelete === true)) &&
                    arrayRow[seatIndex - 1] &&
                    arrayRow[seatIndex - 1].isDelete === false &&
                    !selectSeat.includes(arrayRow[seatIndex - 1]) &&
                    !selled.includes(arrayRow[seatIndex - 1]._id) &&
                    arrayRow[seatIndex - 1].status === true
                ) {
                    hasGap = true;
                }

                // Kiểm tra ghế trống bên phải
                if (
                    (!arrayRow[seatIndex + 2] ||
                        (arrayRow[seatIndex + 2] && arrayRow[seatIndex + 2].isDelete === true)) &&
                    arrayRow[seatIndex + 1] &&
                    arrayRow[seatIndex + 1].left === 0 &&
                    arrayRow[seatIndex + 1].isDelete === false &&
                    !selectSeat.includes(arrayRow[seatIndex + 1]) &&
                    !selled.includes(arrayRow[seatIndex + 1]._id) &&
                    arrayRow[seatIndex + 1].status === true
                ) {
                    hasGap = true;
                }

                if (
                    arrayRow[seatIndex - 2] &&
                    arrayRow[seatIndex - 1] &&
                    arrayRow[seatIndex - 1].left > 0 &&
                    arrayRow[seatIndex - 1].status === true &&
                    arrayRow[seatIndex - 2].isDelete === false &&
                    arrayRow[seatIndex - 1].isDelete === false &&
                    !selectSeat.includes(arrayRow[seatIndex - 1]) &&
                    !selled.includes(arrayRow[seatIndex - 1]._id)
                ) {
                    hasGap = true;
                }

                if (
                    arrayRow[seatIndex + 2] &&
                    arrayRow[seatIndex + 2].left > 0 &&
                    arrayRow[seatIndex + 2].status === true &&
                    arrayRow[seatIndex + 2].isDelete === false &&
                    arrayRow[seatIndex + 1] &&
                    arrayRow[seatIndex + 1].isDelete === false &&
                    !selectSeat.includes(arrayRow[seatIndex + 1]) &&
                    !selled.includes(arrayRow[seatIndex + 1]._id)
                ) {
                    hasGap = true;
                }
            });

            if (hasGap) {
                showToast('Vui lòng không bỏ trống ghế bên trái hoặc bên phải của các ghế bạn đã chọn', 'warning');
            } else {
                setStep(2);
                await holdSeat({ seatId: selectSeat.map((item) => item._id), userId: user?.data.id, showTime: id });
            }
        }
    };

    const handlePay = async () => {
        dispatch(
            cartTicketValue({
                price: priceSeat + priceCombo,
                showTime: id,
                seats: selectSeat.map((item) => item._id),
                combos: selectCombo,
            }),
        );
        await cancelHold({ showTime: id, seatId: selectSeat.map((item) => item._id) });
        navigate('/payment');
    };

    return (
        <div>
            <div>{renderStep(step)}</div>
            <div className="sticky-bill">
                <Container className="py-2 text-white">
                    {film && showTime && room && (
                        <Row>
                            <Col xs="auto" className="justify-content-center align-content-center">
                                <h2 className="font-title">
                                    {film.name} (
                                    {signAge[Object.values(standardAge).findIndex((age) => age === film.age)]})
                                </h2>
                                <h4 className="fw-bold">
                                    <Name id={showTime.theater} detail={detailTheater} /> -{' '}
                                    <span>
                                        {room.name} ({room.type})
                                    </span>
                                </h4>
                            </Col>
                            <Col className="d-flex">
                                <div
                                    style={{
                                        height: 'auto',
                                        width: '1px',
                                        backgroundColor: 'white',
                                        marginRight: '20px',
                                    }}
                                ></div>
                                <div>
                                    {selectSeat.length > 0 && (
                                        <div>
                                            <h6>Ghế: </h6>
                                            {selectSeat.map((item, index) => (
                                                <span className="text-white">
                                                    {String.fromCharCode(64 + item.row)}
                                                    {item.col}
                                                    {index < selectSeat.length - 1 && ', '}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    {selectCombo.length > 0 && (
                                        <div className="mt-2">
                                            <h6>Combo bắp nước:</h6>
                                            {selectCombo.map((item, index) => (
                                                <span className="text-white">
                                                    {item.quantity} {item.name}
                                                    {index < selectCombo.length - 1 && ', '}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Col>
                            <Col>
                                <div className="d-flex float-end align-items-center">
                                    {step === 2 && (
                                        <div style={{ border: '1px solid white', borderRadius: '2px', padding: '5px' }}>
                                            <p>Thời gian giữ vé</p>
                                            <div className="h5 text-center">
                                                {`${Math.floor(time / 60)}`.padStart(2, 0)} :{' '}
                                                {`${time % 60}`.padStart(2, 0)}
                                            </div>
                                        </div>
                                    )}
                                    <div className="ms-4">
                                        <div className="d-flex justify-content-between">
                                            <p>Tạm tính: </p>
                                            <h5>{(priceSeat + priceCombo).toLocaleString('it-IT')} VNĐ</h5>
                                        </div>
                                        <div
                                            className="button big h5"
                                            onClick={() =>
                                                step === 1 && selectSeat.length > 0 ? handleNext() : handlePay()
                                            }
                                        >
                                            TIẾP THEO
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    )}
                </Container>
            </div>
        </div>
    );
};

export default SelectSeatPage;

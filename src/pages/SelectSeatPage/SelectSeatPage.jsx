import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import ModalQuestion from '~/components/ModalQuestion/ModalQuestion';
import Name from '~/components/Name/Name';
import SelectCombo from '~/components/SelectCombo/SelectCombo';
import SelectSeat from '~/components/SelectSeat/SelectSeat';
import { infoAge, showToast, signAge, standardAge, typeUserPrice } from '~/constants';
import { cartTicketValue } from '~/features/cart/cartSlice';
import { detailFilmBySchedule } from '~/services/FilmService';
import { allOrderTicketSelled } from '~/services/OrderTicketService';
import { detailPriceByUser } from '~/services/PriceService';
import { allHold, cancelHold, holdSeat } from '~/services/RedisService';
import { detailRoom } from '~/services/RoomService';
import { allSeatRoom } from '~/services/SeatService';
import { detailShowTimeById } from '~/services/ShowTimeService';
import { detailTheater } from '~/services/TheaterService';

const SelectSeatPage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const location = useLocation();
    const { id } = location.state || {};
    const [showTime, setShowTime] = useState();
    const [room, setRoom] = useState();
    const [selled, setSelled] = useState([]);
    const [film, setFilm] = useState();
    const [seats, setSeats] = useState([]);
    const [time, setTime] = useState(180);
    const [priceSeat, setPriceSeat] = useState(0);
    const [priceCombo, setPriceCombo] = useState(0);
    const [selectSeat, setSelectSeat] = useState([]);
    const [selectCombo, setSelectCombo] = useState([]);
    const dispatch = useDispatch();
    const [showQuestion, setShowQuestion] = useState(false);
    const [hold, setHold] = useState([]);

    useEffect(() => {
        const handleNavigation = async () => {
            const data = await allHold(id);
            setHold(Object.keys(data));
        };

        handleNavigation();
    }, [id]);

    useEffect(() => {
        const fetch = async () => {
            if (user !== null && id) {
                const showTime = await detailShowTimeById(id);
                console.log('w', id);

                const roomData = await detailRoom(showTime.room);
                const filmData = await detailFilmBySchedule(showTime.schedule);
                const data = await allSeatRoom(showTime.room);
                setShowTime(showTime);
                setSeats(data);
                setRoom(roomData);
                setFilm(filmData);
            }
        };
        fetch();
    }, [id, user]);

    const renderStep = (step) => {
        switch (step) {
            case 1:
                return (
                    <SelectSeat
                        selectSeat={selectSeat}
                        setSelectSeat={setSelectSeat}
                        selled={selled}
                        seats={seats}
                    />
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
    // fetch();
    // return () => {
    //     fetch();
    // };

    useEffect(() => {
        const fetch = async () => {
            if (id) {
                const data = await allOrderTicketSelled(id);
                setSelled(data);
            }
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

    // useEffect(() => {
    //     const handleBeforeUnload = async () => {
    //         await cancelHold({ seatId: selectSeat.map((item) => item._id), showTime: id });
    //     };

    //     window.addEventListener('beforeunload', handleBeforeUnload);

    //     return () => {
    //         window.removeEventListener('beforeunload', handleBeforeUnload);
    //     };
    // }, [selectSeat, id]);

    // console.log(selectSeat);

    useEffect(() => {
        let interval;
        let startTime;
        const startCountdown = () => {
            startTime = Date.now();
            interval = setInterval(() => {
                const timePassed = Math.floor((Date.now() - startTime) / 1000);
                setTime((time) => {
                    if (time === 0) {
                        clearInterval(interval);
                        setSelectSeat([]);
                        setSelectCombo([]);
                        setPriceCombo(0);
                        setPriceSeat(0);
                        setStep(1);
                        return 0;
                    } else return 180 - timePassed;
                });
            }, 1000);
        };
        if (step === 1) {
            setTime(180);
        }
        if (step === 2) {
            startCountdown();
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [step]);

    const handleCloseQuestion = () => {
        setShowQuestion(false);
    };

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
                        hold.includes(arrayRow[seatIndex - 2]._id) ||
                        selectSeat.includes(arrayRow[seatIndex - 2]) ||
                        arrayRow[seatIndex - 2].status === false) &&
                    !selectSeat.includes(arrayRow[seatIndex - 1]) &&
                    !selled.includes(arrayRow[seatIndex - 1]._id) &&
                    !hold.includes(arrayRow[seatIndex - 1]._id) &&
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
                        hold.includes(arrayRow[seatIndex + 2]._id) ||
                        selectSeat.includes(arrayRow[seatIndex + 2]) ||
                        arrayRow[seatIndex + 2].status === false) &&
                    !selectSeat.includes(arrayRow[seatIndex + 1]) &&
                    !selled.includes(arrayRow[seatIndex + 1]._id) &&
                    !hold.includes(arrayRow[seatIndex + 1]._id) &&
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
                    !hold.includes(arrayRow[seatIndex - 1]._id) &&
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
                    !hold.includes(arrayRow[seatIndex + 1]._id) &&
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
                    !selled.includes(arrayRow[seatIndex - 1]._id) &&
                    !hold.includes(arrayRow[seatIndex - 1]._id)
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
                    !selled.includes(arrayRow[seatIndex + 1]._id) &&
                    !hold.includes(arrayRow[seatIndex + 1]._id)
                ) {
                    hasGap = true;
                }
            });

            if (hasGap) {
                showToast('Vui lòng không bỏ trống ghế bên trái hoặc bên phải của các ghế bạn đã chọn', 'warning');
            } else {
                setShowQuestion(true);
                // if (
                //     await holdSeat({ seatId: selectSeat.map((item) => item._id), userId: user?.data.id, showTime: id })
                // ) {
                //     setStep(2);
                // }
            }
        }
    };

    const handleNextOk = async () => {
        if (await holdSeat({ seatId: selectSeat.map((item) => item._id), userId: user?.data.id, showTime: id })) {
            setStep(2);
        }
        setShowQuestion(false);
    };

    const handlePay = async () => {
        try {
            dispatch(
                cartTicketValue({
                    price: priceSeat + priceCombo,
                    showTime: id,
                    seats: selectSeat.map((item) => item._id),
                    combos: selectCombo,
                }),
            );
            await cancelHold(
                id,
                selectSeat.map((item) => item._id),
            );
            // console.log(data);

            navigate('/payment');
        } catch (error) {
            console.log(error);
        }
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
                                                <span key={index} className="text-white">
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
                                            onClick={() => (step === 1 ? handleNext() : handlePay())}
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
            <ModalQuestion
                text={infoAge[standardAge.findIndex((age) => age === film?.age)]}
                accept="Đồng ý"
                header="Thông tin vé"
                cancel="Huỷ"
                show={showQuestion}
                handleAction={handleNextOk}
                handleClose={handleCloseQuestion}
            />
        </div>
    );
};

export default SelectSeatPage;

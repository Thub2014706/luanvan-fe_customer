import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import img1 from '~/assets/images/img-screen.png';
import Name from '~/components/Name/Name';
import SelectCombo from '~/components/SelectCombo/SelectCombo';
import { showToast, signAge, standardAge, typeSeatEnum } from '~/constants';
import { detailFilmBySchedule } from '~/services/FilmService';
import { allOrderTicketSelled } from '~/services/OrderTicketService';
import { detailRoom } from '~/services/RoomService';
import { allSeatRoom } from '~/services/SeatService';
import { detailShowTimeById } from '~/services/ShowTimeService';
import { detailTheater } from '~/services/TheaterService';

const SelectSeatPage = () => {
    const location = useLocation();
    const [showTime, setShowTime] = useState();
    const [room, setRoom] = useState();
    const [film, setFilm] = useState();
    const { id } = location.state || {};
    const [selectSeat, setSelectSeat] = useState([]);
    const [status, setStatus] = useState(false);
    const [seats, setSeats] = useState([]);
    const [selled, setSelled] = useState([]);
    const [time, setTime] = useState(180);

    // console.log(id, location);
    useEffect(() => {
        const fetch = async () => {
            const showTime = await detailShowTimeById(id);
            const roomData = await detailRoom(showTime.room);
            const filmData = await detailFilmBySchedule(showTime.schedule);
            const data = await allSeatRoom(showTime.room);
            setSeats(data);
            setShowTime(showTime);
            setRoom(roomData);
            setFilm(filmData);
        };
        fetch();
    }, [id]);

    useEffect(() => {
        const fetch = async () => {
            if (selectSeat.length > 0) {
                setStatus(true);
            } else {
                setStatus(false);
            }
        };
        fetch();
    }, [selectSeat]);

    useEffect(() => {
        const fetch = async () => {
            const data = await allOrderTicketSelled(id);
            setSelled(data);
        };
        fetch();
    }, [id]);

    const rows = [...new Set(seats.map((item) => item.row))];

    const handleSelectSeat = async (seat) => {
        if (!selectSeat.includes(seat)) {
            const seatArray = [...selectSeat, seat];
            const allSameType = seatArray.every((item) => item.type === seatArray[0].type);

            if (!allSameType) {
                showToast('Hãy chọn ghế cùng loại', 'warning');
            } else {
                setSelectSeat(seatArray); // Cập nhật state với mảng ghế mới
            }
        } else {
            setSelectSeat(selectSeat.filter((item) => item !== seat));
        }
    };

    const handleSelectSeatCouple = (seat) => {
        const arrayRow = seats.filter((item) => item.row === seat.row);
        const seatIndex = arrayRow.indexOf(seat);
        const nextChair = arrayRow[seatIndex].col % 2 === 0 ? arrayRow[seatIndex - 1] : arrayRow[seatIndex + 1];

        if (!selectSeat.includes(seat && nextChair)) {
            const seatArray = [...selectSeat, seat, nextChair];
            console.log(seatArray);
            const allSameType = seatArray.every((item) => item.type === seatArray[0].type);

            if (!allSameType) {
                showToast('Hãy chọn ghế cùng loại', 'warning');
            } else {
                setSelectSeat(seatArray);
            }
        } else {
            setSelectSeat(selectSeat.filter((item) => item !== seat && item !== nextChair));
        }
    };

    // const handleSubmit = () => {
    //     // if ()
    //     if (selectSeat.length === 0) {
    //         setWar('Vui lòng chọn ghế!');
    //     } else {
    //         let hasGap = false;

    //         selectSeat.forEach((item) => {
    //             const arrayRow = seats.filter((mini) => mini.row === item.row);
    //             const seatIndex = arrayRow.indexOf(item);

    //             // Kiểm tra ghế trống bên trái
    //             if (
    //                 arrayRow[seatIndex - 2] &&
    //                 arrayRow[seatIndex - 2].isDelete === false &&
    //                 arrayRow[seatIndex - 1] &&
    //                 arrayRow[seatIndex - 1].isDelete === false &&
    //                 (selled.includes(arrayRow[seatIndex - 2]._id) ||
    //                     selectSeat.includes(arrayRow[seatIndex - 2]) ||
    //                     arrayRow[seatIndex - 2].status === false) &&
    //                 !selectSeat.includes(arrayRow[seatIndex - 1]) &&
    //                 !selled.includes(arrayRow[seatIndex - 1]._id) &&
    //                 arrayRow[seatIndex - 1].status === true
    //             ) {
    //                 hasGap = true;
    //             }

    //             // Kiểm tra ghế trống bên phải
    //             if (
    //                 arrayRow[seatIndex + 2] &&
    //                 arrayRow[seatIndex + 2].isDelete === false &&
    //                 arrayRow[seatIndex + 1] &&
    //                 arrayRow[seatIndex + 1].isDelete === false &&
    //                 (selled.includes(arrayRow[seatIndex + 2]._id) ||
    //                     selectSeat.includes(arrayRow[seatIndex + 2]) ||
    //                     arrayRow[seatIndex + 2].status === false) &&
    //                 !selectSeat.includes(arrayRow[seatIndex + 1]) &&
    //                 !selled.includes(arrayRow[seatIndex + 1]._id) &&
    //                 arrayRow[seatIndex + 1].status === true
    //             ) {
    //                 hasGap = true;
    //             }

    //             // Kiểm tra ghế trống bên trái
    //             if (
    //                 (!arrayRow[seatIndex - 2] ||
    //                     (arrayRow[seatIndex - 2] && arrayRow[seatIndex - 2].isDelete === true)) &&
    //                 arrayRow[seatIndex - 1] &&
    //                 arrayRow[seatIndex - 1].isDelete === false &&
    //                 !selectSeat.includes(arrayRow[seatIndex - 1]) &&
    //                 !selled.includes(arrayRow[seatIndex - 1]._id) &&
    //                 arrayRow[seatIndex - 1].status === true
    //             ) {
    //                 hasGap = true;
    //             }

    //             // Kiểm tra ghế trống bên phải
    //             if (
    //                 (!arrayRow[seatIndex + 2] ||
    //                     (arrayRow[seatIndex + 2] && arrayRow[seatIndex + 2].isDelete === true)) &&
    //                 arrayRow[seatIndex + 1] &&
    //                 arrayRow[seatIndex + 1].left === 0 &&
    //                 arrayRow[seatIndex + 1].isDelete === false &&
    //                 !selectSeat.includes(arrayRow[seatIndex + 1]) &&
    //                 !selled.includes(arrayRow[seatIndex + 1]._id) &&
    //                 arrayRow[seatIndex + 1].status === true
    //             ) {
    //                 hasGap = true;
    //             }

    //             if (
    //                 arrayRow[seatIndex - 2] &&
    //                 arrayRow[seatIndex - 1] &&
    //                 arrayRow[seatIndex - 1].left > 0 &&
    //                 arrayRow[seatIndex - 1].status === true &&
    //                 arrayRow[seatIndex - 2].isDelete === false &&
    //                 arrayRow[seatIndex - 1].isDelete === false &&
    //                 !selectSeat.includes(arrayRow[seatIndex - 1]) &&
    //                 !selled.includes(arrayRow[seatIndex - 1]._id)
    //             ) {
    //                 hasGap = true;
    //             }

    //             if (
    //                 arrayRow[seatIndex + 2] &&
    //                 arrayRow[seatIndex + 2].left > 0 &&
    //                 arrayRow[seatIndex + 2].status === true &&
    //                 arrayRow[seatIndex + 2].isDelete === false &&
    //                 arrayRow[seatIndex + 1] &&
    //                 arrayRow[seatIndex + 1].isDelete === false &&
    //                 !selectSeat.includes(arrayRow[seatIndex + 1]) &&
    //                 !selled.includes(arrayRow[seatIndex + 1]._id)
    //             ) {
    //                 hasGap = true;
    //             }
    //         });

    //         if (hasGap) {
    //             showToast('Vui lòng không bỏ trống ghế bên trái hoặc bên phải của các ghế bạn đã chọn', 'warning');
    //         } else {
    //             dispatch(seatValue(selectSeat));
    //             dispatch(stepNext(4));
    //         }
    //     }
    // };

    useEffect(() => {
        let interval;
        const startCountdown = () => {
            interval = setInterval(() => {
                setTime((time) => {
                    if (time === 0) {
                        clearInterval(interval);
                        setSelectSeat([]);
                        return 0;
                    } else return time - 1;
                });
            }, 1000);
        };
        if (status) {
            startCountdown();
        } else {
            // clearInterval(interval);
            setTime(180);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [status]);

    return (
        <div>
            <Container className="py-5">
                <h2 className="text-white font-title text-center mb-5">CHỌN GHẾ</h2>
                <div style={{ position: 'relative' }}>
                    <img className="d-block mx-auto" src={img1} alt="" />
                    <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                        <h4 className="text-white">Màn hình</h4>
                    </div>
                </div>
                {rows.map((row) => (
                    <Table className="w-auto mx-auto my-2">
                        <tr key={row}>
                            {seats
                                .filter((seat) => seat.row === row)
                                .map((seat) => (
                                    <td className="text-center align-middle">
                                        {!seat.isDelete && (
                                            <div
                                                className={`seat ${seat.type === typeSeatEnum[0] && 'standard'} ${
                                                    seat.type === typeSeatEnum[1] && 'vip'
                                                } ${seat.type === typeSeatEnum[2] && 'couple'} ${
                                                    !seat.status && 'inaction'
                                                } ${selectSeat.find((item) => item === seat) && 'select'}
                                                    ${selled.includes(seat._id) && 'selled'}
                                                    `}
                                                style={{
                                                    marginBottom: `${seat.bottom * 22.5}px`,
                                                    marginLeft: `${seat.left * 22.5 + seat.left * 4 + 4}px`,
                                                    marginRight: `${seat.right * 22.5 + seat.right * 4 + 4}px`,
                                                }}
                                                onClick={() =>
                                                    !selled.includes(seat._id) &&
                                                    seat.status === true &&
                                                    (seat.type !== typeSeatEnum[2]
                                                        ? handleSelectSeat(seat)
                                                        : handleSelectSeatCouple(seat))
                                                }
                                            >
                                                <p className="fw-bold">
                                                    {String.fromCharCode(64 + row)}
                                                    {seat.col}
                                                </p>
                                            </div>
                                        )}
                                    </td>
                                ))}
                        </tr>
                    </Table>
                ))}
                <h2 className="text-white font-title text-center mb-5" style={{ marginTop: '150px' }}>
                    CHỌN BẮP NƯỚC
                </h2>
                <SelectCombo />
            </Container>
            <div className="sticky-bill">
                <Container className="py-2 text-white">
                    {film && showTime && room && (
                        <Row>
                            <Col>
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
                            <Col>
                                <div className="d-flex float-end align-items-center">
                                    <div style={{ border: '1px solid white', borderRadius: '2px', padding: '5px' }}>
                                        <p>Thời gian giữ vé</p>
                                        <div className="h5 text-center">
                                            {`${Math.floor(time / 60)}`.padStart(2, 0)} :{' '}
                                            {`${time % 60}`.padStart(2, 0)}
                                        </div>
                                    </div>
                                    <div className="ms-4">
                                        <div className="d-flex justify-content-between">
                                            <p>Tạm tính: </p>
                                            <h5>0 VNĐ</h5>
                                        </div>
                                        <div className="button big h5">ĐẶT VÉ</div>
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

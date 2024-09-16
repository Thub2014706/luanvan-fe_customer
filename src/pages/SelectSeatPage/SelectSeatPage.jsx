import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import img1 from '~/assets/images/img-screen.png';
import Name from '~/components/Name/Name';
import { showToast, typeSeatEnum } from '~/constants';
import { allOrderTicketSelled } from '~/services/OrderTicketService';
import { detailRoom } from '~/services/RoomService';
import { allSeatRoom } from '~/services/SeatService';
import { detailShowTimeById } from '~/services/ShowTimeService';
import { detailTheater } from '~/services/TheaterService';

const SelectSeatPage = () => {
    const location = useLocation();
    const [showTime, setShowTime] = useState()
    const [room, setRoom] = useState()
    const { id } = location.state || {};
    const [selectSeat, setSelectSeat] = useState([]);
    const [seats, setSeats] = useState([]);
    const [selled, setSelled] = useState([]);

    // console.log(id, location);
    useEffect(() => {
        const fetch = async () => {
            const showTime = await detailShowTimeById(id)
            const roomData = await detailRoom(showTime.room)
            const data = await allSeatRoom(showTime.room);
            setSeats(data);
            setShowTime(showTime)
            setRoom(roomData)
        };
        fetch();
    }, [id]);

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

    return (
        <Container className='py-5'>
            <h1 className='fw-bold text-white font-title text-center mb-5'>
                <Name id={showTime?.theater} detail={detailTheater} /> - <span>{room?.name} ({room?.type})</span>
            </h1>
            <div style={{ position: 'relative' }}>
                <img className='d-block mx-auto' src={img1} alt="" />
                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                    <h4 className='text-white'>Màn hình</h4>
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
        </Container>
    );
};

export default SelectSeatPage;

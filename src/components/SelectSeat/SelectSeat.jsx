import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { showToast, typeSeatEnum } from '~/constants';
import { allHold, cancelAllHold } from '~/services/RedisService';
import img1 from '~/assets/images/img-screen.png';
import { useDispatch, useSelector } from 'react-redux';
import { clearAll } from '~/features/cart/cartSlice';

const SelectSeat = ({ selectSeat, setSelectSeat, selled, seats }) => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const location = useLocation();
    const dispatch = useDispatch();
    const { id } = location.state || {};
    const [hold, setHold] = useState([]);
    // console.log(cartTicket);
    
    useEffect(() => {
        const handleNavigation = async () => {
            await cancelAllHold(user?.data.id);
            const data = await allHold(id);
            // console.log(data);
            dispatch(clearAll());

            setHold(Object.keys(data));
        };

        handleNavigation();
    }, [location, user, id, dispatch]);

    // console.log(hold);

    const rows = [...new Set(seats.map((item) => item.row))];

    const handleSelectSeat = async (seat) => {
        if (!selectSeat.includes(seat)) {
            const seatArray = [...selectSeat, seat];
            const allSameType = seatArray.every((item) => item.type === seatArray[0].type);

            if (!allSameType) {
                showToast('Hãy chọn ghế cùng loại', 'warning');
            } else {
                setSelectSeat(seatArray);
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
            // console.log(seatArray);
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
                                                    ${
                                                        (selled.includes(seat._id) || hold.includes(seat._id)) &&
                                                        'selled'
                                                    }
                                                    `}
                                                style={{
                                                    marginBottom: `${seat.bottom * 22.5}px`,
                                                    marginLeft: `${seat.left * 22.5 + seat.left * 4 + 4}px`,
                                                    marginRight: `${seat.right * 22.5 + seat.right * 4 + 4}px`,
                                                }}
                                                onClick={() =>
                                                    !selled.includes(seat._id) &&
                                                    !hold.includes(seat._id) &&
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
        </div>
    );
};

export default SelectSeat;

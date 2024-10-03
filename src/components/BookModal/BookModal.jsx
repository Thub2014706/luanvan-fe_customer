import moment from 'moment';
import momentTimezone from 'moment-timezone';
import React, { useEffect, useState } from 'react';
import { nameDay, statusShowTime } from '~/constants';
import { Form, Modal } from 'react-bootstrap';
import img1 from '~/assets/images/movie-updating.png';
import { listProvince, listTheaterByProvince } from '~/services/TheaterService';
import { listShowTimeByFilm, soldOutSeat } from '~/services/ShowTimeService';
import { Link } from 'react-router-dom';

const BookModal = ({ show, handleClose, id }) => {
    const [selectDay, setSelectDay] = useState(0);
    const [date, setDate] = useState(moment(Date()).format('YYYY-MM-DD'));
    const [province, setProvince] = useState([]);
    const [selectPro, setSelectPro] = useState();
    const [theaters, setTheaters] = useState([]);
    // const [showTime, setShowTime] = useState();

    const now = new Date();
    const array = [0, 1, 2, 3, 4, 5, 6];
    const week = [];

    array.forEach((item) => {
        const date = new Date(now);
        date.setDate(date.getDate() + item);
        week.push({
            date: date.getDate(),
            day: date.getDay(),
            month: date.getMonth(),
            full: moment(date).format('YYYY-MM-DD'),
        });
    });

    const handleSelect = async (index, date) => {
        setSelectDay(index);
        setDate(date);
    };

    // console.log(selectDay);
    useEffect(() => {
        const fetch = async () => {
            const data = await listProvince();
            setSelectPro(data[0].province);
            setProvince(data);
        };
        fetch();
    }, []);

    useEffect(() => {
        const fetch = async () => {
            if (selectPro) {
                const data = await listTheaterByProvince(selectPro);
                const data2 = await Promise.all(
                    data.map(async (item) => {
                        const showTimes = await listShowTimeByFilm(item._id, date, id);
                        const data3 = await Promise.all(
                            showTimes.map(async (mini) => {
                                const now = Date.now();
                                const currentDate = new Date(now);
                                const minutes = currentDate.getMinutes();
                                const hours = currentDate.getHours();
                                const initialTime = momentTimezone.tz(mini.timeStart, 'HH:mm', 'Asia/Ho_Chi_Minh');
                                const newTime = initialTime.subtract(20, 'minutes');
                                const late =
                                    (hours === newTime.hours() && minutes < newTime.minutes()) ||
                                    hours < newTime.hours()
                                        ? 1
                                        : 0;
                                const test = await soldOutSeat(mini._id, mini.room);
                                return { ...mini, test, late };
                            }),
                        );
                        return { theater: item, showTimes: data3 };
                    }),
                );
                // setShowTimes(data2)
                setTheaters(data2);
            }
        };
        fetch();
    }, [id, date, selectPro]);

    console.log(theaters);

    // const handleShowTime = (id) => {
    //     if (id !== showTime) {
    //         setShowTime(id);
    //     } else {
    //         setShowTime();
    //     }
    //     navigate('/')
    // };

    // const handleNext = () => {};

    return (
        <Modal centered style={{ zIndex: 1000000 }} size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>{/* <Modal.Title>Modal heading</Modal.Title> */}</Modal.Header>
            <Modal.Body style={{ height: '80vh', overflowY: 'auto' }}>
                <h4 className="font-title">LỊCH CHIẾU</h4>
                <div className="d-flex justify-content-center">
                    {week.map((item, index) => (
                        <div
                            onClick={() => handleSelect(index, item.full)}
                            className={`me-4 flex-column d-flex align-items-center justify-content-center card-date2 ${
                                selectDay === index ? 'yes' : 'no'
                            }`}
                        >
                            <span className="fw-bold mb-2">
                                {item.date}/{item.month}
                            </span>
                            <span style={{ fontSize: '0.9em' }}>
                                {now.getDay() === item.day ? 'Hôm nay' : nameDay[item.day]}
                            </span>
                        </div>
                    ))}
                </div>
                <hr />
                <div className="justify-content-between d-flex mt-5">
                    <h4 className="font-title">DANH SÁCH RẠP</h4>
                    <div>
                        <Form.Select
                            value={selectPro}
                            onChange={(e) => setSelectPro(e.target.value)}
                            style={{ border: '1px solid #021b4e' }}
                        >
                            {province.map((item) => (
                                <option key={item.province} value={item.province}>
                                    {item.province}
                                </option>
                            ))}
                        </Form.Select>
                    </div>
                </div>
                {theaters.map((item) => (
                    <div className="p-4 mt-4 card-theater">
                        <h5 className="font-title">{item.theater.name}</h5>
                        <p>
                            {item.theater.address}, {item.theater.ward}, {item.theater.district},{' '}
                            {item.theater.province}
                        </p>
                        <div className="mt-4">
                            {item.showTimes.length > 0 ? (
                                Object.entries(
                                    item.showTimes.reduce((acc, mini) => {
                                        if (!acc[mini.translate]) {
                                            acc[mini.translate] = [];
                                        }
                                        acc[mini.translate].push(mini);
                                        return acc;
                                    }, {}),
                                ).map(([translate, mini]) => (
                                    <div className="mt-2">
                                        <p>{translate}</p>
                                        {mini.map((min) => (
                                            <Link
                                                to={
                                                    min.status === statusShowTime[2] &&
                                                    min.test === 1 &&
                                                    min.late === 1 &&
                                                    '/book-seat'
                                                }
                                                state={
                                                    min.status === statusShowTime[2] &&
                                                    min.test === 1 &&
                                                    min.late === 1 && { id: min._id }
                                                }
                                                style={{ display: 'inline-block' }}
                                                // onClick={() =>
                                                //     min.status === statusShowTime[2] &&
                                                //     min.test === 1 &&
                                                //     handleShowTime(min._id)
                                                // }
                                                className={`time-mini me-3 mb-3 text-decoration-none ${
                                                    min.status === statusShowTime[2] && min.test === 1 && min.late === 1
                                                        ? //  && showTime !== min._id
                                                          'yes2'
                                                        : 'no2'
                                                }`}
                                            >
                                                {min.timeStart}
                                            </Link>
                                        ))}
                                    </div>
                                ))
                            ) : (
                                <div style={{ border: '1px solid gray', borderRadius: '5px', padding: '10px' }}>
                                    <img src={img1} alt="" height={20} />
                                    <span className="ms-2">Hiện chưa có lịch chiếu</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </Modal.Body>
            {/* <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={handleNext}>
                    Chọn
                </Button>
            </Modal.Footer> */}
        </Modal>
    );
};

export default BookModal;

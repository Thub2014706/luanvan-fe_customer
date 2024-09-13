import React, { useEffect, useState } from 'react';
import ScheduleMini from '../ScheduleMini/ScheduleMini';
import moment from 'moment';
import { nameDay, statusShowTime } from '~/constants';
import { detailShowTimeById, filmByTheater, soldOutSeat } from '~/services/ShowTimeService';
import { Link, useParams } from 'react-router-dom';
import ImageBase from '../ImageBase/ImageBase';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import img1 from '~/assets/images/icon-tag.svg';
import img2 from '~/assets/images/icon-clock.svg';
import Name from '../Name/Name';
import { detailGenre } from '~/services/GenreService';

const SelectSchedule = () => {
    const { id } = useParams();
    const [selectDay, setSelectDay] = useState(0);
    const [date, setDate] = useState(moment(Date()).format('YYYY-MM-DD'));
    const [showTimes, setShowTimes] = useState([]);

    const now = new Date();
    const array = [0, 1, 2, 3, 4, 5, 6];
    const week = [];

    array.forEach((item) => {
        const date = new Date(now);
        date.setDate(date.getDate() + item);
        week.push({ date: date.getDate(), day: date.getDay(), full: moment(date).format('YYYY-MM-DD') });
    });

    const handleSelect = async (index, date) => {
        setSelectDay(index);
        setDate(date);
    };

    useEffect(() => {
        const fetch = async () => {
            const data = await filmByTheater(id, date);
            const newData = await Promise.all(
                data.map(async (item) => {
                    const newShowTimes = await Promise.all(
                        item.showTimes.map(async (mini) => {
                            const test = await soldOutSeat(mini._id, mini.room);
                            return { ...mini, test };
                        }),
                    );
                    return { film: item.film, showTimes: newShowTimes };
                }),
            );
            // console.log(newData);
            setShowTimes(newData);
        };
        fetch();
    }, [id, date]);

    const handleShowTime = (id) => {};
    return (
        <div className="py-5">
            <div className="d-flex justify-content-center">
                {week.map((item, index) => (
                    <ScheduleMini
                        date={item.date}
                        day={now.getDay() === item.day ? 'Hôm nay' : nameDay[item.day]}
                        handleSelectDay={() => handleSelect(index, item.full)}
                        selectDay={selectDay === index ? true : false}
                    />
                ))}
            </div>
            <div className="mt-5">
                {showTimes.length > 0 ? (
                    <Row>
                        {showTimes.map((item, index) => (
                            <Col xs={6} className="mt-5">
                                <div className="d-flex gap-3">
                                    <Link to={`/film/${item.film._id}`}>
                                        <ImageBase
                                            pathImg={item.film.image}
                                            style={{
                                                height: '450px',
                                                width: '290px',
                                                objectFit: 'cover',
                                                borderRadius: '5px',
                                            }}
                                        />
                                    </Link>
                                    <div>
                                        <Link to={`/film/${item.film._id}`} className='text-decoration-none text-white'>
                                            <h3 className="font-title">{item.film.name.toUpperCase()}</h3>
                                        </Link>
                                        <p>
                                            <img src={img1} alt="" className="me-3" height={20} width={20} />
                                            {item.film.genre.map((mini, index) => (
                                                <span>
                                                    <Name id={mini} detail={detailGenre} />
                                                    {index < item.film.genre.length - 1 && ', '}
                                                </span>
                                            ))}
                                        </p>
                                        <p className="mt-3">
                                            <FontAwesomeIcon
                                                icon={faUserCheck}
                                                style={{ color: 'rgb(237, 225, 45)', fontSize: '1.2rem' }}
                                            />
                                            <span
                                                className="ms-3 text-black text-main"
                                                style={{ backgroundColor: '#F3EA28' }}
                                            >
                                                {item.film.age}
                                            </span>
                                        </p>
                                        <p>
                                            <img src={img2} alt="" height={20} width={20} />
                                            <span className="ms-3">{item.film.time}'</span>
                                        </p>
                                        <div className="mt-4">
                                            {Object.entries(
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
                                                        <span
                                                            style={{ display: 'inline-block' }}
                                                            onClick={() =>
                                                                min.status === statusShowTime[2] &&
                                                                min.test === 1 &&
                                                                handleShowTime(min._id)
                                                            }
                                                            className={`time-mini me-3 mb-3 ${
                                                                min.status === statusShowTime[2] && min.test === 1
                                                                    ? 'yes'
                                                                    : 'no'
                                                            }`}
                                                        >
                                                            {min.timeStart}
                                                        </span>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <p className="text-center">Chưa có suất chiếu nào!</p>
                )}
            </div>
        </div>
    );
};

export default SelectSchedule;

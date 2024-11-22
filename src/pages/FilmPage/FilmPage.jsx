import { CFormSelect, CMultiSelect } from '@coreui/react-pro';
import { faArrowUpWideShort, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import FilmTitle from '~/components/FilmTitle/FilmTitle';
import { standardAge, statusShowTime } from '~/constants';
import { avgComment } from '~/services/CommentService';
import { filterFilm, numberTicketFilm } from '~/services/FilmService';
import { listGenre } from '~/services/GenreService';

const FilmPage = () => {
    const [films, setFilms] = useState([]);
    const [genre, setGenre] = useState([]);
    const [genres, setGenres] = useState([]);
    const [showVideo, setShowVideo] = useState(false);
    const [showBook, setShowBook] = useState(false);
    const [age, setAge] = useState('');
    const [sort, setSort] = useState(1);
    const [type, setType] = useState(1);

    useEffect(() => {
        const fetch = async () => {
            const data = await filterFilm(
                genre.length > 0 ? JSON.stringify(genre.map((item) => item.value)) : '',
                age,
                type === 1 ? statusShowTime[1] : statusShowTime[2],
            );
            setFilms(data);
        };
        fetch();
    }, [genre, age, type]);
    // console.log(age);

    useEffect(() => {
        const fetch = async () => {
            const data = await listGenre();
            setGenres(data);
        };
        fetch();
    }, []);

    useEffect(() => {
        const fetch = async () => {
            if (sort === 2) {
                const data = await Promise.all(
                    films.map(async (item) => {
                        const avg = await avgComment(item._id);
                        return { ...item, avg: avg !== null ? avg : 0 };
                    }),
                );
                setFilms(data.sort((a, b) => b.avg - a.avg));
            } else {
                const data = await Promise.all(
                    films.map(async (item) => {
                        const number = await numberTicketFilm(item._id);
                        return { ...item, number };
                    }),
                );
                setFilms(data.sort((a, b) => b.number - a.number));
            }
        };
        fetch();
    }, [sort]);

    // const handleGenre = (id) => {
    //     if (!genre.includes(id)) {
    //         setGenre((pre) => [...pre, id]);
    //     } else {
    //         setGenre(genre.filter((item) => item !== id));
    //     }
    // };

    const handleStar = async () => {
        const data = await Promise.all(
            films.map(async (item) => {
                const avg = await avgComment(item._id);
                console.log(avg);
                return { ...item, avg: avg !== null ? avg : 0 };
            }),
        );
        setFilms(data.sort((a, b) => b.avg - a.avg));
    };

    return (
        // <div>
        <Container className="text-white py-5">
            <Row>
                <Col sx={3} sm={3} lg={3}>
                    <div className="d-flex gap-2 align-items-center mb-2">
                        <h4 className="font-title mb-0">SẮP XẾP</h4>
                        <FontAwesomeIcon icon={faArrowUpWideShort} size="xl" />
                    </div>
                    <div
                        onClick={() => setSort(1)}
                        className={`menu-user p-2 ${sort === 1 ? 'line' : ''}`}
                        style={{ cursor: 'pointer' }}
                    >
                        Theo vé bán chạy nhất
                    </div>
                    <div
                        onClick={() => setSort(2)}
                        className={`menu-user p-2 mt-3 ${sort === 2 ? 'line' : ''}`}
                        style={{ cursor: 'pointer' }}
                    >
                        Theo đánh giá cao nhất
                    </div>
                    <div className="d-flex gap-2 mt-5 align-items-center mb-2">
                        <h4 className="font-title mb-0">LỌC</h4>
                        <FontAwesomeIcon icon={faFilter} size="xl" />
                    </div>
                    <CMultiSelect
                        options={genres.map((item) => {
                            return { value: item._id, label: item.name };
                        })}
                        onChange={(value) => setGenre(value)}
                        placeholder="Thể loại"
                    />
                    {/* {genres.map((item) => (
                        <Form.Check
                            type="checkbox"
                            label={item.name}
                            id={item._id}
                            name="genre"
                            onChange={() => handleGenre(item._id)}
                        />
                    ))} */}
                    <CFormSelect value={age} onChange={(e) => setAge(e.target.value)} className="mt-3">
                        <option value="">Giới hạn độ tuổi</option>
                        {standardAge.map((item) => (
                            <option value={item}>{item}</option>
                        ))}
                    </CFormSelect>
                </Col>
                <Col sx={9} sm={9} lg={9}>
                    <div className="d-flex justify-content-center gap-5">
                        <h3
                            className="font-title"
                            onClick={() => setType(1)}
                            style={{ color: type === 1 ? '#f3ea28' : 'white', cursor: 'pointer' }}
                        >
                            PHIM ĐANG CHIẾU
                        </h3>
                        <h3
                            className="font-title"
                            onClick={() => setType(2)}
                            style={{ color: type === 2 ? '#f3ea28' : 'white', cursor: 'pointer' }}
                        >
                            PHIM SẮP CHIẾU
                        </h3>
                    </div>
                    <hr />
                    <Row className="mt-5">
                        {films.map((item) => (
                            <Col sx={12} sm={6} lg={4} className="mb-5">
                                <FilmTitle film={item} />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
        // </div>
    );
};

export default FilmPage;

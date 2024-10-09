import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import ImageBase from '../ImageBase/ImageBase';
import { detailFilm } from '~/services/FilmService';
import { useParams } from 'react-router-dom';
import Name from '../Name/Name';
import { detailGenre } from '~/services/GenreService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmericas, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { detailDirector } from '~/services/DirectorService';
import { detailPerformer } from '~/services/PerformerService';
import moment from 'moment';
import BookModal from '../BookModal/BookModal';
import VideoModal from '../VideoModal/VideoModal';
import img1 from '~/assets/images/icon-tag.svg';
import img2 from '~/assets/images/icon-clock.svg';
import img3 from '~/assets/images/icon-play-vid.svg';

const DetailFilm = () => {
    const [film, setFilm] = useState(null);
    const { id } = useParams();
    const [showVideo, setShowVideo] = useState(false);
    const [showBook, setShowBook] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const data = await detailFilm(id);
            setFilm(data);
        };
        fetch();
    }, [id]);

    const handleShowVideo = () => {
        setShowVideo(true);
    };

    const handleCloseVideo = () => {
        setShowVideo(false);
    };

    const handleShowBook = () => {
        setShowBook(true);
    };

    const handleCloseBook = () => {
        setShowBook(false);
    };

    return (
        film !== null && (
            <div>
                <Row>
                    <Col xs="auto">
                        <ImageBase
                            pathImg={film.image}
                            style={{
                                height: '700px',
                                width: '490px',
                                objectFit: 'cover',
                                borderRadius: '5px',
                                border: '1px solid gray',
                            }}
                        />
                    </Col>
                    <Col xs="auto">
                        <p className="name-film font-title " style={{ fontSize: '3.5rem' }}>
                            {film.name}
                        </p>
                        
                        <p className="mt-3 d-flex">
                            <img src={img1} alt="" className="me-3" height={27} width={27} />
                            {film.genre.map((item, index) => (
                                <span className="h5 my-auto">
                                    <Name id={item} detail={detailGenre} />
                                    {index < film.genre.length - 1 && ', '}
                                </span>
                            ))}
                        </p>
                        <p className="mt-3 d-flex">
                            <img src={img2} alt="" height={27} width={27} />
                            <span className="ms-3 h5 my-auto">{film.time}'</span>
                        </p>
                        <p className="mt-3">
                            <FontAwesomeIcon
                                icon={faEarthAmericas}
                                style={{ color: 'rgb(237, 225, 45)', fontSize: '1.5rem' }}
                            />
                            <span className="ms-3 h5 text-main">{film.nation}</span>
                        </p>
                        <p className="mt-3">
                            <FontAwesomeIcon
                                icon={faUserCheck}
                                style={{ color: 'rgb(237, 225, 45)', fontSize: '1.5rem' }}
                            />
                            <span className="ms-3 text-black h5 text-main" style={{ backgroundColor: '#F3EA28' }}>
                                {film.age}
                            </span>
                        </p>
                        <p className="name-film font-title  mt-5" style={{ fontSize: '2rem' }}>
                            MÔ TẢ
                        </p>
                        <p>
                            Đạo diễn:{' '}
                            {film.director.map((item, index) => (
                                <span>
                                    <Name id={item} detail={detailDirector} />
                                    {index < film.director.length - 1 && ', '}
                                </span>
                            ))}
                        </p>
                        <p>
                            Diễn viên:{' '}
                            {film.performer.map((item, index) => (
                                <span>
                                    <Name id={item} detail={detailPerformer} />
                                    {index < film.performer.length - 1 && ', '}
                                </span>
                            ))}
                        </p>
                        <p>Khởi chiếu: {moment(film.releaseDate).format('DD/MM/YYYY')}</p>
                        <p className="name-film font-title  mt-5" style={{ fontSize: '2rem' }}>
                            NỘI DUNG PHIM
                        </p>
                        <p dangerouslySetInnerHTML={{ __html: film.description }}></p>
                        <div className="mt-5 pe-0" style={{ cursor: 'pointer' }}>
                            <img
                                onClick={() => handleShowVideo()}
                                src={img3}
                                alt=""
                                style={{ height: '40px', border: '0.6px solid white', borderRadius: '50%' }}
                            />
                            <span
                                className="ms-2 h5 w-trailer text-white"
                                style={{ flexGrow: 0 }}
                                onClick={() => handleShowVideo()}
                            >
                                Xem Trailer
                            </span>
                        </div>
                        <div className="button look mt-5 h5" onClick={handleShowBook}>
                            ĐẶT VÉ
                        </div>
                    </Col>
                </Row>
                <VideoModal show={showVideo} handleClose={handleCloseVideo} trailer={film.trailer} />
                <BookModal show={showBook} handleClose={handleCloseBook} id={id} />
            </div>
        )
    );
};

export default DetailFilm;

import React from 'react';
import ImageBase from '../ImageBase/ImageBase';
import { signAge, standardAge } from '~/constants';
import Name from '../Name/Name';
import { detailGenre } from '~/services/GenreService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import img1 from '~/assets/images/icon-tag.svg';
import img2 from '~/assets/images/icon-clock.svg';
import img3 from '~/assets/images/icon-play-vid.svg';
import { Link } from 'react-router-dom';

const FilmTitle = ({ film, handleShowVideo, handleBook }) => {

    const handleShow = (item) => {
        handleShowVideo(item)
    }

    return (
        <div style={{ width: '285px' }}>
            <Link to={`/film/${film._id}`} className="text-decoration-none">
                <div className="card-film">
                    <div className="sign-age">
                        {standardAge.map(
                            (item, index) => item === film.age && <span className="h2 big-age">{signAge[index]}</span>,
                        )}
                    </div>
                    <div className="main-center gap-3">
                        <h5 className="mb-4">{film.name.toUpperCase()}</h5>
                        <p>
                            <img src={img1} alt="" className="me-3" height={20} width={20} />
                            {film.genre.map((item, index) => (
                                <span>
                                    <Name id={item} detail={detailGenre} />
                                    {index < film.genre.length - 1 && ', '}
                                </span>
                            ))}
                        </p>
                        <p>
                            <img src={img2} alt="" height={20} width={20} />
                            <span className="ms-3">{film.time}'</span>
                        </p>
                        <p>
                            <FontAwesomeIcon
                                icon={faEarthAmericas}
                                style={{ color: 'rgb(237, 225, 45)', fontSize: '1.24rem' }}
                            />
                            <span className="ms-3">{film.nation}</span>
                        </p>
                    </div>
                    <ImageBase
                        pathImg={film.image}
                        style={{
                            height: '425px',
                            width: '285px',
                            objectFit: 'cover',
                            borderRadius: '5px',
                            border: '1px solid gray',
                        }}
                    />
                    <h4 className="text-center mt-3 text-white text-long">{film.name.toUpperCase()}</h4>
                </div>
            </Link>
            <div className="mt-5">
                <span style={{ cursor: 'pointer' }} onClick={() => handleShow(film)}>
                    <img src={img3} alt="" style={{ border: '0.6px solid white', borderRadius: '50%' }} />
                    <span className="ms-2 h6 w-trailer text-white">Xem Trailer</span>
                </span>
                <div className="button book float-end" onClick={handleBook}>ĐẶt VÉ</div>
            </div>
        </div>
    );
};

export default FilmTitle;

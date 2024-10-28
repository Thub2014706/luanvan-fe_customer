import { faFaceAngry } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import img1 from '~/assets/images/facebook.png';
import img2 from '~/assets/images/instagram.png';
import img3 from '~/assets/images/youtube.png';
import img4 from '~/assets/images/tik-tok-icon-1777x2048-102ej595.png';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ImageBase from '~/components/ImageBase/ImageBase';

const Footer = () => {
    const info = useSelector((state) => state.information.data);

    return (
        <div
            className="footer"
            style={{ background: 'linear-gradient(to bottom right, #a977fa, #719df4)', color: 'white' }}
        >
            <Container className="pt-4">
                <section className="mb-4">
                    <Row>
                        <Col xs="auto">
                            <ImageBase
                                pathImg={info.image}
                                style={{ height: '80px', width: 'auto', cursor: 'pointer' }}
                            />
                            <div className="text-center mt-4">
                                <Link to={info.facebook} className="mx-2">
                                    <img src={img1} alt="" style={{ height: '20px' }} />
                                </Link>

                                <Link to={info.instagram} className="mx-2">
                                    <img src={img2} alt="" style={{ height: '20px' }} />
                                </Link>

                                <Link to={info.tiktok} className="mx-2">
                                    <img src={img4} alt="" style={{ height: '20px' }} />
                                </Link>

                                <Link to={info.youtube} className="mx-2">
                                    <img src={img3} alt="" style={{ height: '20px' }} />
                                </Link>
                            </div>
                        </Col>
                        <Col className="d-flex align-items-center justify-content-end">
                            <div className="float-end">
                                <p className="mb-0">Hotline: {info.phone}</p>
                                <p className="mb-0">Email: {info.email}</p>
                                <p className="mb-0">
                                    Thời gian mở cửa: {info.timeStart} - {info.timeEnd}
                                </p>
                            </div>
                        </Col>
                    </Row>
                </section>

                <div className="text-center p-3">© {info.copy}</div>
            </Container>
        </div>
    );
};

export default Footer;

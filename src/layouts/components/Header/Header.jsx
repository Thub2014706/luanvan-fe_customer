import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import logo from '~/assets/images/CINETHU.png';
import Search from '../Search/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faCalendarDays, faLocationDot, faUserLarge } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/services/UserService';
import img1 from '~/assets/images/ic-ticket.svg';
import img2 from '~/assets/images/ic-cor.svg';

const Header = () => {
    const user = useSelector((state) => state.auth.login.currentUser);

    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(true);
    };

    const handleHide = () => {
        setShow(false);
    };

    const handleLogout = () => {
        logout(dispatch, user?.accessToken);
    };
    return (
        <div className="background">
            <Container>
                <Row className="pb-1 pt-3">
                    <Col xs={2}>
                        <img src={logo} style={{ height: '50px', width: 'auto' }} alt="" />
                    </Col>
                    <Col xs={5} className="my-auto ps-5">
                        <div className="d-flex text-white">
                            <div className="button  b1">
                                <img src={img1} alt="" />
                                <span className="ms-2">ĐẶT VÉ NGAY</span>
                            </div>
                            <div className="button b2 ms-3">
                                <img src={img2} alt="" />
                                <span className="ms-2">ĐẶT BẮP NƯỚC</span>
                            </div>
                        </div>
                    </Col>
                    <Col xs={5} className="my-auto">
                        <span className="d-flex float-end">
                            <Search />
                            <div className="text-white d-flex my-auto ms-5 text-decoration-none">
                                {user !== null ? (
                                    <div>
                                        <span className="d-flex" onMouseEnter={handleShow} onMouseLeave={handleHide}>
                                            <FontAwesomeIcon icon={faUserLarge} size="lg" style={{ color: 'white' }} />
                                            <p className="ms-2 my-auto">{user.data.username}</p>
                                        </span>
                                        {show && (
                                            <div
                                                className="ms-1"
                                                onMouseEnter={handleShow}
                                                onMouseLeave={handleHide}
                                                style={{
                                                    position: 'absolute',
                                                    zIndex: '10000',
                                                }}
                                            >
                                                <ul
                                                    style={{
                                                        backgroundColor: 'white',
                                                        listStyle: 'none',
                                                    }}
                                                    className="p-3 mt-2 shadow"
                                                >
                                                    <li>
                                                        <FontAwesomeIcon icon={faArrowRightFromBracket} color="black" />
                                                        <a
                                                            href="#"
                                                            onClick={handleLogout}
                                                            className="ms-1 text-black text-decoration-none"
                                                        >
                                                            Đăng xuất
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link to={'/sign-in'} className="text-white text-decoration-none d-flex my-auto">
                                        <FontAwesomeIcon icon={faUserLarge} size="lg" style={{ color: 'white' }} />
                                        <p className="ms-2 my-auto">Tài khoản</p>
                                    </Link>
                                )}
                                {/* </p> */}
                            </div>
                        </span>
                    </Col>
                </Row>
                <hr style={{ color: 'grey' }} />
                <Row className="pb-3 text-white">
                    <Col className="d-flex">
                        <div>
                            <FontAwesomeIcon icon={faLocationDot} />
                            <span className="ms-2">Chọn rạp</span>
                        </div>
                        <div className="ms-5">
                            <FontAwesomeIcon icon={faCalendarDays} />
                            <span className="ms-2">Lịch chiếu</span>
                        </div>
                    </Col>
                    <Col>
                        <div className="float-end d-flex gap-5">
                            <span>Sự kiện</span>
                            <span>Khuyến mãi</span>
                            <span>Tin tức</span>
                            <span>Giới thiệu</span>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Header;

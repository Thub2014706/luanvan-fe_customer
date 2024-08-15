import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import logo from '~/assets/images/CINETHU.png';
import Search from '../Search/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faUserLarge } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/services/UserService';

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
        logout(dispatch, user.accessToken);
    };
    return (
        <div className="background">
            <Container>
                <Row className="py-3">
                    <Col xs={2}>
                        <img src={logo} style={{ height: '50px', width: 'auto' }} alt="" />
                    </Col>
                    <Col xs={5} className="my-auto">
                        <ul className="d-flex text-white my-auto">
                            <li className="nav px-3">SHOP QUÀ TẶNG</li>
                            <li className="nav px-3">PHIM</li>
                            <li className="nav px-3">RẠP CHIẾU PHIM</li>
                        </ul>
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
                                    <Link to={'/sign-in'} className='text-white text-decoration-none d-flex my-auto'>
                                        <FontAwesomeIcon icon={faUserLarge} size="lg" style={{ color: 'white' }} />
                                        <p className='ms-2 my-auto'>Tài khoản</p>
                                    </Link>
                                )}
                                {/* </p> */}
                            </div>
                        </span>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Header;

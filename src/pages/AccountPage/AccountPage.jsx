import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { detailUserById } from '~/services/UserService';
import img1 from '~/assets/images/user.png';

const AccountPage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [userInfo, setUserInfo] = useState();

    useEffect(() => {
        const fetch = async () => {
            const data = await detailUserById(user.data.id);
            setUserInfo(data);
        };
        fetch();
    }, [user]);

    return (
        <div>
            <Container className="py-5 text-white">
                <Row>
                    <Col xs={3}>
                        <div>
                            <h5>Tài khoản</h5>
                        </div>
                        <div>
                            <h5>Lịch sử giao dịch</h5>
                        </div>
                    </Col>
                    <Col xs={9}>
                        {userInfo && (
                            <div>
                                <h1 className="font-title mb-5">THÔNG TIN CHUNG</h1>
                                <Row className="bg-info-user">
                                    <Col>
                                        <h4>Ảnh đại diện</h4>
                                        {/* {userInfo.avatar} */}
                                        <div>
                                            <img
                                                src={img1}
                                                height={100}
                                                style={{
                                                    border: '1px solid white',
                                                    borderRadius: '50%',
                                                    padding: '10px',
                                                }}
                                                alt=""
                                            />
                                        </div>
                                        <div className="button avatar-up mt-2">Thay đổi</div>
                                        <div className='mt-5'>
                                            <h4>Liên hệ</h4>
                                            <p>Tên: {userInfo.username}</p>
                                            <p>Email: {userInfo.email}</p>
                                            <p>Số điện thoại: {userInfo.phone}</p>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div>
                                            <h4 className="text-center mb-3">Quét mã QR</h4>
                                            <div>
                                                <img
                                                    className="mx-auto d-block"
                                                    src={userInfo.qrCode}
                                                    style={{
                                                        height: '220px',
                                                        width: 'auto',
                                                        border: '5px solid white',
                                                        padding: '10px',
                                                    }}
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AccountPage;

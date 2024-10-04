import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import img1 from '~/assets/images/user.png';
import ImageBase from '~/components/ImageBase/ImageBase';
import { detailUserById, updateAvatar } from '~/services/UserService';

const InfoAccount = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [userInfo, setUserInfo] = useState();
    const inputFile = useRef(null);
    const [avatar, setAvatar] = useState();
    const [avatarBase, setAvatarBase] = useState();

    useEffect(() => {
        const fetch = async () => {
            const data = await detailUserById(user.data.id);
            setUserInfo(data);
        };
        fetch();
    }, [user]);

    const onButtonClick = () => {
        inputFile.current.click();
    };

    const handleFileUpload = (e) => {
        const { files } = e.target;
        if (files && files.length) {
            setAvatar(files[0]);
            setAvatarBase(URL.createObjectURL(files[0]));
        }
    };

    useEffect(() => {
        const fetch = async (e) => {
            if (avatar) {
                // e.preventDefault();
                console.log(avatar);

                const formData = new FormData();
                formData.append('avatar', avatar);
                await updateAvatar(formData, user.data.id);
            }
        };
        fetch();
    }, [avatar, user]);

    return (
        <div>
            {userInfo && (
                <div className="bg-info-user">
                    <h1 className="font-title mb-5">THÔNG TIN CHUNG</h1>
                    <Row>
                        <Col>
                            <h4>Ảnh đại diện</h4>
                            {/* {userInfo.avatar} */}
                            <div>
                                {avatarBase ? (
                                    <img
                                        src={avatarBase}
                                        style={{
                                            height: '100px',
                                            width: '100px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                        }}
                                        alt=""
                                    />
                                ) : userInfo.avatar ? (
                                    <ImageBase
                                        pathImg={userInfo.avatar}
                                        style={{
                                            height: '100px',
                                            width: '100px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                ) : (
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
                                )}
                            </div>
                            <input
                                style={{ display: 'none' }}
                                // accept=".zip,.rar"
                                ref={inputFile}
                                onChange={handleFileUpload}
                                type="file"
                            />
                            <div className="button avatar-up mt-2" onClick={onButtonClick}>
                                Thay đổi
                            </div>
                            <div className="mt-5">
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
        </div>
    );
};

export default InfoAccount;

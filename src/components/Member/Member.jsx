import React, { useEffect, useState } from 'react';
import { ProgressBar, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { sumPayByUser } from '~/services/OrderTicketService';
import { detailUserById } from '~/services/UserService';
import img1 from '~/assets/images/user-vip.png';
import DeatailLevel from '../DetailLevel/DetailLevel';

const Member = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [userInfo, setUserInfo] = useState();
    const [showLevel, setShowLevel] = useState(false);

    const handleShowLevel = () => {
        setShowLevel(true);
    };

    const handleCloseLevel = () => {
        setShowLevel(false);
    };

    useEffect(() => {
        const fetch = async () => {
            const data = await detailUserById(user.data.id);
            const sum = await sumPayByUser(user.data.id);
            setUserInfo({ ...data, sum });
        };
        fetch();
    }, [user]);

    return (
        userInfo && (
            <div>
                <h1 className="font-title mb-4">CẤP ĐỘ THẺ</h1>
                <div>
                    <div className="justify-content-end d-flex">
                        <img src={img1} height={40} alt="" />
                    </div>
                    <ProgressBar className="mb-2" now={(userInfo.sum * 100) / 4000000} />
                    <Table className="table-borderless">
                        <tbody>
                            <tr>
                                <td
                                    className="text-white"
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0)', width: '200px' }}
                                >
                                    Cấp độ thẻ:
                                </td>
                                <td className="text-white" style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}>
                                    {userInfo.level !== 2 ? 'Member' : 'VIP'}{' '}
                                    <span
                                        className="ms-3 text-decoration-underline text-info"
                                        style={{ cursor: 'pointer' }}
                                        onClick={handleShowLevel}
                                    >
                                        Ưu đãi mỗi cấp
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td
                                    className="text-white"
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0)', width: '200px' }}
                                >
                                    Tổng chi tiêu:
                                </td>
                                <td className="text-white" style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}>
                                    {userInfo.sum.toLocaleString('it-IT')} VNĐ
                                </td>
                            </tr>
                            <tr>
                                <td
                                    className="text-white"
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0)', width: '200px' }}
                                >
                                    Điểm tích lũy:
                                </td>
                                <td className="text-white" style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}>
                                    {userInfo.point} P
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                {showLevel && <DeatailLevel show={showLevel} handleClose={handleCloseLevel} />}
            </div>
        )
    );
};

export default Member;

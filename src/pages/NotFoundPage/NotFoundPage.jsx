import React from 'react';
import { Link } from 'react-router-dom';
import logo from '~/assets/images/CINETHU.png';

const NotFoundPage = () => {
    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            // style={{ backgroundColor: 'white', borderRadius: '10px' }}
        >
            <div
                style={{
                    width: '40%',
                    height: 'fit-content',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    padding: '50px',
                }}
            >
                <img src={logo} style={{ height: '100px', width: 'auto', cursor: 'pointer' }} alt="" />
                <h4>Không tìm thấy trang bạn yêu cầu!</h4>
                <p>
                    Trở về trang chủ <Link to={'/'}>tại đây</Link>.
                </p>
            </div>
        </div>
    );
};

export default NotFoundPage;

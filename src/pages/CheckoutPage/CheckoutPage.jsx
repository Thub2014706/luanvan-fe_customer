import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const CheckoutPage = () => {
    const location = useLocation();
    const timeOut = location.state?.timeOut ?? false;
    console.log(location.search);
    const params = new URLSearchParams(location.search);
    const orderId = params.get('orderId');
    
    window.history.replaceState(null, '', '/');
    // const [timeOut, setTimeout] = useState(lo)
    return (
        <Container>
            {timeOut ? (
                <p className="text-white mt-5">
                    Bạn đã đạt giới hạn thời gian đặt vé cho phép. Xin vui lòng đặt vé lại.
                </p>
            ) : orderId ? (
                <p>success</p>
            ) : (
                <p className="text-white mt-5">Bạn chưa đặt vé nào. Xin vui lòng đặt vé lại.</p>
            )}
        </Container>
    );
};

export default CheckoutPage;

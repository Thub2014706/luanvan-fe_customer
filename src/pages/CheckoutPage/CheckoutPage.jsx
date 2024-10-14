import React from 'react';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const CheckoutPage = () => {
    const location = useLocation();
    const timeOut = location.state?.timeOut ?? false;
    const combo = location.state?.combo ?? false;
    console.log(location.search);
    const params = new URLSearchParams(location.search);
    const orderId = params.get('orderId');
    const resultCode = params.get('resultCode');

    // window.history.replaceState(null, '', '/');
    // const [timeOut, setTimeout] = useState(lo)
    return (
        <Container>
            {timeOut ? (
                <p className="text-white mt-5">
                    Bạn đã đạt giới hạn thời gian đặt vé cho phép. Xin vui lòng đặt vé lại.
                </p>
            ) : orderId ? (
                resultCode === '0' ? (
                    <p className="text-white mt-5">
                        Thanh toán thành công. Hãy kiểm tra lại giao dịch trong tài khoản của bạn và vé phim trong email của
                        bạn.
                    </p>
                ) : (
                    <p className="text-white mt-5">Thanh toán không thành công. Xin vui lòng đặt lại.</p>
                )
            ) : combo ? (
                <p className="text-white mt-5">Bạn chưa bắp nước nào. Xin vui lòng đặt lại.</p>
            ) : (
                <p className="text-white mt-5">Bạn chưa đặt vé nào. Xin vui lòng đặt vé lại.</p>
            )}
        </Container>
    );
};

export default CheckoutPage;

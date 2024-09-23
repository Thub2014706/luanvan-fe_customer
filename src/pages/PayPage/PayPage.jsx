import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const PayPage = () => {
    const cartTicket = useSelector((state) => state.cart.cartTicket);
    console.log(cartTicket);

    return (
        <div>
            <Container className="py-5 text-white">
                <h2 className="text-white font-title text-center mb-5">THANH TOÁN</h2>
                <Row>
                    <Col xs={8}>
                        <div className="p-5 card-info-pay">
                            <h5 className="font-title">MÃ KHUYẾN MÃI</h5>
                            <h5 className="font-title">ĐIỂM THANH TOÁN</h5>
                            <p>Bạn có </p>
                            <Form.Control
                                type="number"
                                // value={point}
                                // disabled={
                                //     phone === '' ||
                                //     (phone !== '' && userInfo.point < 20000) ||
                                //     (phone !== '' && price < 20000)
                                //         ? true
                                //         : false
                                // }
                                // onChange={handlePoint}
                                placeholder="Sử dụng điểm thanh toán (tối thiểu 20000đ)"
                            />
                        </div>
                    </Col>
                    <Col xs={4}>
                        <div className="p-5">
                            <h5>Tổng cộng</h5>
                            <p>{cartTicket.price}</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default PayPage;

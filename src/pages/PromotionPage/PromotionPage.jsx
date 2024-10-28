import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { listDiscountFuture } from '~/services/DiscountService';

const PromotionPage = () => {
    const [listDis, setListDis] = useState([]);
    // const [select, setSelect] = useState();

    useEffect(() => {
        const fetch = async () => {
            const data = await listDiscountFuture();
            setListDis(data);
        };
        fetch();
    }, []);

    return (
        <div>
            <Container className="text-white py-5">
                <h1 className="font-title text-center mb-5">KHUYẾN MÃI</h1>
                <Row>
                    {listDis.length > 0 ? (
                        listDis.map((item) => (
                            <Col xs={12} sm={6} lg={4}>
                                <div className="p-4" style={{ border: '1px solid white', borderRadius: '10px' }}>
                                    <h1 className="font-title">{item.name}</h1>
                                    <ul>
                                        <li>Mã code: {item.code}</li>
                                        <li>Chiết khấu: {item.percent}</li>
                                        <li>
                                            Thời gian áp dụng: {moment(item.startDate).format('DD/MM/YYYY')} -{' '}
                                            {moment(item.endDate).format('DD/MM/YYYY')}
                                        </li>
                                        <li>Số lượng còn lại: {item.quantity}</li>
                                    </ul>
                                    <Link to={'/film'} className="button b1 text-decoration-none">
                                        ĐẶT VÉ NGAY
                                    </Link>
                                </div>
                            </Col>
                        ))
                    ) : (
                        <p>Chưa có khuyến mãi nào.</p>
                    )}
                </Row>
            </Container>
        </div>
    );
};

export default PromotionPage;

import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { allOrderByUser } from '~/services/OrderComboService';
import ImageBase from '../ImageBase/ImageBase';
import ModalDetailCombo from '../ModalDetailCombo/ModalDetailCombo';

const HistoryCombo = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [orders, setOrders] = useState([]);
    const [showDetail, setShowDetail] = useState(false);
    const [detail, setSetail] = useState();

    useEffect(() => {
        const fetch = async () => {
            const data = await allOrderByUser(user?.data.id);
            setOrders(data);
        };
        fetch();
    }, [user]);
    console.log(orders);

    const handleShowDetail = (item) => {
        setShowDetail(true);
        setSetail(item);
    };

    const handleCloseDetail = () => {
        setShowDetail(false);
        setSetail();
    };
    return (
        <div className='mt-5'>
            {orders.map((item) => (
                <div className="mb-5">
                    <h5>Mã vé: {item.item.idOrder}</h5>
                    <p>Rạp: {item.theater}</p>
                    <Row className="mb-5">
                        {item.combo.map((mini) => (
                            <Col>
                                <Row>
                                    <Col xs="auto">
                                        <ImageBase
                                            pathImg={mini.detail.image}
                                            style={{
                                                height: '100px',
                                                width: '100px',
                                                objectFit: 'cover',
                                                borderRadius: '5px',
                                                border: '1px solid gray',
                                            }}
                                        />
                                    </Col>
                                    <Col>
                                        <h4 className="font-title">
                                            {mini.quantity} {mini.name}
                                        </h4>
                                        {mini.foods &&
                                            mini.foods.map((min, index) => (
                                                <span>
                                                    {min.min.quantity} {min.nameFood.name}
                                                    {index < mini.foods.length - 1 && ', '}
                                                </span>
                                            ))}
                                        <p>{mini.price.toLocaleString('it-IT')} VNĐ</p>
                                    </Col>
                                </Row>
                            </Col>
                        ))}
                    </Row>
                    <p>
                        Tổng thanh toán:{' '}
                        <span style={{ color: '#f3ea28' }}>{item.item.price.toLocaleString('it-IT')} VNĐ</span>
                    </p>
                    <div className="button b1" onClick={() => handleShowDetail(item)}>
                        Chi tiết
                    </div>
                    <div className="button b2 ms-2">Vé</div>
                    <hr />
                </div>
            ))}
            {detail && <ModalDetailCombo show={showDetail} handleClose={handleCloseDetail} item={detail} />}
        </div>
    );
};

export default HistoryCombo;

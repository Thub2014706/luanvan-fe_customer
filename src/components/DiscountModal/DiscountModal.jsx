import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { listDiscount } from '~/services/DiscountService';
import { detailUserById } from '~/services/UserService';

const DiscountModal = ({ show, handleClose, selectDis, setSelectDis, price }) => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [userInfo, setUserInfo] = useState(null);
    const [listDis, setListDis] = useState([]);
    const [select, setSelect] = useState();
    // console.log(user);
    useEffect(() => {
        const fetch = async () => {
            const data = await detailUserById(user.data.id);
            setUserInfo(data);
        };
        fetch();
    }, [user]);

    useEffect(() => {
        const fetch = async () => {
            if (userInfo !== null) {
                const data = await listDiscount();
                data.sort((a, b) => {
                    const aValid = (a.level === 2 || a.level === userInfo.level - 1) && a.minium <= price;
                    const bValid = (b.level === 2 || b.level === userInfo.level - 1) && b.minium <= price;

                    return aValid === bValid ? 0 : aValid ? -1 : 1;
                });
                setListDis(data);
            }
        };
        fetch();
    }, [price, userInfo]);

    useEffect(() => {
        const fetch = async () => {
            if (selectDis) {
                setSelect(selectDis);
            } else {
                setSelect();
            }
        };
        fetch();
    }, [selectDis, show]);

    const handleSelect = (id) => {
        select !== id ? setSelect(id) : setSelect();
    };

    const handleSubmit = () => {
        setSelectDis(select);
        handleClose();
    };

    return (
        <Modal centered style={{ zIndex: 1000000 }} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <p className="font-title">CHỌN MÃ KHUYẾN MÃI</p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                {listDis.length > 0 ? (
                    listDis.map((item) => (
                        <Row>
                            <div style={{ position: 'relative', width: '100%' }}>
                                <Row
                                    className="card-dis d-flex align-items-center mt-3"
                                    style={{ cursor: 'pointer', position: 'relative' }}
                                    onClick={() =>
                                        !(
                                            (item.level !== 2 && item.level !== userInfo.level - 1) ||
                                            item.minium > price
                                        ) && handleSelect(item._id)
                                    }
                                >
                                    <Col xs={3} className="card-name-dis">
                                        <h5 className="font-title text-center">{item.name}</h5>
                                    </Col>
                                    <Col xs={8}>
                                        <p className="my-auto">
                                            Mã: <span className="fw-bold">{item.code}</span> <br />
                                            Chiết khấu: <span className="fw-bold">{item.percent}%</span> <br />
                                            HSD:{' '}
                                            <span className="fw-bold">
                                                {moment(item.endDate).format('DD/MM/YYYY')}
                                            </span>{' '}
                                            <br />
                                            Số lượng: <span className="fw-bold">{item.quantity - item.used}</span>
                                            {/* Điều kiện áp dụng: <span className="fw-bold">{item.quantity - item.used}</span> */}
                                        </p>
                                    </Col>
                                    <Col xs="auto">
                                        {select === item._id && (
                                            <FontAwesomeIcon icon={faCheck} color="green" size="lg" />
                                        )}
                                    </Col>
                                    {userInfo !== null &&
                                        ((item.level !== 2 && item.level !== userInfo.level - 1) ||
                                            item.minium > price) && (
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    backgroundColor: 'white',
                                                    opacity: 0.4,
                                                    zIndex: 10,
                                                    borderRadius: 5,
                                                    // pointerEvents: 'none',
                                                }}
                                            ></div>
                                        )}
                                </Row>
                                {userInfo !== null && (
                                    <p className="mb-0" style={{ color: 'red' }}>
                                        {item.level !== 2 && item.level !== userInfo.level - 1
                                            ? 'Cấp độ thẻ của bạn không thể áp dụng mã khuyến mãi này.'
                                            : item.minium > price &&
                                              'Tổng đơn hàng của bạn không đủ để áp dụng mã khuyến mãi này.'}
                                    </p>
                                )}
                            </div>
                        </Row>
                    ))
                ) : (
                    <h5 className="text-center">Không có mã khuyến mãi nào.</h5>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                {listDis.length > 0 && (
                    <Button variant="primary" onClick={handleSubmit}>
                        Chọn
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default DiscountModal;

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { listDiscount } from '~/services/DiscountService';

const DiscountModal = ({ show, handleClose, selectDis, setSelectDis }) => {
    const [listDis, setListDis] = useState([]);
    const [select, setSelect] = useState();

    useEffect(() => {
        const fetch = async () => {
            const data = await listDiscount();
            setListDis(data);
        };
        fetch();
    }, []);

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
                        <Row
                            className="card-dis d-flex align-items-center mb-3"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleSelect(item._id)}
                        >
                            <Col xs={3} className="card-name-dis">
                                <h5 className="font-title text-center">{item.name}</h5>
                            </Col>
                            <Col xs={8}>
                                <p className="my-auto">
                                    Mã: <span className="fw-bold">{item.code}</span> <br />
                                    Chiết khấu: <span className="fw-bold">{item.percent}%</span> <br />
                                    HSD: <span className="fw-bold">{moment(item.endDate).format('DD/MM/YYYY')}</span> <br />
                                    Số lượng: <span className="fw-bold">{item.quantity - item.used}</span>
                                </p>
                            </Col>
                            <Col xs="auto">
                                {select === item._id && <FontAwesomeIcon icon={faCheck} color="green" size="lg" />}
                            </Col>
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

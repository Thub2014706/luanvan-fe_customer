import React, { useEffect, useState } from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import Name from '../Name/Name';
import moment from 'moment';
import { signAge, standardAge } from '~/constants';
import Barcode from 'react-barcode';
import { detailTheater } from '~/services/TheaterService';
import { detailStaff } from '~/services/StaffService';

const TicketModal = ({ show, handleClose, order }) => {
    const [theater, setTheater] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            if (order !== null) {
                const data1 = order.showTime
                    ? await detailTheater(order.showTime.theater)
                    : await detailTheater(order.item.theater);
                setTheater(data1);
            }
        };
        fetch();
    }, [order]);

    console.log(order);

    return (
        <div>
            <Modal centered show={show} onHide={handleClose} style={{ zIndex: 10000000 }}>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Ưu đãi mỗi cấp</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>
                    <div
                        // ref={componentRef}
                        className="d-flex flex-column align-items-center justify-content-center"
                        style={{
                            margin: 'auto',
                            padding: '30px',
                            fontFamily: 'Courier New, monospace',
                            width: '400px',
                            // height: '700px',
                        }}
                    >
                        <h4 className="fw-bold text-center">
                            THE VAO
                            <br /> PHONG CHIEU PHIM
                        </h4>
                        {order !== null && theater !== null && (
                            <div>
                                <p className="fw-bold">
                                    {theater.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}
                                </p>
                                <p>
                                    {theater.address.normalize('NFD').replace(/[\u0300-\u036f]/g, '')},{' '}
                                    {theater.ward.normalize('NFD').replace(/[\u0300-\u036f]/g, '')},{' '}
                                    {theater.district.normalize('NFD').replace(/[\u0300-\u036f]/g, '')} ,{' '}
                                    {theater.province.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}
                                </p>
                                {order.item.staff && (
                                    <p>
                                        Nhan vien:{' '}
                                        <Name
                                            id={order.item.staff.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}
                                            detail={detailStaff}
                                        />
                                    </p>
                                )}
                                {order.showTime && (
                                    <>
                                        <p>==========================================</p>
                                        <p>
                                            <span className="fw-bold fs-4 me-1">
                                                {order.film.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}{' '}
                                            </span>
                                            <span>
                                                [
                                                {standardAge.map(
                                                    (item, index) => item === order.film.age && signAge[index],
                                                )}
                                                ]
                                            </span>
                                        </p>
                                        <p>
                                            <span>{moment(order.showTime.date).format('DD/MM/YYYY')}</span>
                                            <span className="ms-5">
                                                {order.showTime.timeStart} - {order.showTime.timeEnd}
                                            </span>
                                        </p>
                                        <p>
                                            <span className="me-5 fw-bold">
                                                {order.room.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}
                                            </span>
                                            <span className="fw-bold">
                                                {order.seats
                                                    ?.map((item) => `${String.fromCharCode(64 + item.row)}${item.col}`)
                                                    .join(', ')}
                                            </span>
                                            <span className="ms-5">
                                                {order.seats[0].type.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}
                                            </span>
                                        </p>
                                    </>
                                )}
                                {order.item.combo.length > 0 && (
                                    <>
                                        <p>------------------------------------------</p>
                                        <p>
                                            Combo:
                                            {order.item.combo.map((item) => (
                                                <p className="text-end fw-bold">
                                                    <span className="ms-5">{item.name}</span>
                                                    <span className="ms-5">x {item.quantity}</span>
                                                </p>
                                            ))}
                                        </p>
                                    </>
                                )}
                                <p>==========================================</p>
                                {(order.item.usePoint > 0 ||
                                    (order.item.discount && order.item.discount.useDiscount > 0)) && (
                                    <Row className="fs-5">
                                        <Col xs={6}>
                                            <span className="float-end">Tong</span>
                                        </Col>
                                        <Col xs={2}>
                                            <span className="float-end">VND</span>
                                        </Col>
                                        <Col xs={4}>
                                            <span className="float-end">
                                                {(
                                                    order.item.price +
                                                    order.item.usePoint +
                                                    order.item.discount.useDiscount
                                                ).toLocaleString('it-IT')}
                                            </span>
                                        </Col>
                                    </Row>
                                )}
                                {order.item.usePoint > 0 && (
                                    <Row className="fs-5">
                                        <Col xs={6}>
                                            <span className="float-end">Diem thanh toan</span>
                                        </Col>
                                        <Col xs={2}>
                                            <span className="float-end">VND</span>
                                        </Col>
                                        <Col xs={4}>
                                            <span className="float-end">
                                                -{order.item.usePoint.toLocaleString('it-IT')}
                                            </span>
                                        </Col>
                                    </Row>
                                )}
                                {order.item.discount && order.item.discount.useDiscount > 0 && (
                                    <Row className="fs-5">
                                        <Col xs={6}>
                                            <span className="float-end">Ma khuyen mai</span>
                                        </Col>
                                        <Col xs={2}>
                                            <span className="float-end">VND</span>
                                        </Col>
                                        <Col xs={4}>
                                            <span className="float-end">
                                                -{order.item.discount.useDiscount.toLocaleString('it-IT')}
                                            </span>
                                        </Col>
                                    </Row>
                                )}
                                <Row className="fw-bold fs-5">
                                    <Col xs={6}>
                                        <span className="float-end">Tong thanh toan</span>
                                    </Col>
                                    <Col xs={2}>
                                        <span className="float-end">VND</span>
                                    </Col>
                                    <Col xs={4}>
                                        <span className="float-end">{order.item.price.toLocaleString('it-IT')}</span>
                                    </Col>
                                </Row>
                                <div className="justify-content-center d-flex">
                                    <Barcode
                                        value={order.item.idOrder}
                                        height={50}
                                        width={1}
                                        fontSize={10}
                                        fontOptions="Courier New, monospace"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default TicketModal;

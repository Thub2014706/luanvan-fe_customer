import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Barcode from 'react-barcode';
import { Modal, Table } from 'react-bootstrap';
import { ticketRefundByOrder } from '~/services/TicketRefundService';
import Name from '../Name/Name';
import { detailStaff } from '~/services/StaffService';

const ModalDetailTicket = ({ show, handleClose, item, handleShowRefund, status }) => {
    const [refund, setRefund] = useState();

    useEffect(() => {
        const fetch = async () => {
            if (status === 2) {
                const data = await ticketRefundByOrder(item.item._id);
                setRefund(data);
            }
        };
        fetch();
    });

    return (
        <div>
            <Modal style={{ zIndex: 1000000 }} size="lg" centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Mã vé: {item.item.idOrder}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="justify-content-center d-flex">
                        <Barcode
                            value={item.item.idOrder}
                            height={50}
                            width={1}
                            fontSize={10}
                            fontOptions="Courier New, monospace"
                        />
                    </div>
                    <p>Thời gian đặt vé: {moment(item.item.createdAt).format('HH:mm DD/MM/YYYY')}</p>
                    <p>Hình thức đặt vé: {item.item.staff ? 'Đặt vé tại rạp' : 'Đặt vé online'}</p>
                    {item.item.staff && (
                        <p>
                            Nhân viên đặt vé: <Name id={item.item.staff} detail={detailStaff} />
                        </p>
                    )}
                    <p>
                        Trạng thái:{' '}
                        {status === 1 ? (
                            <span style={{ color: 'green' }}>Đã hoàn tất</span>
                        ) : (
                            <span style={{ color: 'red' }}>
                                Đã hoàn vé ({refund && moment(refund.createdAt).format('HH:mm DD/MM/YYYY')})
                            </span>
                        )}
                    </p>
                    <Table bordered className="text-center">
                        <thead>
                            <tr>
                                <th>PHIM</th>
                                <th>SUẤT CHIẾU</th>
                                {item.item.combo.length > 0 && <th>COMBO BẮP NƯỚC</th>}
                                <th>TỔNG THANH TOÁN</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="align-middle">{item.film.name.toUpperCase()}</td>
                                <td>
                                    <p>
                                        <span className="fw-bold">Rạp: {item.theater}</span> <br />
                                        Phòng: {item.room.name} ({item.room.type})
                                        <br />
                                        Ghế:{' '}
                                        {item.seats.map((mini, index) => (
                                            <span>
                                                {String.fromCharCode(64 + mini.row)}
                                                {mini.col}
                                                {index < item.seats.length - 1 && ', '}
                                            </span>
                                        ))}
                                        <br />
                                        {moment(item.showTime.date).format('DD/MM/YYYY')}
                                        <br />
                                        {item.showTime.timeStart} - {item.showTime.timeEnd}
                                    </p>
                                </td>
                                {item.item.combo.length > 0 && (
                                    <td className="align-middle">
                                        {item.item.combo.map((mini) => (
                                            <span>
                                                {mini.quantity} {mini.name.toUpperCase()}
                                                <br />
                                            </span>
                                        ))}
                                    </td>
                                )}
                                <td className="align-middle">
                                    {(item.item.usePoint > 0 || item.item.discount) && (
                                        <p>
                                            Tổng:{' '}
                                            {(
                                                item.item.usePoint +
                                                (item.item.discount ? item.item.discount.useDiscount : 0) +
                                                item.item.price
                                            ).toLocaleString('it-IT')}{' '}
                                            VNĐ
                                        </p>
                                    )}
                                    {item.item.usePoint > 0 && (
                                        <p>Điểm thanh toán: -{item.item.usePoint.toLocaleString('it-IT')} VNĐ</p>
                                    )}
                                    {item.item.discount && (
                                        <p>
                                            Mã khuyến mãi: -{item.item.discount.useDiscount.toLocaleString('it-IT')} VNĐ
                                        </p>
                                    )}
                                    <p className="fw-bold">
                                        Tổng thanh toán: {item.item.price.toLocaleString('it-IT')} VNĐ
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    {status === 1 && (
                        <div
                            className="text-danger text-decoration-underline"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleShowRefund(item.item._id)}
                        >
                            YÊU CẦU HOÀN VÉ
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ModalDetailTicket;

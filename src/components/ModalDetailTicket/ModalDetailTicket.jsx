import moment from 'moment';
import React from 'react';
import Barcode from 'react-barcode';
import { Modal, Table } from 'react-bootstrap';

const ModalDetailTicket = ({ show, handleClose, item }) => {
    return (
        <Modal size="lg" centered show={show} onHide={handleClose}>
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
                <p>Ngày đặt vé: {moment(item.item.createdAt).format('HH:mm DD/MM/YYYY')}</p>
                <p>Hình thức đặt vé: {item.item.staff ? 'Đặt vé tại rạp' : 'Đặt vé online'}</p>
                <Table bordered className="text-center">
                    <thead>
                        <tr>
                            <th>PHIM</th>
                            <th>SUẤT CHIẾU</th>
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
                                    {moment(item.showTime.data).format('DD/MM/YYYY')}
                                    <br />
                                    {item.showTime.timeStart} - {item.showTime.timeEnd}
                                </p>
                            </td>
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
                                    <p>Mã khuyến mãi: -{item.item.discount.useDiscount.toLocaleString('it-IT')} VNĐ</p>
                                )}
                                <p className="fw-bold">
                                    Tổng thanh toán: {item.item.price.toLocaleString('it-IT')} VNĐ
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    );
};

export default ModalDetailTicket;

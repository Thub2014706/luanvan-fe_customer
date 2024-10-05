import moment from 'moment';
import React from 'react';
import Barcode from 'react-barcode';
import { Modal, Table } from 'react-bootstrap';

const ModalDetailCombo = ({ show, handleClose, item }) => {
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
                <p>Ngày đặt: {moment(item.item.createdAt).format('HH:mm DD/MM/YYYY')}</p>
                <p>Hình thức đặt: {item.item.staff ? 'Đặt tại rạp' : 'Đặt online'}</p>
                <Table bordered className="text-center">
                    <thead>
                        <tr>
                            <th>TÊN</th>
                            <th>CHI TIẾT</th>
                            <th>RẠP</th>
                            <th>GIÁ</th>
                            <th>TỔNG THANH TOÁN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {item.combo.map((mini, index) => (
                            <tr className="align-middle">
                                <td>{mini.quantity} {mini.detail.name.toUpperCase()}</td>
                                <td>
                                    {mini.foods &&
                                        mini.foods.map((min, index) => (
                                            <span>
                                                {min.min.quantity} {min.nameFood.name}
                                                <br />
                                            </span>
                                        ))}
                                </td>
                                <td>{item.theater}</td>
                                <td>{mini.price.toLocaleString('it-IT')} VNĐ</td>
                                {index === 0 && (
                                    <td rowSpan={item.combo.length + 1} className="align-middle">
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
                                                Mã khuyến mãi: -{item.item.discount.useDiscount.toLocaleString('it-IT')}{' '}
                                                VNĐ
                                            </p>
                                        )}
                                        <p className="fw-bold">
                                            Tổng thanh toán: {item.item.price.toLocaleString('it-IT')} VNĐ
                                        </p>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    );
};

export default ModalDetailCombo;

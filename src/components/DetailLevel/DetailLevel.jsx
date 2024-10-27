import React from 'react';
import { Modal, Table } from 'react-bootstrap';

const DeatailLevel = ({ show, handleClose }) => {
    return (
        <Modal centered size="lg" show={show} onHide={handleClose} style={{ zIndex: 10000000 }}>
            <Modal.Header closeButton>
                <Modal.Title>Ưu đãi mỗi cấp</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ height: '80vh', overflowY: 'auto' }}>
                <div>
                    <h5 className="fw-bold">Chương trình điểm thưởng</h5>
                    <p>
                        Chương trình bao gồm 2 cấp độ là Member và VIP, với những quyền lợi và mức ưu đãi khác nhau. Mỗi
                        khi thực hiện giao dịch tại hệ thống rạp CineThu, bạn sẽ nhận được một số điểm thưởng tương ứng
                        với cấp độ:
                    </p>
                    <Table bordered striped>
                        <thead>
                            <tr>
                                <th>Điểm thưởng</th>
                                <th>Member</th>
                                <th>VIP</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="fw-bold">
                                <td>Tại quầy vé</td>
                                <td>5%</td>
                                <td>7%</td>
                            </tr>
                            <tr>
                                <td>VD: 100.000 VNĐ</td>
                                <td>5000 điểm</td>
                                <td>7000 điểm</td>
                            </tr>
                            <tr className="fw-bold">
                                <td>Quầy bắp nước</td>
                                <td>3%</td>
                                <td>4%</td>
                            </tr>
                            <tr>
                                <td>VD: 100.000 VNĐ</td>
                                <td>3000 điểm</td>
                                <td>4000 điểm</td>
                            </tr>
                        </tbody>
                    </Table>
                    <p className="mb-0">
                        1000 điểm = 1.000 VNĐ, có giá trị như tiền mặt, được dùng để mua vé xem phim, thức uống/ combo
                        tương ứng tại CineThu. Ví dụ: Với giao dịch mua vé giá 100.000 VNĐ bạn có thể:
                    </p>
                    <ul>
                        <li>Thanh toán 80.000 VNĐ + 20000 điểm thưởng</li>
                        <li>Thanh toán với 10.000 VNĐ + 90000 điểm thưởng</li>
                    </ul>
                    <b>Cách làm tròn điểm thưởng:</b>
                    <ul>
                        <li>
                            Từ 1 đến 499: làm tròn xuống (Ví dụ: 3200 điểm sẽ được tích vào tài khoản 3000 điểm). Lưu ý:
                            giao dịch có điểm tích lũy từ 1 đến 499 sẽ không được tích lũy điểm do làm tròn xuống 0, và
                            đồng nghĩa với không được tích lũy chi tiêu.
                        </li>
                        <li>Từ 500 đến 999: làm tròn lên (Ví dụ: 3600 điểm sẽ được tích vào tài khoản 4000 điểm)</li>
                    </ul>
                </div>
                <div>
                    <h5 className="fw-bold">Chương trình hoàn vé</h5>
                    <p className="mb-0">Chỉ áp dụng cho khách hàng đặt vé qua trang web của CineThu.</p>
                    <p className="mb-0">Số lần hoàn vé cho phép trong tháng:</p>
                    <ul>
                        <li>Thành viên Member: 2 lượt </li>
                        <li>Thành viên VIP: 3 lượt</li>
                    </ul>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default DeatailLevel;

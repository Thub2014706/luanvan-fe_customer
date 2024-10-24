import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { addTicketRefund } from '~/services/TicketRefundService';

const ModalTicketRefund = ({ show, handleClose, idRefund }) => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const handleSubmit = async () => {
        if (window.confirm('Bạn có chắc muốn hoàn vé này?') === true) {
            if (await addTicketRefund({ order: idRefund, user: user?.data.id })) {
                handleClose();
            }
        }
    };
    // console.log(idRefund);

    return (
        <Modal centered show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Hoàn vé</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Điều kiện và điều khoản</h5>
                <ul style={{ listStyleType: 'circle' }}>
                    <li>Bạn chỉ có thể hoàn vé tối đa 2 lần/tháng nếu ở cấp độ Member hoặc 5 lần/tháng nếu ở cấp độ VIP. </li>
                    <li>Bạn có thể yêu cầu hoàn vé trước 60 PHÚT suất chiếu diễn ra.</li>
                    <li>Giao dịch có sử dụng khuyến mãi sẽ không được hoàn vé.</li>
                    <li>Giao dịch có sử dụng điểm thưởng sẽ được hoàn lại tương ứng.</li>
                    <li>Không hỗ trợ hoàn vé đối với các giao dịch đã được in vé tại rạp.</li>
                    <li>Số tiền đã thanh toán sẽ được hoàn lại tương ứng vào số điểm.</li>
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="danger" onClick={() => handleSubmit()}>
                    Gửi yêu cầu
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalTicketRefund;

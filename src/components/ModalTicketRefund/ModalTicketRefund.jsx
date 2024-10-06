import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ModalTicketRefund = ({show, handleClose}) => {
    const handleSubmit = () => {
        
    }
    return (
        <Modal  centered show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Hoàn vé</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Điều kiện và điều khoản</h5>
                <ul style={{listStyleType: 'circle'}}>
                    <li>Bạn có thể yêu cầu hoàn vé trước 60 PHÚT suất chiếu diễn ra.</li>
                    <li>Giao dịch có sử dụng khuyến mãi sẽ không được hoàn vé.</li>
                    <li>Giao dịch có sử dụng điểm thưởng sẽ được hoàn lại tương ứng.</li>
                    <li>Không hỗ trợ hoàn vé đối với các giao dịch đã được in vé tại rạp.</li>
                    <li>Số tiền đã thanh toán sẽ được hoàn lại tương ứng vào số điểm.</li>
                </ul>
            </Modal.Body>
            <Modal.Footer>
            <Button variant='secondary'>
                    Đóng
                </Button>
                <Button variant='danger' onClick={() => handleSubmit()}>
                    Gửi yêu cầu
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalTicketRefund;

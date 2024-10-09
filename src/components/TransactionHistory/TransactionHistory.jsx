import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import HistoryTicket from '../HistoryTicket/HistoryTicket';
import HistoryCombo from '../HistoryCombo/HistoryCombo';

const TransactionHistory = () => {
    const [step, setStep] = useState(1);

    const renderStep = (step) => {
        switch (step) {
            case 1:
                return <HistoryTicket />;
            case 2:
                return <HistoryCombo />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-info-user">
            <h1 className="font-title mb-5">LỊCH SỬ GIAO DỊCH</h1>
            {/* <div className='font-title'>VÉ PHIM</div> */}
            <div className="mb-1">
                <Row>
                    <Col
                        xs="auto"
                        className={`line-button px-5 ${step === 1 ? 'yes' : 'no'}`}
                        onClick={() => setStep(1)}
                    >
                        <div className="font-title h5">VÉ PHIM</div>
                    </Col>
                    <Col
                        xs="auto"
                        className={`line-button px-5 ${step === 2 ? 'yes' : 'no'}`}
                        onClick={() => setStep(2)}
                    >
                        <div className="font-title h5">BẮP NƯỚC</div>
                    </Col>
                    <Col className="line-bottom">{/* <div></div> */}</Col>
                </Row>
            </div>
            <div>{renderStep(step)}</div>
        </div>
    );
};

export default TransactionHistory;

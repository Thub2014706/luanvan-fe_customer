import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import InfoAccount from '~/components/InfoAccount/InfoAccount';
import Member from '~/components/Member/Member';
import TransactionHistory from '~/components/TransactionHistory/TransactionHistory';

const AccountPage = () => {
    const [step, setStep] = useState(1);

    const renderStep = (step) => {
        switch (step) {
            case 1:
                return <InfoAccount />;
            case 2:
                return <Member />;
            case 3:
                return <TransactionHistory />;
            default:
                return null;
        }
    };

    return (
        <div>
            <Container className="py-5 text-white">
                <Row>
                    <Col xs={3}>
                        {['Thông tin chung', 'Thành viên', 'Lịch sử giao dịch'].map((item, index) => (
                            <div
                                onClick={() => setStep(index + 1)}
                                className={`p-3 text-center menu-user ${index !== 0 && 'mt-3'} ${
                                    index === step - 1 && 'line'
                                }`}
                            >
                                <h5 className="font-title">{item}</h5>
                            </div>
                        ))}
                    </Col>
                    <Col xs={9}>{renderStep(step)}</Col>
                </Row>
            </Container>
        </div>
    );
};

export default AccountPage;

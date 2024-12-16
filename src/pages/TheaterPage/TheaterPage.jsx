import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { detailTheater } from '~/services/TheaterService';
import SelectSchedule from '~/components/SelectSchesule/SelectSchedule';
import TablePrice from '~/components/TablePrice/TablePrice';
import img1 from '~/assets/images/ic-branch-map.svg';
import ImageBase from '~/components/ImageBase/ImageBase';
import { ToastContainer } from 'react-toastify';

const TheaterPage = () => {
    const [theater, setTheater] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        const fetch = async () => {
            const data = await detailTheater(id);
            setTheater(data);
        };
        fetch();
    }, [id]);

    const [step, setStep] = useState(1);

    const renderDiv = (step) => {
        switch (step) {
            case 1:
                return <SelectSchedule />;
            // case 2:
            //     return <SelectShowTime />;
            case 2:
                return <TablePrice />;
            default:
                return null;
        }
    };

    return (
        <div>
            <ToastContainer style={{ zIndex: 1000000000000 }} />

            {theater !== null && (
                <Container className="text-white">
                    <div className="theater-title1 d-flex align-items-center">
                        <div>
                            <ImageBase
                                pathImg={theater.image}
                                style={{
                                    width: 'auto',
                                    height: '170px',
                                    objectFit: 'cover',
                                }}
                            />
                        </div>
                        <div>
                            <h1 className="font-title ms-5" style={{ fontSize: '3.5rem' }}>
                                {theater.name.toUpperCase()}
                            </h1>
                            <div className="ms-5">
                                <img className="mb-1" src={img1} alt="" />
                                <span className="ms-2 mb-0">
                                    {theater.address}, {theater.ward}, {theater.district}, {theater.province}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="theater-title2" style={{ position: 'sticky', top: '135px' }}>
                        <Row className="font-title">
                            {['LỊCH CHIẾU PHIM', 'BẢNG GIÁ VÉ'].map((item, index) => (
                                <Col onClick={() => setStep(index + 1)}>
                                    <div className={`theater-show ${step === index + 1 && 'select'}`}>
                                        <h5 className="text-center my-4">{item}</h5>
                                    </div>
                                </Col>
                            ))}
                            {/* <Col onClick={() => setStep(2)}>
                                <h5 className="text-center my-4">VỊ TRÍ CỦA RẠP</h5>
                            </Col>
                            <Col onClick={() => setStep(3)}>
                                <h5 className="text-center my-4">BẢNG GIÁ VÉ</h5>
                            </Col> */}
                        </Row>
                    </div>
                    <div>{renderDiv(step)}</div>
                </Container>
            )}
        </div>
    );
};

export default TheaterPage;

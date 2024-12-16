import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import img1 from '~/assets/images/Tru_o_ng_Sa_1.png';

const IntroducePage = () => {
    return (
        <div>
                <ToastContainer style={{ zIndex: 1000000000000 }} />

            <Container className="text-white">
                <div className="intro" style={{ position: 'relative' }}>
                    {/* <img src={img1} height={430} alt="" /> */}
                </div>
                <div
                    style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        width: '60%',
                        textAlign: 'center',
                    }}
                >
                    <h1 className="font-title mb-4">HỆ THỐNG CỤM RẠP TRÊN TOÀN QUỐC</h1>
                    <p>
                        CineThu là một trong những hệ thống rạp chiếu phim được yêu thích nhất tại Việt Nam, cung cấp
                        nhiều mô hình giải trí hấp dẫn bao gồm Các Cụm Rạp Chiếu Phim hiện đại, Nhà hát, Khu vui chơi
                        trẻ em Kidzone, Bowling, Billiards, Games, Phòng Gym, Nhà Hàng, và Phố Bia C'Beer. Với mục tiêu
                        trở thành điểm đến giải trí cho mọi gia đình Việt Nam, Cinestar đang được biết đến là cụm rạp
                        ủng hộ phim Việt, góp phần phát triển điện ảnh Việt. Không chỉ chiếu các bộ phim bom tấn quốc
                        tế, Cinestar còn đồng hành cùng các nhà làm phim Việt Nam, đưa những tác phẩm điện ảnh đặc sắc
                        của Việt Nam đến gần hơn với khán giả.
                    </p>
                </div>
                <div style={{ marginTop: '100px' }}>
                    <h1 className="font-title text-center">SỨ MỆNH</h1>
                    <Row className="mt-5">
                        <Col>
                            <div
                                className="text-center"
                                style={{ borderRadius: '10px', backgroundColor: '#355ebe', padding: '30px' }}
                            >
                                <h2 className="fw-bold" style={{ color: '#f3ea28' }}>
                                    01
                                </h2>
                                <p>Góp phần tăng trưởng thị phần điện ảnh, văn hóa, giải trí của người Việt Nam.</p>
                            </div>
                        </Col>
                        <Col>
                            <div
                                className="text-center"
                                style={{ borderRadius: '10px', backgroundColor: '#355ebe', padding: '30px' }}
                            >
                                <h2 className="fw-bold" style={{ color: '#f3ea28' }}>
                                    02
                                </h2>
                                <p>
                                    Phát triển dịch vụ xuất sắc với mức giá tối ưu, phù hợp với thu nhập người Việt Nam.
                                </p>
                            </div>
                        </Col>
                        <Col>
                            <div
                                className="text-center"
                                style={{ borderRadius: '10px', backgroundColor: '#355ebe', padding: '30px' }}
                            >
                                <h2 className="fw-bold" style={{ color: '#f3ea28' }}>
                                    03
                                </h2>
                                <p>Mang nghệ thuật điện ảnh, văn hóa Việt Nam hội nhập quốc tế.</p>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div style={{ marginTop: '100px' }}>
                    <h1 className="font-title text-center">HỆ THỐNG CÁC CỤM RẠP</h1>
                    <p className="text-center mt-5 mx-auto w-50">
                        Các phòng chiếu được trang bị các thiết bị tiên tiến như hệ thống âm thanh vòm, màn hình rộng và
                        độ phân giải cao, tạo nên hình ảnh sắc nét và âm thanh sống động.
                    </p>
                    <img className="mx-auto d-block" src={img1} height={1000} alt="" />
                </div>
            </Container>
        </div>
    );
};

export default IntroducePage;

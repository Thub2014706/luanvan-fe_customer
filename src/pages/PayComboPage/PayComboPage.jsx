import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import DiscountModal from '~/components/DiscountModal/DiscountModal';
import { showToast } from '~/constants';
import { momoPaymentCombo } from '~/services/MomoService';
import { detailUserById } from '~/services/UserService';
import { addOrderCombo } from '../../services/OrderComboService';
import { detailDiscount } from '~/services/DiscountService';

const PayComboPage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [detailUser, setDetailUser] = useState(null);
    const [showDis, setShowDis] = useState(false);
    const [selectDis, setSelectDis] = useState();
    const [detailDis, setDetailDis] = useState();
    const [point, setPoint] = useState(0);
    const timeoutRef = useRef(null);

    const [usePoint, setUsePoint] = useState(0);
    const cartCombo = useSelector((state) => state.cart.cartCombo);
    const [price, setPrice] = useState(cartCombo.price);

    useEffect(() => {
        const fetch = async () => {
            const data = await detailUserById(user?.data.id);
            setDetailUser(data);
        };
        fetch();
    }, [user]);

    useEffect(() => {
        const fetch = async () => {
            setPrice(cartCombo.price - usePoint - (detailDis ? cartCombo.price * (detailDis.percent / 100) : 0));
        };
        fetch();
    }, [cartCombo.price, detailDis, usePoint]);

    useEffect(() => {
        const fetch = async () => {
            if (selectDis) {
                setUsePoint(0);
                setPoint(0);
                const data = await detailDiscount(selectDis);
                setDetailDis(data);
            } else {
                setDetailDis();
            }
        };
        fetch();
    }, [selectDis]);

    const handleShowDiscount = () => {
        setShowDis(true);
    };

    const handleCloseDiscount = () => {
        setShowDis(false);
    };

    const handlePoint = (e) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        const value = Number(e.target.value);

        setPoint(value);
        timeoutRef.current = setTimeout(() => {
            if (value < 20000 && value > 0) {
                showToast('Điểm thanh toán phải tối thiểu 20.000đ', 'warning');
            } else if (value > detailUser.point) {
                showToast('Điểm thanh toán đã vượt quá số điểm của bạn', 'warning');
            } else if (value > cartCombo.price * (detailDis ? 1 - detailDis?.percent / 100 : 1) * 0.9) {
                showToast('Điểm thanh toán đã vượt quá 90% số tiền thanh toán', 'warning');
            } else setUsePoint(value);
        }, 700);
    };

    const handleMax = () => {
        setPoint((cartCombo.price - (detailDis ? cartCombo.price * (detailDis.percent / 100) : 0)) * 0.9);
        setUsePoint((cartCombo.price - (detailDis ? cartCombo.price * (detailDis.percent / 100) : 0)) * 0.9);
    };

    const handlePay = async () => {
        if (point < 20000 && point > 0) {
            showToast('Điểm thanh toán phải tối thiểu 20.000đ', 'warning');
        } else if (point > detailUser.point) {
            showToast('Điểm thanh toán đã vượt quá số điểm của bạn', 'warning');
        } else if (point > cartCombo.price * (detailDis ? 1 - detailDis?.percent / 100 : 1) * 0.9) {
            showToast('Điểm thanh toán đã vượt quá 90% số tiền thanh toán', 'warning');
        } else {
            const data = await momoPaymentCombo({
                amount: price,
            });
            let discount;
            if (selectDis) {
                discount = { id: selectDis, useDiscount: (cartCombo.price - usePoint) * (detailDis.percent / 100) };
            }

            await addOrderCombo(
                {
                    idOrder: data.orderId,
                    price,
                    theater: cartCombo.theater,
                    discount,
                    paymentMethod: 'momo',
                    member: user?.data.id,
                    combo: cartCombo.combos,
                    usePoint,
                },
                user?.accessToken,
            );
            window.location.href = data.payUrl;
        }
    };

    return (
        <div>
            <Container className="py-5 text-white">
                <h2 className="text-white font-title text-center mb-5">THANH TOÁN</h2>
                <Row>
                    <Col xs={8}>
                        <div className="p-5 card-info-pay">
                            <div>
                                <h5 className="font-title">MÃ KHUYẾN MÃI</h5>
                                {detailDis && <p>Mã code: {detailDis.code}</p>}
                                <div className="button b1" onClick={handleShowDiscount}>
                                    Chọn mã khuyến mãi
                                </div>
                            </div>
                            <div className="mt-4">
                                <h5 className="font-title">ĐIỂM THANH TOÁN</h5>
                                {detailUser !== null && <p>Bạn có {detailUser.point} điểm tích lũy</p>}
                                {detailUser?.point >= 20000 &&
                                    cartCombo.price * (detailDis ? 1 - detailDis?.percent / 100 : 1) * 0.9 >= 20000 && (
                                        <div className="button b1 mb-4" onClick={handleMax}>
                                            Sử dụng tối đa điểm
                                        </div>
                                    )}
                                <Form.Control
                                    type="number"
                                    value={point > 0 ? point : ''}
                                    disabled={
                                        detailUser?.point < 20000 ||
                                        cartCombo.price * (detailDis ? 1 - detailDis?.percent / 100 : 1) * 0.9 < 20000
                                            ? true
                                            : false
                                    }
                                    onChange={handlePoint}
                                    placeholder="Sử dụng điểm thanh toán (tối thiểu 20.000đ)"
                                />
                            </div>
                        </div>
                    </Col>
                    <Col xs={4}>
                        <div className="p-5 card-pay">
                            <div className="d-flex justify-content-between">
                                <span>Tổng cộng</span>
                                <span>{cartCombo.price.toLocaleString('it-IT')} VNĐ</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Mã khuyến mãi</span>
                                <span>
                                    {detailDis
                                        ? `- ${(cartCombo.price * (detailDis.percent / 100)).toLocaleString('it-IT')}`
                                        : 0}{' '}
                                    VNĐ
                                </span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Điểm tích lũy</span>
                                <span>{usePoint > 0 ? `- ${usePoint.toLocaleString('it-IT')}` : 0} VNĐ</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <h5>Tổng thanh toán</h5>
                                <h5>{price.toLocaleString('it-IT')} VNĐ</h5>
                            </div>
                            <div
                                className="text-center h5 mt-5"
                                style={{
                                    borderRadius: '5px',
                                    padding: '10px',
                                    backgroundColor: 'white',
                                    color: '#663399',
                                    cursor: 'pointer',
                                }}
                                onClick={handlePay}
                            >
                                Thanh toán với Momo
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <DiscountModal
                show={showDis}
                handleClose={handleCloseDiscount}
                selectDis={selectDis}
                setSelectDis={(value) => setSelectDis(value)}
            />
        </div>
    );
};

export default PayComboPage;

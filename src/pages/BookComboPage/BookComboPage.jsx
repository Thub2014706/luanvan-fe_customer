import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ComboItem from '~/components/ComboItem/ComboItem';
import Name from '~/components/Name/Name';
import { showToast } from '~/constants';
import { cartComboValue, clearAllCombo } from '~/features/cart/cartSlice';
import { listCombo } from '~/services/ComboService';
import { listFood } from '~/services/FoodService';
import { detailTheater, listTheater } from '~/services/TheaterService';

const BookComboPage = () => {
    const [theaters, setTheaters] = useState([]);
    const [theater, setTheater] = useState();
    const [combo, setCombo] = useState([]);
    const [selectCombo, setSelectCombo] = useState([]);
    const [food, setFood] = useState([]);
    const [selectFood, setSelectFood] = useState([]);
    const [select, setSelect] = useState();
    const [price, setPrice] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            dispatch(clearAllCombo());
        };
        fetch();
    }, [dispatch]);

    useEffect(() => {
        const fetch = async () => {
            const data = await listTheater();
            setTheaters(data);
            setTheater(data[0]._id);
        };
        fetch();
    }, []);

    useEffect(() => {
        const fetch = async () => {
            const data1 = await listCombo();
            setCombo(data1);
            setSelectCombo(
                data1.map((item) => {
                    return {
                        id: item._id,
                        name: item.name,
                        price: item.price,
                        quantity: 0,
                    };
                }),
            );
            const data2 = await listFood();
            setFood(data2);
            setSelectFood(
                data2.map((item) => {
                    return {
                        id: item._id,
                        name: item.name,
                        price: item.price,
                        quantity: 0,
                    };
                }),
            );
        };
        fetch();
    }, []);

    useEffect(() => {
        const fetch = () => {
            const combos = selectCombo.filter((item) => item.quantity > 0);
            const foods = selectFood.filter((item) => item.quantity > 0);
            const data = [...combos, ...foods];
            const sum = data.reduce(
                (accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity,
                0,
            );
            setSelect(data);
            setPrice(sum);
            // dispatch(addCart({ combo: data, price: sum }));
        };
        fetch();
    }, [selectCombo, selectFood, setSelect]);

    const handleValue = (e, index, check) => {
        let copy = check === 'combo' ? [...selectCombo] : [...selectFood];
        const updated = {
            ...copy[index],
            quantity: e.target.value >= 0 ? Number(e.target.value) : 0,
        };
        copy[index] = updated;
        check === 'combo' ? setSelectCombo(copy) : setSelectFood(copy);
        // setPrice()
    };

    const handleMinus = (index, check) => {
        let copy = check === 'combo' ? [...selectCombo] : [...selectFood];
        if (copy[index].quantity > 0) {
            const updated = {
                ...copy[index],
                quantity: copy[index].quantity - 1,
            };
            copy[index] = updated;
        }
        check === 'combo' ? setSelectCombo(copy) : setSelectFood(copy);
    };

    const handleAdd = (index, check) => {
        let copy = check === 'combo' ? [...selectCombo] : [...selectFood];
        const updated = {
            ...copy[index],
            quantity: copy[index].quantity + 1,
        };
        copy[index] = updated;
        check === 'combo' ? setSelectCombo(copy) : setSelectFood(copy);
    };

    const handleNext = () => {
        if (select.length > 0) {
            dispatch(cartComboValue({ price, combos: select, theater }));
            navigate('/payment-combo');
        } else showToast('Vui lòng chọn bắp nước!', 'warning');
    };

    return (
        <div>
            <div className="py-5">
                <Container>
                    <Form.Select
                        className="w-50 mx-auto"
                        value={theater}
                        onChange={(e) => setTheater(e.target.value)}
                        style={{ border: '1px solid #021b4e' }}
                    >
                        {theaters.map((item) => (
                            <option key={item._id} value={item._id}>
                                {item.name}
                            </option>
                        ))}
                    </Form.Select>
                </Container>
                <Container className="py-5">
                    <h2 className="text-white font-title text-center mb-5">CHỌN BẮP NƯỚC</h2>
                    <h3 className="text-white font-title mb-5">COMBO</h3>
                    <Row>
                        {combo.map((item, index) => (
                            <Col key={item._id} className="mb-5" sm={4}>
                                <ComboItem
                                    item={item}
                                    value={selectCombo[index].quantity}
                                    handleValue={(e) => handleValue(e, index, 'combo')}
                                    handleMinus={() => handleMinus(index, 'combo')}
                                    handleAdd={() => handleAdd(index, 'combo')}
                                />
                            </Col>
                        ))}
                    </Row>
                    <h3 className="text-white font-title my-5">THỨC ĂN LẺ</h3>
                    <Row>
                        {food.map((item, index) => (
                            <Col className="mb-5" sm={4}>
                                <ComboItem
                                    item={item}
                                    value={selectFood[index].quantity}
                                    handleValue={(e) => handleValue(e, index, 'food')}
                                    handleMinus={() => handleMinus(index, 'food')}
                                    handleAdd={() => handleAdd(index, 'food')}
                                />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
            <div className="sticky-bill">
                <Container className="py-2 text-white">
                    {theater && (
                        <Row>
                            <Col xs="auto" className="justify-content-center align-content-center">
                                <h2 className="font-title">
                                    <Name id={theater} detail={detailTheater} />
                                </h2>
                                <h5 className="fw-bold">
                                    {select.map((item, index) => (
                                        <span>
                                            {item.quantity} {item.name}
                                            {index < select.length - 1 && ' | '}
                                        </span>
                                    ))}
                                </h5>
                            </Col>
                            <Col>
                                <div className="d-flex float-end align-items-center">
                                    <div className="ms-4">
                                        <div className="d-flex justify-content-between">
                                            <p>Tạm tính: </p>
                                            <h5>{price.toLocaleString('it-IT')} VNĐ</h5>
                                        </div>
                                        <div className="button big h5" onClick={() => handleNext()}>
                                            TIẾP THEO
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    )}
                </Container>
            </div>
        </div>
    );
};

export default BookComboPage;

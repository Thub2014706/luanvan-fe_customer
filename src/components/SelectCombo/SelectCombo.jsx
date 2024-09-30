import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { listCombo } from '~/services/ComboService';
import { listFood } from '~/services/FoodService';
import ComboItem from '../ComboItem/ComboItem';

const SelectCombo = ({setSelect}) => {
    const [combo, setCombo] = useState([]);
    const [food, setFood] = useState([]);
    const [selectCombo, setSelectCombo] = useState([]);
    const [selectFood, setSelectFood] = useState([]);

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
            setSelect(data);
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

    // const handleSubmit = () => {
    //     if (select.length > 0) {
    //         dispatch(stepNext(2));
    //     } else {
    //         setWar('Hãy chọn combo, bắp nước.');
    //     }
    // };

    return (
        <div>
            <Container className="py-5">
                <h2 className="text-white font-title text-center mb-5">CHỌN BẮP NƯỚC</h2>
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
    );
};

export default SelectCombo;

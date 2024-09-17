import React from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import ImageBase from '../ImageBase/ImageBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Name from '../Name/Name';
import { detailFood } from '~/services/FoodService';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const ComboItem = ({ item, value, handleValue, handleMinus, handleAdd }) => {
    return (
        <Row className="text-white" style={{ height: '150px' }}>
            <Col xs="auto">
                <ImageBase
                    pathImg={item.image}
                    style={{
                        height: '150px',
                        width: '150px',
                        display: 'flex',
                        objectFit: 'cover',
                        borderRadius: '5px',
                    }}
                />
            </Col>
            <Col className="d-flex flex-column justify-content-between">
                <div>
                    <h5 className="fw-bold">{item.name.toUpperCase()}</h5>
                    {item.variants &&
                        item.variants.map((food) => (
                            <span>
                                {food.quantity} <Name id={food.food} detail={detailFood} />
                                <br />
                            </span>
                        ))}
                    <div className="mt-2">
                        <h5>{item.price.toLocaleString('it-IT')} VNĐ</h5>
                    </div>
                </div>
                <InputGroup size="sm" className="mt-auto">
                    <Button style={{ backgroundColor: 'white' }} onClick={handleMinus}>
                        <FontAwesomeIcon icon={faMinus} color="black" />
                    </Button>
                    <Form.Control
                        type="text"
                        style={{ maxWidth: '40px', textAlign: 'center', border: '1px solid gray' }}
                        value={value}
                        onChange={handleValue}
                    />
                    <Button style={{ backgroundColor: 'white' }} onClick={handleAdd}>
                        <FontAwesomeIcon icon={faPlus} color="black" />
                    </Button>
                </InputGroup>
            </Col>
        </Row>
    );
};

export default ComboItem;

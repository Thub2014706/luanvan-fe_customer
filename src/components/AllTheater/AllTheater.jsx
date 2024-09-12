import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { listTheater } from '~/services/TheaterService';

const AllTheater = ({ handleShow, handleClose }) => {
    const [theater, setTheater] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const data = await listTheater();
            setTheater(data);
        };
        fetch();
    }, []);
    return (
        <Container
            onMouseEnter={handleShow}
            onMouseLeave={handleClose}
            style={{
                border: '1px solid #444866',
                borderRadius: '3px',
                position: 'absolute',
                backgroundColor: '#141831',
                overflow: 'hidden',
            }}
        >
            <Row className="p-4">
                {theater.map((item) => (
                    <Col xs={3}>
                        <Link to={`/theater/${item._id}`} className='text-decoration-none text-white'>
                            <p style={{ cursor: 'pointer' }}>{item.name}</p>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default AllTheater;

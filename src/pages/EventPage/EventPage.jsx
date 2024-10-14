import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ImageBase from '~/components/ImageBase/ImageBase';
import { listEvent } from '~/services/EventService';

const EventPage = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const data = await listEvent();
            setEvents(data);
        };
        fetch();
    }, []);

    return (
        <div className="text-white">
            <Container className="py-5">
                <h1 className="font-title text-center">SỰ KIỆN</h1>
                <Row className="mt-5">
                    {events.map((item) => (
                        <Col xs={3} className="d-flex justify-content-center mb-3">
                            <Link to={`/event/${item._id}`} className="event-hover text-white text-decoration-none">
                                <ImageBase
                                    pathImg={item.image}
                                    style={{
                                        height: '270px',
                                        width: '270px',
                                        objectFit: 'cover',
                                        border: '1px solid gray',
                                    }}
                                />
                                <h6 className="text-center mt-3 text-long">{item.title}</h6>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default EventPage;

import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ImageBase from '~/components/ImageBase/ImageBase';
import { detailEvent } from '~/services/EventService';

const DetailEventPage = () => {
    const { id } = useParams();
    const [event, setEvent] = useState();

    useEffect(() => {
        const fetch = async () => {
            const data = await detailEvent(id);
            setEvent(data);
            console.log(data);
        };
        fetch();
    }, [id]);

    useEffect(() => {
        const paragraphs = document.querySelectorAll('p');
        paragraphs.forEach(p => {
          p.classList.add('mb-0');
        });
      }, [event?.content]); 

    return (
        <div>
            {event && (
                <Container className="pb-5 pt-2 px-5 text-white">
                    <h1 className="font-title">{event.title}</h1>
                    <Row className='mt-3'>
                        <Col xs="auto">
                            <divX>
                                <ImageBase pathImg={event.image} />
                            </divX>
                        </Col>
                        <Col>
                            <p dangerouslySetInnerHTML={{ __html: event.content }}></p>
                        </Col>
                    </Row>
                </Container>
            )}
        </div>
    );
};

export default DetailEventPage;

import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ImageBase from '~/components/ImageBase/ImageBase';
import { listNews } from '~/services/NewsService';

const NewsPage = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const data = await listNews();
            setNews(data);
        };
        fetch();
    }, []);

    const convertToPlainText = (htmlContent) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        return tempDiv.textContent || tempDiv.innerText || '';
    };

    return (
        <div className="text-white">
            <Container className="py-5">
                <h1 className="font-title text-center">TIN TỨC</h1>
                <Row className="mt-5">
                    {news.map((item) => (
                        <Col xs={6} className="mb-3">
                            <Link to={`/news/${item._id}`} className="d-flex text-white text-decoration-none">
                                <ImageBase
                                    pathImg={item.image}
                                    style={{
                                        height: '180px',
                                        width: '300px',
                                        objectFit: 'cover',
                                        border: '1px solid gray',
                                    }}
                                />
                                <div className="ms-3">
                                    <h5 style={{textAlign: 'justify', textDecoration: 'underline'}}>{item.title}</h5>
                                    <p className="line-clamp-5">{convertToPlainText(item.content)}</p>
                                </div>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default NewsPage;

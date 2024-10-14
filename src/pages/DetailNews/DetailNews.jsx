import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ImageBase from '~/components/ImageBase/ImageBase';
import Name from '~/components/Name/Name';
import { detailNews } from '~/services/NewsService';
import { detailStaff } from '~/services/StaffService';

const DetailNews = () => {
    const { id } = useParams();
    const [news, setEvent] = useState();
    const [staff, setStaff] = useState();

    useEffect(() => {
        const fetch = async () => {
            const data = await detailNews(id);
            setEvent(data);
            setStaff(await detailStaff(data.staff));
        };
        fetch();
    }, [id]);

    useEffect(() => {
        const paragraphs = document.querySelectorAll('p');
        paragraphs.forEach((p) => {
            p.classList.add('mb-0');
        });
    }, [news?.content]);

    return (
        <div>
            {news && staff && (
                <Container className="p-5 text-white">
                    <h1 className="font-title mb-3">{news.title.toUpperCase()}</h1>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                            {staff.avatar ? (
                                <ImageBase
                                    pathImg={staff.avatar}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                    }}
                                />
                            ) : (
                                <Avatar name={staff.username} size="40" round={true} color="gray" />
                            )}
                            <p className="ms-2 mb-0">
                                <span className="fw-bold">{staff.username}</span> - {staff.email}
                            </p>
                        </div>
                        <div className="d-flex align-items-center">
                            <p className="mb-0">{moment(news.createdAt).format('DD/MM/YYYY HH:ss')}</p>
                        </div>
                    </div>
                    <div className="mt-5">
                        <p dangerouslySetInnerHTML={{ __html: news.content }}></p>
                        {/* <p>{news.content}</p> */}
                    </div>
                </Container>
            )}
        </div>
    );
};

export default DetailNews;

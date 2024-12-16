import { CRating } from '@coreui/react-pro';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import { showToast } from '~/constants';
import { addComment, avgComment, listCommentByFilm } from '~/services/CommentService';

const ReviewFilm = () => {
    const [star, setStar] = useState(5);
    const [text, setText] = useState('');
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login.currentUser);
    const [avg, setAvg] = useState();
    const { id } = useParams();

    useEffect(() => {
        const fetch = async () => {
            const data = await avgComment(id);
            setAvg(data);
        };
        fetch();
    }, [id]);

    useEffect(() => {
        const fetch = () => {
            if (text.length > 220) {
                setText(text.slice(0, 220));
            }
        };
        fetch();
    }, [text]);

    useEffect(() => {
        const fetch = async () => {
            const data = await listCommentByFilm(id);
            setComments(data);
        };
        fetch();
    }, [id]);

    const handleUp = async () => {
        if (!user) {
            navigate('/sign-in');
        } else {
            if (text.trim() === '') {
                showToast('Hãy viết đánh giá!', 'warning');
                console.log('e', text);
            } else {
                const newComment = await addComment({ star, text, user: user.data.id, film: id });
                console.log('e', text);

                if (newComment) {
                    const updatedComments = await listCommentByFilm(id);
                    setComments(updatedComments);
                    setText('');
                    setStar(5);
                }
            }
        }
    };

    return (
        <div>
            <p className="name-film font-title  mt-5" style={{ fontSize: '2rem' }}>
                ĐÁNH GIÁ PHIM
            </p>
            {/* <div className="d-flex"> */}
            <span className="h4 ms-2" style={{ color: '#ffbc0b' }}>
                {avg ? avg : 0}/5
            </span>
            <br />
            <Rating initialValue={avg} allowFraction readonly size={28} /> {/* </div> */}
            <div>
                <span style={{ display: 'block', textAlign: 'right' }}>{text.length}/220 ký tự.</span>
                <InputGroup>
                    <div
                        className="text-center px-5 py-2 align-items-center"
                        style={{ background: 'linear-gradient(to bottom right, #caa9ff, #82acff)' }}
                    >
                        <span className="text-black fw-bold">Xếp hạng</span>
                        <div className="mt-2">
                            <CRating value={star} onChange={(value) => setStar(value)} />
                        </div>
                        <p className="text-black">{star} điểm</p>
                    </div>
                    <Form.Control
                        as="textarea"
                        aria-label="With textarea"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="custom-input"
                        placeholder="Viết đánh giá."
                        style={{ backgroundColor: 'transparent', color: 'white', resize: 'none' }}
                    />
                    <div
                        className="align-items-center justify-content-center d-flex button up"
                        style={{ fontSize: '1.2rem', width: '150px', textAlign: 'center' }}
                        onClick={() => handleUp()}
                    >
                        Đăng đánh giá
                    </div>
                </InputGroup>
            </div>
            <div
                style={{
                    color: 'white',
                    height: '1px',
                    backgroundColor: 'white',
                    border: 'none',
                    marginTop: '30px',
                }}
            />
            <div>
                {comments.map((item) => (
                    <div className="p-4">
                        <Row className="d-flex align-items-center">
                            <Col xs={11}>
                                <CRating value={item.star} readOnly />
                                <p className="mt-3">{item.text}</p>
                                <p style={{ fontSize: '0.9rem', color: 'gray' }}>
                                    {moment(item.createdAt).format('DD/MM/YYYY')}
                                </p>
                            </Col>
                            <Col xs={1}>
                                <div className="d-flex justify-content-center">
                                    {item.user.username.length <= 2 ? (
                                        <span>{item.user.username}</span>
                                    ) : (
                                        <span>
                                            {item.user.username.charAt(0)}
                                            {'*'.repeat(item.user.username.length - 2)}
                                            {item.user.username.charAt(item.user.username.length - 1)}
                                        </span>
                                    )}
                                </div>
                            </Col>
                        </Row>
                        <hr />
                    </div>
                ))}
            </div>
            <div className="mt-5">
                <h5 className="font-title">Lưu ý</h5>
                <p>
                    Mỗi tài khoản chỉ có thể đánh giá một lần cho mỗi lượt truy cập. Đánh giá khi đã thực hiện thì không
                    thể chỉnh sửa.
                </p>
                <p>Tài khoản của bạn phải là thành viên và đã mua vé xem phim mới có thể tham gia đánh giá phim.</p>
                {/* <p>Bạn có thể kiểm tra lại phần đánh giá của mình trong My Cinema.</p> */}
            </div>
        </div>
    );
};

export default ReviewFilm;

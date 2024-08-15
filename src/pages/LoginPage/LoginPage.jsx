import { faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '~/services/UserService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';

const LoginPage = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch()

    const [eye, setEye] = useState(false);

    const [data, setData] = useState({
        info: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((pre) => ({
            ...pre,
            [name]: value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        login(data, toast, navigate, dispatch);
    };

    return (
        <div className="background-lg min-vh-100 d-flex align-items-center justify-content-center">
            <ToastContainer />
            <Card className="card-login p-5">
                <Card.Body>
                    <h4 className="text-center">ĐĂNG NHẬP</h4>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="form-login">
                            <Form.Control
                                type="text"
                                name="info"
                                value={data.info}
                                placeholder="Tài khoản, email hoặc số điện thoại"
                                className="input-login mt-5"
                                onChange={handleChange}
                            />
                            <FontAwesomeIcon className="icon-login" icon={faUser} />
                        </Form.Group>
                        <Form.Group className="form-login mt-4">
                            <Form.Control
                                type={eye ? 'text' : 'password'}
                                name="password"
                                value={data.password}
                                placeholder="Mật khẩu"
                                className="input-login"
                                onChange={handleChange}
                            />
                            <FontAwesomeIcon
                                onClick={() => setEye(!eye)}
                                className="icon-login"
                                icon={eye ? faEyeSlash : faEye}
                            />
                        </Form.Group>
                        <Button
                            type="submit"
                            className="mt-5"
                            style={{
                                width: '100%',
                                color: 'black',
                                backgroundColor: 'white',
                                border: 'none',
                                borderRadius: '40px',
                                height: '40px',
                            }}
                        >
                            Đăng nhập
                        </Button>
                    </Form>
                    <p className="mt-3">
                        Bạn chưa có tài khoản? <Link to={'/signup'}>Đăng ký ngay</Link>
                    </p>
                </Card.Body>
            </Card>
        </div>
    );
};

export default LoginPage;

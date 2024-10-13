import { faEnvelope, faEye, faEyeSlash, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login, register } from '~/services/UserService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isLogin = location.pathname === '/sign-in';

    const dispatch = useDispatch();

    const [eye, setEye] = useState(false);
    const [eye1, setEye1] = useState(false);
    const [eye2, setEye2] = useState(false);
    const [data, setData] = useState(
        isLogin
            ? {
                  info: '',
                  password: '',
              }
            : {
                  username: '',
                  email: '',
                  phone: '',
                  password: '',
                  confirmPassword: '',
              },
    );

    useEffect(() => {
        const fetch = async () => {
            isLogin
                ? setData({
                      info: '',
                      password: '',
                  })
                : setData({
                      username: '',
                      email: '',
                      phone: '',
                      password: '',
                      confirmPassword: '',
                  });
        };
        fetch();
    }, [isLogin]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((pre) => ({
            ...pre,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        isLogin ? await login(data, navigate, dispatch) : await register(data, navigate);
    };
    console.log(data);

    return (
        <div className="background-lg min-vh-100 d-flex align-items-center justify-content-center">
            <ToastContainer />
            <Card className="card-login p-5">
                <Card.Body>
                    <h4 className="text-center">{isLogin ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ'}</h4>
                    {isLogin ? (
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
                    ) : (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="form-login">
                                <Form.Control
                                    type="text"
                                    name="username"
                                    value={data.username}
                                    placeholder="Họ tên"
                                    className="input-login mt-5"
                                    onChange={handleChange}
                                />
                                <FontAwesomeIcon className="icon-login" icon={faUser} />
                            </Form.Group>
                            <Form.Group className="form-login">
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    placeholder="E-mail"
                                    className="input-login mt-4"
                                    onChange={handleChange}
                                />
                                <FontAwesomeIcon className="icon-login" icon={faEnvelope} />
                            </Form.Group>
                            <Form.Group className="form-login">
                                <Form.Control
                                    type="text"
                                    name="phone"
                                    value={data.phone}
                                    placeholder="Số điện thoại"
                                    className="input-login mt-4"
                                    onChange={handleChange}
                                />
                                <FontAwesomeIcon className="icon-login" icon={faPhone} />
                            </Form.Group>
                            <Form.Group className="form-login mt-4">
                                <Form.Control
                                    type={eye1 ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    placeholder="Mật khẩu"
                                    className="input-login"
                                    onChange={handleChange}
                                />
                                <FontAwesomeIcon
                                    onClick={() => setEye1(!eye1)}
                                    className="icon-login"
                                    icon={eye1 ? faEyeSlash : faEye}
                                />
                            </Form.Group>
                            <Form.Group className="form-login mt-4">
                                <Form.Control
                                    type={eye2 ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={data.confirmPassword}
                                    placeholder="Nhập lại mật khẩu"
                                    className="input-login"
                                    onChange={handleChange}
                                />
                                <FontAwesomeIcon
                                    onClick={() => setEye2(!eye2)}
                                    className="icon-login"
                                    icon={eye2 ? faEyeSlash : faEye}
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
                                Đăng ký
                            </Button>
                        </Form>
                    )}
                    {isLogin ? (
                        <p className="mt-3">
                            Bạn chưa có tài khoản? <Link to={'/sign-up'}>Đăng ký ngay</Link>
                        </p>
                    ) : (
                        <p className="mt-3">
                            Bạn đã có tài khoản? <Link to={'/sign-in'}>Đăng nhập ngay</Link>
                        </p>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default LoginPage;

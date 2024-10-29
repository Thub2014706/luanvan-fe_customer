import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';
import { Fragment, useEffect, useState } from 'react';
import MainLayout from './layouts/MainLayout/MainLayout';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import NavigationListener from './NavigationListener';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { detailInfomation } from './services/InformationService';
import { axiosJWT, logout, refreshToken } from './services/UserService';
import { loginSuccess } from './features/auth/authSlice';
import { jwtDecode } from 'jwt-decode';

function App() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [id, setId] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetch = async () => {
            await detailInfomation(dispatch);
        };
        fetch();
    }, [dispatch]);

    axiosJWT.interceptors.request.use(
        //trước khi gửi request nào đó thì interceptors sẽ check này trước khi gọi api nào đó
        async (config) => {
            let decodedToken = jwtDecode(user?.accessToken);
            const currentTime = new Date().getTime() / 1000;
            if (decodedToken.exp - currentTime < 3000) {
                try {
                    const newToken = await refreshToken();
                    // console.log(newToken.accessToken)
                    if (newToken) {
                        const newData = user?.data;

                        const refreshUser = {
                            data: newData,
                            accessToken: newToken.accessToken,
                        };
                        // console.log("thu nghiem", refreshUser)
                        dispatch(loginSuccess(refreshUser));
                        config.headers.Authorization = 'Bearer ' + newToken.accessToken;
                    }
                    //  else {
                    //     logout(dispatch, user?.accessToken);
                    // }
                } catch (error) {
                    console.log(error);
                }
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        },
    );

    return (
        <Router>
            <NavigationListener showTime={(value) => setId(value)} />
            <div className="App">
                <ToastContainer style={{ zIndex: 10000000 }} />
                <Routes>
                    {publicRoutes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                route.layout === null ? (
                                    <Fragment>
                                        <route.component />
                                    </Fragment>
                                ) : (
                                    <MainLayout>
                                        <route.component />
                                    </MainLayout>
                                )
                            }
                        />
                    ))}
                    {privateRoutes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                user !== null ? (
                                    route.layout === null ? (
                                        <Fragment>
                                            <route.component />
                                        </Fragment>
                                    ) : (route.path === '/book-seat' && id) || route.path !== '/book-seat' ? (
                                        <MainLayout>
                                            <route.component />
                                        </MainLayout>
                                    ) : (
                                        <Fragment>
                                            <NotFoundPage />
                                        </Fragment>
                                    )
                                ) : (
                                    <Navigate to="/sign-in" replace />
                                )
                            }
                        />
                    ))}
                </Routes>
            </div>
        </Router>
    );
}

export default App;

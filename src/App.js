import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';
import { Fragment, useEffect, useState } from 'react';
import MainLayout from './layouts/MainLayout/MainLayout';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import NavigationListener from './NavigationListener';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { detailInfomation } from './services/InformationService';

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

    return (
        <Router>
            <NavigationListener showTime={(value) => setId(value)} />
            <div className="App">
                {/* <ToastContainer style={{ zIndex: 1000000000000 }} /> */}
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

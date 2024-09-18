import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes } from './routes';
import { Fragment } from 'react';
import MainLayout from './layouts/MainLayout/MainLayout';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';

function App() {
    const user = useSelector((state) => state.auth.login.currentUser);
    console.log(user);

    return (
        <Router>
            <div className="App">
                <ToastContainer style={{ zIndex: 10000000 }} />
                <Routes>
                    {publicRoutes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                route.path !== '/book-seat' || (route.path === '/book-seat' && user) ? (
                                    route.layout === null ? (
                                        <Fragment>
                                            <route.component />
                                        </Fragment>
                                    ) : (
                                        <MainLayout>
                                            <route.component />
                                        </MainLayout>
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

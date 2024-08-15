import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { Fragment } from 'react';
import MainLayout from './layouts/MainLayout/MainLayout';

function App() {
    return (
        <Router>
            <div className="App">
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
                </Routes>
            </div>
        </Router>
    );
}

export default App;

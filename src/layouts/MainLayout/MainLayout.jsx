import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const MainLayout = ({ children }) => {
    return (
        <div className="min-vh-100">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default MainLayout;

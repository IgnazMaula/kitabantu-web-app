import React from 'react';
import { services } from '../../services';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Content from '../components/Content';
import Category from '../components/Category';

const Main = (props) => {
    return (
        <div>
            <Navbar />
            <Content services={services} />
            <Footer />
        </div>
    );
};

export default Main;

import React from 'react';
import { services } from '../../services';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ServiceList from '../components/ServiceList';
import Category from '../components/Category';

const Main = (props) => {
    return (
        <div>
            <Navbar />
            <ServiceList services={services} />
            <Footer />
        </div>
    );
};

export default Main;

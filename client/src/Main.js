import React from "react";
import Content from './shared/components/Content';
import Category from './shared/components/Category';
import Header from './shared/components/Header';
import CalltoAction from './shared/components/CalltoAction';
import { services } from './services';
import Navbar from './shared/components/Navbar';
import Footer from './shared/components/Footer';

const Main = props => {
    return (
        <div>
            <Navbar />
            <Header />
            <Category />
            <Content services={services} />
            <CalltoAction />
            <Footer />
        </div>
    )
}

export default Main

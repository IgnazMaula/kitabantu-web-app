import React from "react";
import Content from './shared/components/Content';
import Category from './shared/components/Category';
import Header from './shared/components/Header';
import CalltoAction from './shared/components/CalltoAction';
import { services } from "./services"

const Main = props => {
    return (
        <div>
            <Header />
            <Category />
            <Content services={services} />
            <CalltoAction />
        </div>
    )
}

export default Main

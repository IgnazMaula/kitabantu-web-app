import { useContext } from 'react';
import Content from './shared/components/Content';
import Category from './shared/components/Category';
import Header from './shared/components/Header';
import CalltoAction from './shared/components/CalltoAction';
import { services } from './services';
import Navbar from './shared/components/Navbar';
import Footer from './shared/components/Footer';
import { AuthContext } from './shared/context/auth-context';

const Main = (props) => {
    const auth = useContext(AuthContext);
    return (
        <div>
            <Navbar />
            {!auth.isLoggedIn && <Header />}
            <Category />
            <Content services={services} />
            {!auth.isLoggedIn && <CalltoAction />}
            <Footer />
        </div>
    );
};

export default Main;

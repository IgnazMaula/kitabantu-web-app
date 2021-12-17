import { useContext } from 'react';

import ClientProfile from './ClientProfile';
import ClientBookmarks from './ClientBookmarks';
import ClientReviews from './ClientReviews';
import ServiceHistory from './ServiceHistory';
import { AuthContext } from '../../shared/context/auth-context';

const ClientMenu = (props) => {
    const auth = useContext(AuthContext);
    if (props.activeMenu === 'My Profile') {
        return <ClientProfile />;
    } else if (props.activeMenu === 'Order History') {
        return <ServiceHistory />;
    } else if (props.activeMenu === 'My Reviews') {
        return <ClientReviews />;
    } else if (props.activeMenu === 'My Bookmarks') {
        return <ClientBookmarks />;
    } else {
        return <h1>Hello</h1>;
    }
};

export default ClientMenu;

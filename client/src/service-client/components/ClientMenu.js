import { useContext } from 'react';

import ClientProfile from './ClientProfile';
import ClientBookmarks from './ClientBookmarks';
import ClientReviews from './ClientReviews';
import ServiceHistory from './ClientHistory';
import { AuthContext } from '../../shared/context/auth-context';
import ClientHistory from './ClientHistory';

const ClientMenu = (props) => {
    const auth = useContext(AuthContext);
    if (props.activeMenu === 'My Profile') {
        return <ClientProfile />;
    } else if (props.activeMenu === 'Order History') {
        return <ClientHistory />;
    } else if (props.activeMenu === 'My Reviews') {
        return <ClientReviews />;
    } else if (props.activeMenu === 'My Bookmarks') {
        return <ClientBookmarks />;
    } else {
        return <h1>Wrong Route</h1>;
    }
};

export default ClientMenu;

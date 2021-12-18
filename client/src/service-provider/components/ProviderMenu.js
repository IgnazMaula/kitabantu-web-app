import { useContext } from 'react';

import { AuthContext } from '../../shared/context/auth-context';
import ProviderProfile from './ProviderProfile';

const ProviderMenu = (props) => {
    const auth = useContext(AuthContext);
    if (props.activeMenu === 'My Profile') {
        return <ProviderProfile />;
    } else if (props.activeMenu === 'Order History') {
        return <ProviderProfile />;
    } else if (props.activeMenu === 'My Reviews') {
        return <ProviderProfile />;
    } else if (props.activeMenu === 'My Bookmarks') {
        return <ProviderProfile />;
    } else {
        return <h1>Hello</h1>;
    }
};

export default ProviderMenu;

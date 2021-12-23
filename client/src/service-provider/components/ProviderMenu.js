import { useContext } from 'react';

import { AuthContext } from '../../shared/context/auth-context';
import AddNewService from './AddNewService';
import ProviderProfile from './ProviderProfile';

const ProviderMenu = (props) => {
    const auth = useContext(AuthContext);
    if (props.activeMenu === 'My Profile') {
        return <ProviderProfile />;
    } else if (props.activeMenu === 'Manage Order') {
        return <ProviderProfile />;
    } else if (props.activeMenu === 'Add New Service') {
        return <AddNewService />;
    } else if (props.activeMenu === 'Manage My Service') {
        return <ProviderProfile />;
    } else {
        return <h1>Hello</h1>;
    }
};

export default ProviderMenu;

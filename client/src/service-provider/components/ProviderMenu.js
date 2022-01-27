import { useContext } from 'react';

import { AuthContext } from '../../shared/context/auth-context';
import AddNewService from './AddNewService';
import ProviderManageService from './ProviderManageService';
import ProviderProfile from './ProviderProfile';

const ProviderMenu = (props) => {
    const auth = useContext(AuthContext);
    if (props.activeMenu === 'My Profile') {
        return <ProviderProfile />;
    } else if (props.activeMenu === 'Manage Order') {
        return <ProviderProfile />;
    } else if (props.activeMenu === 'Manage My Service') {
        return <ProviderManageService />;
    } else if (props.activeMenu === 'Add New Service') {
        return <AddNewService />;
    } else {
        return <h1>Wrong Route</h1>;
    }
};

export default ProviderMenu;

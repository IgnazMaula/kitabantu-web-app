import { useContext } from 'react';

import { AuthContext } from '../../shared/context/auth-context';
import AdminProfile from './AdminProfile';
import AdminManageRequest from './AdminManageRequest';
import AdminManageUsers from './AdminManageUsers';

const AdminMenu = (props) => {
    const auth = useContext(AuthContext);
    if (props.activeMenu === 'My Profile') {
        return <AdminProfile />;
    } else if (props.activeMenu === 'Manage Service Request') {
        return <AdminManageRequest />;
    } else if (props.activeMenu === 'Manage Users') {
        return <AdminManageUsers />;
    } else if (props.activeMenu === 'Manage Services') {
        return <AdminManageUsers />;
    } else {
        return <h1>Wrong Route</h1>;
    }
};

export default AdminMenu;

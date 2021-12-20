import { useContext } from 'react';

import { AuthContext } from '../../shared/context/auth-context';
import AdminProfile from './AdminProfile';

const AdminMenu = (props) => {
    const auth = useContext(AuthContext);
    if (props.activeMenu === 'My Profile') {
        return <AdminProfile />;
    } else if (props.activeMenu === 'Order History') {
        return <AdminProfile />;
    } else if (props.activeMenu === 'My Reviews') {
        return <AdminProfile />;
    } else if (props.activeMenu === 'My Bookmarks') {
        return <AdminProfile />;
    } else {
        return <h1>Hello</h1>;
    }
};

export default AdminMenu;

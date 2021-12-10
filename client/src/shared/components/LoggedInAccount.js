import { useContext } from 'react';

import { AuthContext } from '../context/auth-context';

const LoggedInAccount = (props) => {
    const auth = useContext(AuthContext);
    let bg = '';
    // if (props.currentRole === 'Service Client') {
    //     bg = 'bg-red-800';
    // } else if (props.currentRole === 'Service Provider') {
    //     bg = 'bg-green-600';
    // } else if (props.currentRole === 'Admin') {
    //     bg = 'bg-blue-800';
    // } else {
    //     bg = 'bg-gray-400';
    // }
    auth.isLoggedIn ? (bg = 'bg-green-600') : (bg = 'bg-gray-400');
    return (
        <div>
            <p className={`${bg} h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8`}>
                {auth.isLoggedIn ? 'Logged In' : 'Not Logged In'}
            </p>
        </div>
    );
};

export default LoggedInAccount;

import { useContext } from 'react';

import { AuthContext } from '../context/auth-context';

const LoggedInAccount = (props) => {
    const auth = useContext(AuthContext);
    let bg;
    let accountType;

    if (auth.isLoggedIn) {
        if (auth.loggedUser.role === 'Client') {
            bg = 'bg-green-600';
            accountType = 'Service Client Account';
        } else if (auth.loggedUser.role === 'Provider') {
            bg = 'bg-blue-800';
            accountType = 'Service Provider Account';
        } else if (auth.loggedUser.role === 'Admin') {
            bg = 'bg-red-800';
            accountType = 'Administrator Account';
        }
    } else {
        bg = 'bg-gray-400';
        accountType = 'Not Logged in';
    }

    return (
        <div>
            <p className={`${bg} h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8`}>{accountType}</p>
        </div>
    );
};

export default LoggedInAccount;

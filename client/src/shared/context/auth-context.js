import { createContext } from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    loggedUser: null,
    login: () => {},
    logout: () => {},
});

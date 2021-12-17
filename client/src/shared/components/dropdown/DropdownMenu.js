/* This example requires Tailwind CSS v2.0+ */
import { useContext } from 'react';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
    ArchiveIcon,
    ArrowCircleRightIcon,
    ChevronDownIcon,
    DuplicateIcon,
    HeartIcon,
    UserIcon,
    TrashIcon,
    StarIcon,
    LogoutIcon,
} from '@heroicons/react/solid';
import { UserCircleIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import ClientDropdown from './ClientDropdown';
import ProviderDropdown from './ProviderDropdown';
import AdminDropdown from './AdminDropdown';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function DropdownMenu() {
    const auth = useContext(AuthContext);
    if (auth.loggedUser.role === 'Client') {
        return <ClientDropdown />;
    } else if (auth.loggedUser.role === 'Provider') {
        return <ProviderDropdown />;
    } else {
        return <AdminDropdown />;
    }
}

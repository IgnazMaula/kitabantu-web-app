import { Fragment, useState, useContext } from 'react';
import { Dialog, Switch, Transition } from '@headlessui/react';
import {
    BellIcon,
    BriefcaseIcon,
    ChatIcon,
    CogIcon,
    DocumentSearchIcon,
    HomeIcon,
    MenuAlt2Icon,
    QuestionMarkCircleIcon,
    UsersIcon,
    XIcon,
} from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/solid';
import { AuthContext } from '../../shared/context/auth-context';

const navigation = [
    { name: 'Home', href: '#', icon: HomeIcon, current: false },
    { name: 'Jobs', href: '#', icon: BriefcaseIcon, current: false },
    { name: 'Applications', href: '#', icon: DocumentSearchIcon, current: false },
    { name: 'Messages', href: '#', icon: ChatIcon, current: false },
    { name: 'Team', href: '#', icon: UsersIcon, current: false },
    { name: 'Settings', href: '#', icon: CogIcon, current: true },
];
const secondaryNavigation = [
    { name: 'Help', href: '#', icon: QuestionMarkCircleIcon },
    { name: 'Logout', href: '#', icon: CogIcon },
];
const tabs = [
    { name: 'General', href: '#', current: true },
    { name: 'Password', href: '#', current: false },
    { name: 'Notifications', href: '#', current: false },
    { name: 'Plan', href: '#', current: false },
    { name: 'Billing', href: '#', current: false },
    { name: 'Team Members', href: '#', current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function AdminProfile() {
    const auth = useContext(AuthContext);
    const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] = useState(true);
    const [autoUpdateApplicantDataEnabled, setAutoUpdateApplicantDataEnabled] = useState(false);
    return (
        <>
            <div>
                {/* Content area */}
                <div>
                    <div className='max-w-7xl mx-auto sm:px-2 lg:px-8'>
                        <main className='flex-1'>
                            <div className='relative max-w-4xl mx-auto md:px-8 xl:px-0'>
                                <div>
                                    <div className='px-4 sm:px-6 md:px-0'>
                                        <h1 className='text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl'>My Profile</h1>
                                        <p className='mt-2 text-sm text-gray-500'>View and update information related to your account.</p>
                                    </div>
                                    <div className='px-4 sm:px-6 md:px-0'>
                                        <div className='py-6'>
                                            {/* Description list with inline editing */}
                                            <div>
                                                <div className='space-y-1'></div>
                                                <div className='mt-6'>
                                                    <dl className='divide-y divide-gray-200'>
                                                        <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5'>
                                                            <dt className='text-sm font-medium text-gray-500'>Photo</dt>
                                                            <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                                                <span className='flex-grow'>
                                                                    {auth.loggedUser.gender === 'Male' ? (
                                                                        <img className='h-32 w-32 rounded-full' src='/images/admin-male.png' alt='' />
                                                                    ) : (
                                                                        <img
                                                                            className='h-32 w-32 rounded-full'
                                                                            src='/images/admin-female.png'
                                                                            alt=''
                                                                        />
                                                                    )}
                                                                </span>
                                                            </dd>
                                                        </div>
                                                        <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4'>
                                                            <dt className='text-sm font-medium text-gray-500'>Name</dt>
                                                            <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                                                <span className='flex-grow'>{auth.loggedUser.name}</span>
                                                            </dd>
                                                        </div>
                                                        <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5'>
                                                            <dt className='text-sm font-medium text-gray-500'>Email</dt>
                                                            <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                                                <span className='flex-grow'>{auth.loggedUser.email}</span>
                                                            </dd>
                                                        </div>
                                                        <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200'>
                                                            <dt className='text-sm font-medium text-gray-500'>Type of Account</dt>
                                                            <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                                                <span className='flex-grow'>Administrator</span>
                                                            </dd>
                                                        </div>
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}

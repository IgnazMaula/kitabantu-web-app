/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  const colors = require('tailwindcss/colors')
  
  module.exports = {
    // ...
    theme: {
      extend: {
        colors: {
          sky: colors.sky,
          teal: colors.teal,
          cyan: colors.cyan,
          rose: colors.rose,
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/line-clamp'),
    ],
  }
  ```
*/
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Menu, Popover, Transition } from '@headlessui/react';
import {
    AcademicCapIcon,
    BadgeCheckIcon,
    BellIcon,
    CashIcon,
    ClockIcon,
    MenuIcon,
    ReceiptRefundIcon,
    UsersIcon,
    XIcon,
} from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/solid';
import Navbar from '../../shared/components/Navbar';
import Footer from '../../shared/components/Footer';
import ProviderStat from '../components/ProviderStat';
import ProviderAllService from '../components/ProviderAllService';
import LoadingSpinner from '../../shared/components/LoadingSpinner';

const user = {
    name: 'Chelsea Hagon',
    email: 'chelseahagon@example.com',
    role: 'Human Resources Manager',
    imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const stats = [
    { label: 'Vacation days left', value: 12 },
    { label: 'Sick days left', value: 4 },
    { label: 'Personal days left', value: 2 },
];
const actions = [
    {
        icon: ClockIcon,
        name: 'Request time off',
        href: '#',
        iconForeground: 'text-teal-700',
        iconBackground: 'bg-teal-50',
    },
    {
        icon: BadgeCheckIcon,
        name: 'Benefits',
        href: '#',
        iconForeground: 'text-purple-700',
        iconBackground: 'bg-purple-50',
    },
    {
        icon: UsersIcon,
        name: 'Schedule a one-on-one',
        href: '#',
        iconForeground: 'text-sky-700',
        iconBackground: 'bg-sky-50',
    },
    { icon: CashIcon, name: 'Payroll', href: '#', iconForeground: 'text-yellow-700', iconBackground: 'bg-yellow-50' },
    {
        icon: ReceiptRefundIcon,
        name: 'Submit an expense',
        href: '#',
        iconForeground: 'text-rose-700',
        iconBackground: 'bg-rose-50',
    },
    {
        icon: AcademicCapIcon,
        name: 'Training',
        href: '#',
        iconForeground: 'text-indigo-700',
        iconBackground: 'bg-indigo-50',
    },
];
const recentHires = [
    {
        name: 'Leonard Krasner',
        handle: 'leonardkrasner',
        imageUrl:
            'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        href: '#',
    },
    {
        name: 'Floyd Miles',
        handle: 'floydmiles',
        imageUrl:
            'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        href: '#',
    },
    {
        name: 'Emily Selman',
        handle: 'emilyselman',
        imageUrl:
            'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        href: '#',
    },
    {
        name: 'Kristin Watson',
        handle: 'kristinwatson',
        imageUrl:
            'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        href: '#',
    },
];
const announcements = [
    {
        id: 1,
        title: 'Office closed on July 2nd',
        href: '#',
        preview:
            'Cum qui rem deleniti. Suscipit in dolor veritatis sequi aut. Vero ut earum quis deleniti. Ut a sunt eum cum ut repudiandae possimus. Nihil ex tempora neque cum consectetur dolores.',
    },
    {
        id: 2,
        title: 'New password policy',
        href: '#',
        preview:
            'Alias inventore ut autem optio voluptas et repellendus. Facere totam quaerat quam quo laudantium cumque eaque excepturi vel. Accusamus maxime ipsam reprehenderit rerum id repellendus rerum. Culpa cum vel natus. Est sit autem mollitia.',
    },
    {
        id: 3,
        title: 'Office closed on July 2nd',
        href: '#',
        preview:
            'Tenetur libero voluptatem rerum occaecati qui est molestiae exercitationem. Voluptate quisquam iure assumenda consequatur ex et recusandae. Alias consectetur voluptatibus. Accusamus a ab dicta et. Consequatur quis dignissimos voluptatem nisi.',
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function ProviderProfilePage(props) {
    const providerId = useParams().uid;
    const [isLoading, setIsLoading] = useState(false);
    const [provider, setProvider] = useState([]);
    const [serviceOwned, setServiceOwned] = useState(0);
    const [orderReceived, setOrderReceived] = useState(0);
    useEffect(() => {
        const getProvider = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/users/${providerId}`);
                const responseData = await response.json();
                setProvider(responseData.user);
                setServiceOwned(responseData.user.services.length);
                setOrderReceived(responseData.user.orders.length);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };
        getProvider();
    }, [providerId]);
    return (
        <>
            <Navbar />
            <div className='min-h-full'>
                <main className='mt-20 pb-8'>
                    {isLoading ? (
                        <div className='text-center p-24'>
                            <LoadingSpinner />
                        </div>
                    ) : (
                        <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
                            <h1 className='sr-only'>Profile</h1>
                            {/* Main 3 column grid */}
                            <div>
                                {/* Left column */}
                                <div className='grid grid-cols-1 gap-4 lg:col-span-2'>
                                    {/* Welcome panel */}
                                    <section aria-labelledby='profile-overview-title'>
                                        <div className='rounded-lg bg-white overflow-hidden shadow'>
                                            <h2 className='sr-only' id='profile-overview-title'>
                                                Profile Overview
                                            </h2>
                                            <div className='bg-gray-50 p-6'>
                                                <div className='sm:flex sm:items-center sm:justify-between'>
                                                    <div className='sm:flex sm:space-x-5'>
                                                        <div className='w-32 h-32 rounded-lg overflow-hidden mx-auto flex-shrink-0'>
                                                            <img
                                                                src={`${process.env.REACT_APP_BACKEND_URL}${provider.image}`}
                                                                alt={provider.name}
                                                                className='object-right object-cover h-full w-full rounded-full '
                                                            />
                                                        </div>
                                                        <div className='mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left pr-80'>
                                                            <p className='text-xl font-bold text-gray-900 sm:text-2xl my-2'>{provider.name}</p>
                                                            <p className='text-sm font-medium text-gray-400 my-2'>
                                                                Service Provider - {provider.userType}
                                                            </p>
                                                            {provider.vaccinated ? (
                                                                <span className='px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full'>
                                                                    Vaccinated
                                                                </span>
                                                            ) : (
                                                                <span className='px-2 py-1 text-red-800 text-xs font-medium bg-red-100 rounded-full'>
                                                                    Not Vaccinated
                                                                </span>
                                                            )}
                                                            <p className='text-sm text-gray-900 mt-8'>{provider.description}</p>
                                                            <p className='text-sm text-gray-900 mt-8'>
                                                                <span className='font-bold'>Email&emsp;</span>
                                                                {provider.email}
                                                            </p>
                                                            <p className='text-sm text-gray-900 mt-4'>
                                                                <span className='font-bold'>Phone&emsp;</span>
                                                                {provider.phoneNumber}
                                                            </p>
                                                            <p className='text-sm text-gray-900 mt-4'>
                                                                <span className='font-bold'>Location&emsp;</span>
                                                                {provider.location}
                                                            </p>
                                                            <p className='text-sm text-gray-900 mt-4'>
                                                                <span className='font-bold'>Address&emsp;</span>
                                                                {provider.address}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <ProviderStat serviceOwned={serviceOwned} orderReceived={orderReceived} averageRating='4.5' />
                                            </div>
                                        </div>
                                    </section>
                                    {/* Actions panel */}
                                    <section aria-labelledby='quick-links-title'>
                                        <ProviderAllService providerName={provider.name} providerId={providerId} />
                                    </section>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
            <Footer />
        </>
    );
}

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
          orange: colors.orange,
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useState } from 'react';
import { Disclosure, Menu, RadioGroup, Switch, Transition } from '@headlessui/react';
import { QuestionMarkCircleIcon, SearchIcon } from '@heroicons/react/solid';
import { StarIcon, CogIcon, CreditCardIcon, HeartIcon, ViewGridIcon, UserCircleIcon, ViewGridAddIcon, XIcon } from '@heroicons/react/outline';

import Navbar from '../../shared/components/Navbar';
import Footer from '../../shared/components/Footer';
import ClientMenu from '../components/ClientMenu';
import { Link } from 'react-router-dom';

const user = {
    name: 'Ignaz Maula',
    email: 'ignaz@maula.com',
    imageUrl: 'https://pm1.narvii.com/6878/701bf7222e8056959e330192a0396edfff213752r1-1080-1030v2_hq.jpg',
};
const navigation = [
    { name: 'Dashboard', href: '#' },
    { name: 'Jobs', href: '#' },
    { name: 'Applicants', href: '#' },
    { name: 'Company', href: '#' },
];
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
];
const subNavigation = [
    { name: 'My Profile', href: '/profile', icon: UserCircleIcon },
    { name: 'Manage My Order', href: '/manage-order', icon: ViewGridIcon },
    { name: 'My Bookmarks', href: '/my-bookmarks', icon: HeartIcon },
    { name: 'My Reviews', href: '/my-reviews', icon: StarIcon },
    // { name: 'Plan & Billing', href: '#', icon: CreditCardIcon, current: true },
    // { name: 'Integrations', href: '#', icon: ViewGridAddIcon, current: false },
];
const plans = [
    { name: 'Startup', priceMonthly: 29, priceYearly: 290, limit: 'Up to 5 active job postings' },
    { name: 'Business', priceMonthly: 99, priceYearly: 990, limit: 'Up to 25 active job postings' },
    { name: 'Enterprise', priceMonthly: 249, priceYearly: 2490, limit: 'Unlimited active job postings' },
];
const payments = [
    {
        id: 1,
        date: '1/1/2020',
        datetime: '2020-01-01',
        description: 'Business Plan - Annual Billing',
        amount: 'CA$109.00',
        href: '#',
    },
    // More payments...
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function ClientDashboard(props) {
    return (
        <>
            <Navbar />
            <div className='h-full'>
                <main className='max-w-7xl mx-auto pb-10 lg:py-12 lg:px-8'>
                    <div className='lg:grid lg:grid-cols-12 lg:gap-x-5'>
                        <aside className='py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3'>
                            <nav className='space-y-1'>
                                {subNavigation.map((item) => (
                                    <div>
                                        <Link
                                            to={item.href}
                                            key={item.name}
                                            className={classNames(
                                                item.name === props.active
                                                    ? 'bg-green-50 border-green-600 text-green-600'
                                                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                                'group border-l-4 py-2 px-3 flex items-center text-sm font-medium'
                                            )}
                                        >
                                            <item.icon
                                                className={classNames(
                                                    item.name === props.active ? 'text-green-500' : 'text-gray-400 group-hover:text-gray-500',
                                                    'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                                                )}
                                            />
                                            <span className='truncate'>{item.name}</span>
                                        </Link>
                                    </div>
                                ))}
                            </nav>
                        </aside>
                        <div className='space-y-6 sm:px-6 lg:px-0 lg:col-span-9'>
                            <ClientMenu user={user} activeMenu={props.active} />
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
}

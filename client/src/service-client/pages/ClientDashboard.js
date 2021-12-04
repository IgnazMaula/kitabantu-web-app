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
import { Fragment, useState } from 'react'
import { Disclosure, Menu, RadioGroup, Switch, Transition } from '@headlessui/react'
import { QuestionMarkCircleIcon, SearchIcon } from '@heroicons/react/solid'
import {
    StarIcon,
    CogIcon,
    CreditCardIcon,
    HeartIcon,
    MenuIcon,
    UserCircleIcon,
    ViewGridAddIcon,
    XIcon,
} from '@heroicons/react/outline'

import Navbar from '../../shared/components/Navbar';
import Footer from '../../shared/components/Footer';
import ClientProfile from '../components/DashboardContent';
import DashboardContent from '../components/DashboardContent';
import { Link } from 'react-router-dom';

const user = {
    name: 'Lisa Marie',
    email: 'lisamarie@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80',
}
const navigation = [
    { name: 'Dashboard', href: '#' },
    { name: 'Jobs', href: '#' },
    { name: 'Applicants', href: '#' },
    { name: 'Company', href: '#' },
]
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
]
const subNavigation = [
    { name: 'My Profile', href: '/profile', icon: UserCircleIcon, current: false },
    { name: 'Order History', href: '/order-history', icon: CogIcon, current: false },
    { name: 'My Ratings', href: '#', icon: StarIcon, current: false },
    { name: 'My Favorites', href: '#', icon: HeartIcon, current: false },
    // { name: 'Plan & Billing', href: '#', icon: CreditCardIcon, current: true },
    // { name: 'Integrations', href: '#', icon: ViewGridAddIcon, current: false },
]
const plans = [
    { name: 'Startup', priceMonthly: 29, priceYearly: 290, limit: 'Up to 5 active job postings' },
    { name: 'Business', priceMonthly: 99, priceYearly: 990, limit: 'Up to 25 active job postings' },
    { name: 'Enterprise', priceMonthly: 249, priceYearly: 2490, limit: 'Unlimited active job postings' },
]
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
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ClientDashboard(props) {
    const [selectedPlan, setSelectedPlan] = useState(plans[1])
    const [annualBillingEnabled, setAnnualBillingEnabled] = useState(true)
    const [activeMenu, setActiveMenu] = useState(props.active)
    const setActiveMenuHandler = (name, current) => {
        setActiveMenu(name);
    }
    return (
        <>
            <Navbar />
            <div className="h-full">
                <main className="max-w-7xl mx-auto pb-10 lg:py-12 lg:px-8">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
                        <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
                            <nav className="space-y-1">
                                {subNavigation.map((item) => (
                                    <div onClick={() => setActiveMenuHandler(item.name, item.current)}>
                                        <Link
                                            to={item.href}
                                            key={item.name}
                                            className={classNames(
                                                item.current
                                                    ? 'bg-gray-50 text-orange-600 hover:bg-white'
                                                    : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50',
                                                'group rounded-md px-3 py-2 flex items-center text-sm font-medium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            <item.icon
                                                className={classNames(
                                                    item.current ? 'text-orange-500' : 'text-gray-400 group-hover:text-gray-500',
                                                    'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                                                )}
                                                aria-hidden="true"
                                            />
                                            <span className="truncate">{item.name}</span>
                                        </Link>
                                    </div>
                                ))}
                            </nav>
                        </aside>
                        <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
                            <DashboardContent user={user} activeMenu={props.active} />
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    )
}

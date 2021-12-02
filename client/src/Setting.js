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
    BellIcon,
    CogIcon,
    CreditCardIcon,
    KeyIcon,
    MenuIcon,
    UserCircleIcon,
    ViewGridAddIcon,
    XIcon,
} from '@heroicons/react/outline'

import Navbar from './shared/components/Navbar';
import Footer from './shared/components/Footer';

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
    { name: 'My Profile', href: '#', icon: UserCircleIcon, current: true },
    { name: 'Account', href: '#', icon: CogIcon, current: false },
    // { name: 'Password', href: '#', icon: KeyIcon, current: false },
    // { name: 'Notifications', href: '#', icon: BellIcon, current: false },
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

export default function Example() {
    const [selectedPlan, setSelectedPlan] = useState(plans[1])
    const [annualBillingEnabled, setAnnualBillingEnabled] = useState(true)

    return (
        <>
            <Navbar />
            <div className="h-full">
                <main className="max-w-7xl mx-auto pb-10 lg:py-12 lg:px-8">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
                        <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
                            <nav className="space-y-1">
                                {subNavigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
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
                                    </a>
                                ))}
                            </nav>
                        </aside>

                        {/* Payment details */}
                        <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
                            <section aria-labelledby="payment-details-heading">
                                <form action="#" method="POST">
                                    <div className="shadow sm:rounded-md sm:overflow-hidden">
                                        <div className="bg-white py-6 px-4 sm:p-6">
                                            <div>
                                                <h2 id="payment-details-heading" className="text-lg leading-6 font-medium text-gray-900 mb-8">
                                                    User Details
                                                </h2>
                                            </div>
                                            <div className="flex flex-col items-center mb-16">
                                                <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
                                                    <p className="text-sm font-medium text-gray-700 text-center mb-4" aria-hidden="true">
                                                        Profile Picture
                                                    </p>
                                                    <div className="mt-1 lg:hidden">
                                                        <div className="flex items-center">
                                                            <div
                                                                className="flex-shrink-0 inline-block rounded-full overflow-hidden h-12 w-12"
                                                                aria-hidden="true"
                                                            >
                                                                <img className="rounded-full h-full w-full" src={user.imageUrl} alt="" />
                                                            </div>
                                                            <div className="ml-5 rounded-md shadow-sm">
                                                                <div className="group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500">
                                                                    <label
                                                                        htmlFor="mobile-user-photo"
                                                                        className="relative text-sm leading-4 font-medium text-gray-700 pointer-events-none"
                                                                    >
                                                                        <span>Change</span>
                                                                        <span className="sr-only"> user photo</span>
                                                                    </label>
                                                                    <input
                                                                        id="mobile-user-photo"
                                                                        name="user-photo"
                                                                        type="file"
                                                                        className="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="hidden relative rounded-full overflow-hidden lg:block">
                                                        <img className="relative rounded-full w-40 h-40" src={user.imageUrl} alt="" />
                                                        <label
                                                            htmlFor="desktop-user-photo"
                                                            className="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
                                                        >
                                                            <span>Change</span>
                                                            <span className="sr-only"> user photo</span>
                                                            <input
                                                                type="file"
                                                                id="desktop-user-photo"
                                                                name="user-photo"
                                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-6 grid grid-cols-4 gap-6">
                                                <div className="col-span-4 sm:col-span-2">
                                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                        First name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="first-name"
                                                        id="first-name"
                                                        autoComplete="cc-given-name"
                                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                                        placeholder="Ignaz"
                                                        disabled
                                                    />
                                                </div>

                                                <div className="col-span-4 sm:col-span-2">
                                                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                        Last name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="last-name"
                                                        id="last-name"
                                                        autoComplete="cc-family-name"
                                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                                        placeholder="Maula"
                                                        disabled
                                                    />
                                                </div>

                                                <div className="col-span-4 sm:col-span-2">
                                                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                                        Email address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="email-address"
                                                        id="email-address"
                                                        autoComplete="email"
                                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                                        placeholder="ignazmaula@gmail.com"
                                                        disabled
                                                    />
                                                </div>

                                                <div className="col-span-4 sm:col-span-1">
                                                    <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                                                        Username
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="expiration-date"
                                                        id="expiration-date"
                                                        autoComplete="cc-exp"
                                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                                        placeholder="ignazmaula169"
                                                        disabled
                                                    />
                                                </div>

                                                <div className="col-span-4 sm:col-span-1">
                                                    <label
                                                        htmlFor="security-code"
                                                        className="flex items-center text-sm font-medium text-gray-700"
                                                    >
                                                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                                            Role
                                                        </label>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="security-code"
                                                        id="security-code"
                                                        autoComplete="cc-csc"
                                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                                        placeholder="Service Client"
                                                        disabled
                                                    />
                                                </div>

                                                <div className="col-span-4 sm:col-span-2">
                                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                        Location
                                                    </label>
                                                    <select
                                                        id="country"
                                                        name="country"
                                                        autoComplete="country-name"
                                                        className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                                    >
                                                        <option>Jakarta</option>
                                                        <option>Surabaya</option>
                                                        <option>Bali</option>
                                                    </select>
                                                </div>

                                                <div className="col-span-4 sm:col-span-2">
                                                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                                                        ZIP / Postal code
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="postal-code"
                                                        id="postal-code"
                                                        autoComplete="postal-code"
                                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                            <button
                                                type="submit"
                                                className="bg-blue-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900"
                                            >
                                                Edit Details
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </section>

                            {/* Plan */}
                            <section aria-labelledby="plan-heading">
                                <form action="#" method="POST">
                                    <div className="shadow sm:rounded-md sm:overflow-hidden">
                                        <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                                            <div>
                                                <h2 id="plan-heading" className="text-lg leading-6 font-medium text-gray-900">
                                                    Plan
                                                </h2>
                                            </div>

                                            <RadioGroup value={selectedPlan} onChange={setSelectedPlan}>
                                                <RadioGroup.Label className="sr-only">Pricing plans</RadioGroup.Label>
                                                <div className="relative bg-white rounded-md -space-y-px">
                                                    {plans.map((plan, planIdx) => (
                                                        <RadioGroup.Option
                                                            key={plan.name}
                                                            value={plan}
                                                            className={({ checked }) =>
                                                                classNames(
                                                                    planIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                                                                    planIdx === plans.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                                                                    checked ? 'bg-orange-50 border-orange-200 z-10' : 'border-gray-200',
                                                                    'relative border p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-3 focus:outline-none'
                                                                )
                                                            }
                                                        >
                                                            {({ active, checked }) => (
                                                                <>
                                                                    <div className="flex items-center text-sm">
                                                                        <span
                                                                            className={classNames(
                                                                                checked ? 'bg-orange-500 border-transparent' : 'bg-white border-gray-300',
                                                                                active ? 'ring-2 ring-offset-2 ring-gray-900' : '',
                                                                                'h-4 w-4 rounded-full border flex items-center justify-center'
                                                                            )}
                                                                            aria-hidden="true"
                                                                        >
                                                                            <span className="rounded-full bg-white w-1.5 h-1.5" />
                                                                        </span>
                                                                        <RadioGroup.Label as="span" className="ml-3 font-medium text-gray-900">
                                                                            {plan.name}
                                                                        </RadioGroup.Label>
                                                                    </div>
                                                                    <RadioGroup.Description className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center">
                                                                        <span
                                                                            className={classNames(
                                                                                checked ? 'text-orange-900' : 'text-gray-900',
                                                                                'font-medium'
                                                                            )}
                                                                        >
                                                                            ${plan.priceMonthly} / mo
                                                                        </span>{' '}
                                                                        <span className={checked ? 'text-orange-700' : 'text-gray-500'}>
                                                                            (${plan.priceYearly} / yr)
                                                                        </span>
                                                                    </RadioGroup.Description>
                                                                    <RadioGroup.Description
                                                                        className={classNames(
                                                                            checked ? 'text-orange-700' : 'text-gray-500',
                                                                            'ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right'
                                                                        )}
                                                                    >
                                                                        {plan.limit}
                                                                    </RadioGroup.Description>
                                                                </>
                                                            )}
                                                        </RadioGroup.Option>
                                                    ))}
                                                </div>
                                            </RadioGroup>

                                            <Switch.Group as="div" className="flex items-center">
                                                <Switch
                                                    checked={annualBillingEnabled}
                                                    onChange={setAnnualBillingEnabled}
                                                    className={classNames(
                                                        annualBillingEnabled ? 'bg-orange-500' : 'bg-gray-200',
                                                        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors ease-in-out duration-200'
                                                    )}
                                                >
                                                    <span
                                                        aria-hidden="true"
                                                        className={classNames(
                                                            annualBillingEnabled ? 'translate-x-5' : 'translate-x-0',
                                                            'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                                        )}
                                                    />
                                                </Switch>
                                                <Switch.Label as="span" className="ml-3">
                                                    <span className="text-sm font-medium text-gray-900">Annual billing </span>
                                                    <span className="text-sm text-gray-500">(Save 10%)</span>
                                                </Switch.Label>
                                            </Switch.Group>
                                        </div>
                                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                            <button
                                                type="submit"
                                                className="bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </section>

                            {/* Billing history */}
                            <section aria-labelledby="billing-history-heading">
                                <div className="bg-white pt-6 shadow sm:rounded-md sm:overflow-hidden">
                                    <div className="px-4 sm:px-6">
                                        <h2 id="billing-history-heading" className="text-lg leading-6 font-medium text-gray-900">
                                            Billing history
                                        </h2>
                                    </div>
                                    <div className="mt-6 flex flex-col">
                                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                                <div className="overflow-hidden border-t border-gray-200">
                                                    <table className="min-w-full divide-y divide-gray-200">
                                                        <thead className="bg-gray-50">
                                                            <tr>
                                                                <th
                                                                    scope="col"
                                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                                >
                                                                    Date
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                                >
                                                                    Description
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                                >
                                                                    Amount
                                                                </th>
                                                                {/*
                                  `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
                                */}
                                                                <th
                                                                    scope="col"
                                                                    className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                                >
                                                                    <span className="sr-only">View receipt</span>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="bg-white divide-y divide-gray-200">
                                                            {payments.map((payment) => (
                                                                <tr key={payment.id}>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                        <time dateTime={payment.datetime}>{payment.date}</time>
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                        {payment.description}
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                        {payment.amount}
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                        <a href={payment.href} className="text-orange-600 hover:text-orange-900">
                                                                            View receipt
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    )
}

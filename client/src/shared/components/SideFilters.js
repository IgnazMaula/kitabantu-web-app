/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { ChevronDownIcon, FilterIcon, MinusSmIcon, PlusSmIcon, ViewGridIcon } from '@heroicons/react/solid'

const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false },
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
]
const subCategories = [
    { name: 'Newest', href: '#' },
    { name: 'Best Rating', href: '#' },
    { name: 'Price: Low to High', href: '#' },
    { name: 'Price: High to Low', href: '#' },
]
const filters = [
    {
        id: 'Filter by Provider Type',
        name: 'Filter by Provider Type',
        options: [
            { value: 'All', label: 'All', checked: true },
            { value: 'Individual', label: 'Individual', checked: false },
            { value: 'Group', label: 'Group', checked: false },
            { value: 'Corporation', label: 'Corporation', checked: false },
        ],
    },
    {
        id: 'Filter by Location',
        name: 'Filter by Location',
        options: [
            { value: 'All', label: 'All', checked: true },
            { value: 'Jakarta', label: 'Jakarta', checked: false },
            { value: 'Denpasar', label: 'Denpasar', checked: false },
            { value: 'Surabaya', label: 'Surabaya', checked: false },
        ],
    },
    {
        id: 'Filter by Category',
        name: 'Filter by Category',
        options: [
            { value: 'All', label: 'All', checked: true },
            { value: 'House Chores', label: 'House Chores', checked: false },
            { value: 'House Cleaning', label: 'House Cleaning', checked: false },
            { value: 'House Maintenance', label: 'House Maintenance', checked: false },
            { value: 'Home Décor', label: 'Home Décor', checked: false },
            { value: 'Home Appliances', label: 'Home Appliances', checked: false },
            { value: 'IT Support & Security', label: 'IT Support & Security', checked: false },
            { value: 'Day Care', label: 'Day Care', checked: false },
            { value: 'Student Needs', label: 'Student Needs', checked: false },
            { value: 'Health & Well-Being', label: 'Health & Well-Being', checked: false },
            { value: 'Pets & Animal', label: 'Pets & Animal', checked: false },
            { value: 'Vehicle Service', label: 'Vehicle Service', checked: false },
            { value: 'Cargo & Moving House', label: 'Cargo & Moving House', checked: false }
        ],
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    return (
        <div className="bg-white">
            <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                                <div className="px-4 flex items-center justify-between">
                                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                    <button
                                        type="button"
                                        className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                                        onClick={() => setMobileFiltersOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Filters */}
                                <form className="mt-4 border-t border-gray-200">
                                    <h3 className="sr-only">Categories</h3>
                                    <ul role="list" className="font-medium text-gray-900 px-2 py-3">
                                        {subCategories.map((category) => (
                                            <li key={category.name}>
                                                <a href={category.href} className="block px-2 py-3">
                                                    {category.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>

                                    {filters.map((section) => (
                                        <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-mx-2 -my-3 flow-root">
                                                        <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                                                            <span className="font-medium text-gray-900">{section.name}</span>
                                                            <span className="ml-6 flex items-center">
                                                                {open ? (
                                                                    <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                                                ) : (
                                                                    <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                                                )}
                                                            </span>
                                                        </Disclosure.Button>
                                                    </h3>
                                                    <Disclosure.Panel className="pt-6">
                                                        <div className="space-y-6">
                                                            {section.options.map((option, optionIdx) => (
                                                                <div key={option.value} className="flex items-center">
                                                                    <input
                                                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                        name={`${section.id}[]`}
                                                                        defaultValue={option.value}
                                                                        type="checkbox"
                                                                        defaultChecked={option.checked}
                                                                        className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                                                    />
                                                                    <label
                                                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                    >
                                                                        {option.label}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    ))}
                                </form>
                            </div>
                        </Transition.Child>
                    </Dialog>
                </Transition.Root>

                <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 px-14 border-b border-gray-200">

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Sort
                                        <ChevronDownIcon
                                            className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <Menu.Item key={option.name}>
                                                    {({ active }) => (
                                                        <a
                                                            href={option.href}
                                                            className={classNames(
                                                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            {option.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>

                            <button type="button" className="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500">
                                <span className="sr-only">View grid</span>
                                <ViewGridIcon className="w-5 h-5" aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filters</span>
                                <FilterIcon className="w-5 h-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pt-6 pb-24">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid gap-x-8 gap-y-10">
                            {/* Filters */}
                            <form className="hidden lg:block">
                                <h3 className="sr-only">Categories</h3>
                                <ul role="list" className="text-sm font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200">
                                    {subCategories.map((category) => (
                                        <li key={category.name}>
                                            <a href={category.href}>{category.name}</a>
                                        </li>
                                    ))}
                                </ul>

                                {filters.map((section) => (
                                    <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900">{section.name}</span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                                            ) : (
                                                                <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-4">
                                                        {section.options.map((option, optionIdx) => (
                                                            <div key={option.value} className="flex items-center">
                                                                <input
                                                                    id={`filter-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    defaultValue={option.value}
                                                                    type="checkbox"
                                                                    defaultChecked={option.checked}
                                                                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                                                />
                                                                <label
                                                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                    className="ml-3 text-sm text-gray-600"
                                                                >
                                                                    {option.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </form>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}



// import React, { useState } from "react"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import {
//     faChevronDown,
//     faChevronUp,
//     faSlidersH,
// } from "@fortawesome/free-solid-svg-icons"

// import FormGroup from "../components/FormGroup"
// import RadioGroup from "../components/RadioGroup"
// import CheckboxGroup from "../components/CheckboxGroup"

// const dietaryRestrictions = [
//     { label: "Organic", name: "organic" },
//     {
//         label: "Gluten Free",
//         name: "gluten-free",
//     },
//     {
//         label: "Kosher",
//         name: "kosher",
//     },
//     {
//         label: "Paleo",
//         name: "paleo",
//     },
//     {
//         label: "Vegan",
//         name: "vegan",
//     },
//     {
//         label: "Halal",
//         name: "halal",
//     },
// ]

// function SideFilters() {
//     const [filtersOpen, setFiltersOpen] = useState(false)
//     const [sortOpen, setSortOpen] = useState(true)
//     const [dietaryOpen, setDietaryOpen] = useState(true)
//     const DietChecks = dietaryRestrictions.map(d => (
//         <FormGroup>
//             <CheckboxGroup key={d.name} label={d.label} name={d.name} />
//         </FormGroup>
//     ))
//     return (
//         <div className="w-full lg:w-60 relative">
//             <div
//                 className="py-3 bg-white w-full flex items-center justify-center lg:hidden cursor-pointer font-bold"
//                 onClick={() => setFiltersOpen(!filtersOpen)}
//             >
//                 Change Filters{" "}
//                 <FontAwesomeIcon icon={faSlidersH} className="text-xl ml-2" />
//             </div>
//             <div
//                 className={`${filtersOpen ? "flex" : "hidden"
//                     } absolute left-0 pr-6 lg:px-auto bg-white w-full lg:w-auto z-50 mt-10 lg:mt-0 lg:sticky top-0 pt-6 pb-24 lg:flex flex-col lg:max-h-screen`}
//             >
//                 <div className="border-b border-gray-300">
//                     <a className="text-sm font-bold text-blue-400 underline">
//                         Change Address
//                     </a>
//                     <FormGroup>
//                         <RadioGroup
//                             name="service"
//                             radios={[
//                                 {
//                                     value: "delivery",
//                                     label: "Delivery",
//                                     checked: true,
//                                 },
//                                 {
//                                     value: "curbside",
//                                     label: "Curbside",
//                                 },
//                                 {
//                                     value: "orderin",
//                                     label: "Order In",
//                                 },
//                             ]}
//                         />
//                     </FormGroup>
//                 </div>
//                 <div className="flex-1">
//                     <div className="border-b border-gray-300 py-6">
//                         <div
//                             className="flex items-center justify-between cursor-pointer"
//                             onClick={() => setSortOpen(!sortOpen)}
//                         >
//                             <h5 className="text-sm font-bold">Sort</h5>
//                             <FontAwesomeIcon
//                                 icon={sortOpen ? faChevronUp : faChevronDown}
//                                 className="text-blue-400 text-base"
//                             />
//                         </div>
//                         {sortOpen && (
//                             <FormGroup>
//                                 <RadioGroup
//                                     name="sort"
//                                     radios={[
//                                         {
//                                             value: "distance",
//                                             label: "Distance",
//                                         },
//                                         {
//                                             value: "popular",
//                                             label: "Popularity",
//                                         },
//                                         {
//                                             value: "topRated",
//                                             label: "Top Rated",
//                                             checked: true,
//                                         },
//                                         {
//                                             value: "atoz",
//                                             label: "A to Z",
//                                         },
//                                     ]}
//                                 />
//                             </FormGroup>
//                         )}
//                     </div>
//                     <div className="border-b border-gray-300 py-6">
//                         <div
//                             className="flex items-center justify-between cursor-pointer"
//                             onClick={() => setDietaryOpen(!dietaryOpen)}
//                         >
//                             <h5 className="text-sm font-bold">Dietary</h5>
//                             <FontAwesomeIcon
//                                 icon={dietaryOpen ? faChevronUp : faChevronDown}
//                                 className="text-blue-400 text-base"
//                             />
//                         </div>
//                         {dietaryOpen && DietChecks}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default SideFilters
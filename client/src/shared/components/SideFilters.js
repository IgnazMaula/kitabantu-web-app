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
import { Fragment, useState } from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { ChevronDownIcon, FilterIcon, MinusSmIcon, PlusSmIcon, ViewGridIcon } from '@heroicons/react/solid';

const sortBy = {
    id: 'Sort Services',
    name: 'Sort Services',
    options: [
        { value: 'Default', label: 'Default', checked: true },
        { value: 'Newer Service', label: 'Newer Service', checked: false },
        { value: 'Ascending', label: 'Ascending', checked: false },
        { value: 'Descending', label: 'Descending', checked: false },
        { value: 'Most Popular', label: 'Most Popular', checked: false },
        // { value: 'Best Rating', label: 'Best Rating', checked: false },
    ],
};

const location = {
    id: 'Filter Service by Provider Location',
    name: 'Filter Service by Provider Location',
    options: [
        { value: 'All', label: 'All', checked: true },
        { value: 'Jakarta', label: 'Jakarta', checked: false },
        { value: 'Bali', label: 'Bali', checked: false },
        { value: 'Surabaya', label: 'Surabaya', checked: false },
    ],
};

const providerType = {
    id: 'Filter by Provider Type',
    name: 'Filter by Provider Type',
    options: [
        { value: 'All', label: 'All', checked: true },
        { value: 'Individual', label: 'Individual', checked: false },
        { value: 'Group', label: 'Group', checked: false },
        { value: 'Corporation', label: 'Corporation', checked: false },
    ],
};

const category = {
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
        { value: 'Cargo & Moving House', label: 'Cargo & Moving House', checked: false },
    ],
};

const filters = [];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function SideFilters(props) {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const locationHandler = (e) => {
        console.log(e.target.value);
        props.setLocation(e.target.value);
    };

    const providerTypeHandler = (e) => {
        console.log(e.target.value);
        props.setProviderType(e.target.value);
    };

    const sortTypeHandler = (e) => {
        console.log(e.target.value);
        props.setSortType(e.target.value);
        console.log('aa');
    };

    return (
        <div className='bg-white'>
            <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as='div' className='fixed inset-0 flex z-40 lg:hidden' onClose={setMobileFiltersOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter='transition-opacity ease-linear duration-300'
                            enterFrom='opacity-0'
                            enterTo='opacity-100'
                            leave='transition-opacity ease-linear duration-300'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                        >
                            <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-25' />
                        </Transition.Child>

                        <Transition.Child
                            as={Fragment}
                            enter='transition ease-in-out duration-300 transform'
                            enterFrom='translate-x-full'
                            enterTo='translate-x-0'
                            leave='transition ease-in-out duration-300 transform'
                            leaveFrom='translate-x-0'
                            leaveTo='translate-x-full'
                        >
                            <div className='ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-6 flex flex-col overflow-y-auto'>
                                <div className='px-4 flex items-center justify-between'>
                                    <h2 className='text-lg font-medium text-gray-900'>Filters</h2>
                                    <button
                                        type='button'
                                        className='-mr-2 w-10 h-10 p-2 flex items-center justify-center text-gray-400 hover:text-gray-500'
                                        onClick={() => setMobileFiltersOpen(false)}
                                    >
                                        <span className='sr-only'>Close menu</span>
                                        <XIcon className='h-6 w-6' aria-hidden='true' />
                                    </button>
                                </div>

                                <form className='mt-4'>
                                    {filters.map((section) => (
                                        <Disclosure as='div' key={section.name} className='border-t border-gray-200 pt-4 pb-4'>
                                            {({ open }) => (
                                                <fieldset>
                                                    <legend className='w-full px-2'>
                                                        <Disclosure.Button className='w-full p-2 flex items-center justify-between text-gray-400 hover:text-gray-500'>
                                                            <span className='text-sm font-medium text-gray-900'>{section.name}</span>
                                                            <span className='ml-6 h-7 flex items-center'>
                                                                <ChevronDownIcon
                                                                    className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                                                                    aria-hidden='true'
                                                                />
                                                            </span>
                                                        </Disclosure.Button>
                                                    </legend>
                                                    <Disclosure.Panel className='pt-4 pb-2 px-4'>
                                                        <div className='space-y-6'>
                                                            {section.options.map((option, optionIdx) => (
                                                                <div key={option.value} className='flex items-center'>
                                                                    <input
                                                                        id={`${section.id}-${optionIdx}-mobile`}
                                                                        name={`${section.id}[]`}
                                                                        defaultValue={option.value}
                                                                        type='checkbox'
                                                                        className='h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500'
                                                                    />
                                                                    <label
                                                                        htmlFor={`${section.id}-${optionIdx}-mobile`}
                                                                        className='ml-3 text-sm text-gray-500'
                                                                    >
                                                                        {option.label}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </Disclosure.Panel>
                                                </fieldset>
                                            )}
                                        </Disclosure>
                                    ))}
                                </form>
                            </div>
                        </Transition.Child>
                    </Dialog>
                </Transition.Root>

                <main className='max-w-2xl mx-auto py-16 px-4 sm:px-24 lg:max-w-7xl lg:px-8'>
                    <div className='pb-10 px-24'>{/* <h1 className='text-4xl font-extrabold tracking-tight text-gray-900'>New Arrivals</h1> */}</div>

                    <div className='pt-12 lg:grid lg:grid-cols-1 xl:grid-cols-1'>
                        <aside>
                            <h2 className='sr-only'>Filters</h2>

                            <button type='button' className='inline-flex items-center lg:hidden' onClick={() => setMobileFiltersOpen(true)}>
                                <span className='text-sm font-medium text-gray-700'>Filters</span>
                                <PlusSmIcon className='flex-shrink-0 ml-1 h-5 w-5 text-gray-400' aria-hidden='true' />
                            </button>

                            <div className='hidden lg:block'>
                                <form className='divide-y divide-gray-200 space-y-10'>
                                    <div>
                                        <fieldset>
                                            {/* Sort By */}
                                            <legend className='block text-sm font-medium text-gray-900'>{sortBy.name}</legend>
                                            <div className='pt-6 pb-8 space-y-3'>
                                                {sortBy.options.map((option) => (
                                                    <div key={option.value} className='flex items-center'>
                                                        <input
                                                            id={sortBy.id}
                                                            name={sortBy.name}
                                                            defaultValue={option.value}
                                                            defaultChecked={option.checked}
                                                            onChange={sortTypeHandler}
                                                            type='radio'
                                                            className='h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500'
                                                        />
                                                        <label htmlFor={``} className='ml-3 text-sm text-gray-600'>
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                                <br />
                                                <hr />
                                            </div>
                                            {/* Location */}
                                            <legend className='block text-sm font-medium text-gray-900'>{location.name}</legend>
                                            <div className='pt-6 pb-8 space-y-3'>
                                                {location.options.map((option) => (
                                                    <div key={option.value} className='flex items-center'>
                                                        <input
                                                            id={location.id}
                                                            name={location.name}
                                                            defaultValue={option.value}
                                                            defaultChecked={option.checked}
                                                            onChange={locationHandler}
                                                            type='radio'
                                                            className='h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500'
                                                        />
                                                        <label htmlFor={``} className='ml-3 text-sm text-gray-600'>
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                                <br />
                                                <hr />
                                            </div>
                                            {/* Provider Type */}
                                            <legend className='block text-sm font-medium text-gray-900'>{providerType.name}</legend>
                                            <div className='pt-6 pb-8 space-y-3'>
                                                {providerType.options.map((option) => (
                                                    <div key={option.value} className='flex items-center'>
                                                        <input
                                                            id={providerType.id}
                                                            name={providerType.name}
                                                            defaultValue={option.value}
                                                            defaultChecked={option.checked}
                                                            onChange={providerTypeHandler}
                                                            type='radio'
                                                            className='h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500'
                                                        />
                                                        <label htmlFor={``} className='ml-3 text-sm text-gray-600'>
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                                <br />
                                                <hr />
                                            </div>
                                            {/* Category */}
                                            <legend className='block text-sm font-medium text-gray-900'>{category.name}</legend>
                                            <div className='pt-6 pb-8 space-y-3'>
                                                {category.options.map((option) => (
                                                    <div key={option.value} className='flex items-center'>
                                                        <input
                                                            id={category.id}
                                                            name={category.name}
                                                            defaultValue={option.value}
                                                            defaultChecked={option.checked}
                                                            onChange={locationHandler}
                                                            type='radio'
                                                            className='h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500'
                                                        />
                                                        <label htmlFor={``} className='ml-3 text-sm text-gray-600'>
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                                <br />
                                            </div>

                                            <br />
                                            <br />
                                        </fieldset>
                                    </div>
                                </form>
                            </div>
                        </aside>

                        {/* Product grid */}
                        <div>
                            {/* Replace with your content */}
                            {/* /End replace */}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { MenuIcon, UserCircleIcon, StarIcon, XIcon } from '@heroicons/react/outline'
import { NavLink } from 'react-router-dom'

import DropdownMenu from './DropdownMenu';

const navigation = {
  categories: [
    {
      id: 'Categories',
      name: 'Categories',

      sections: [
        {
          id: 'House Chores',
          name: 'House Chores',
          items: [
            { name: 'Home Cook', href: '#' },
            { name: 'Dishwashing', href: '#' },
            { name: 'Laundry', href: '#' },
            { name: 'Delivery', href: '#' },
          ],
        },
        {
          id: 'House Cleaning & Organizing ',
          name: 'House Cleaning & Organizing ',
          items: [
            { name: 'House Cleaning', href: '#' },
            { name: 'House Handyman', href: '#' },
            { name: 'House Disinfecting', href: '#' },
          ],
        },
        {
          id: 'Home Décor & Furnitures',
          name: 'Home Décor & Furnitures',
          items: [
            { name: 'Furnitures', href: '#' },
            { name: 'Wallpaper', href: '#' },
            { name: 'Cushion', href: '#' },
            { name: 'Floor Mat', href: '#' },
            { name: 'Window Curtain', href: '#' },
            { name: 'Misc. Décor & Furnitures', href: '#' },
          ],
        },
        {
          id: 'Home Appliances',
          name: 'Home Appliances',
          items: [
            { name: 'TV', href: '#' },
            { name: 'Home Appliances', href: '#' },
            { name: 'AC', href: '#' },
            { name: 'Fan', href: '#' },
            { name: 'Kitchen Appliances', href: '#' },
            { name: 'Washing Machine', href: '#' },
            { name: 'Misc. Home Appliances', href: '#' },
          ],
        },
        {
          id: 'IT Support & Security',
          name: 'IT Support & Security',
          items: [
            { name: 'Home Internet Installation', href: '#' },
            { name: 'CCTV & Surveillance', href: '#' },
            { name: 'IT Device Service', href: '#' },
          ],
        },
        {
          id: 'House Maintenance & Repair',
          name: 'House Maintenance & Repair',
          items: [
            { name: 'Builder', href: '#' },
            { name: 'Plumber', href: '#' },
            { name: 'Waste Management', href: '#' },
            { name: 'Electrician', href: '#' },
            { name: 'Gardener', href: '#' },
            { name: 'Welder', href: '#' },
            { name: 'Locksmith', href: '#' },
            { name: 'Pest Control', href: '#' },
            { name: 'Pool Cleaning', href: '#' },
            { name: 'Façade Cleaning', href: '#' },
          ],
        },
        {
          id: 'Day Care',
          name: 'Day Care',
          items: [
            { name: 'Babysitter', href: '#' },
            { name: 'Child Day Care', href: '#' },
            { name: 'Elderly Care', href: '#' },
            { name: 'Special Needs Care', href: '#' },
          ],
        },
        {
          id: 'Student Needs',
          name: 'Student Needs',
          items: [
            { name: 'Home Tutorship', href: '#' },
            { name: 'Student School Shuttle', href: '#' },
          ],
        },
        {
          id: 'Health & Well-Being',
          name: 'Health & Well-Being',
          items: [
            { name: 'Masseur', href: '#' },
            { name: 'Health Check-Up', href: '#' },
          ],
        },
        {
          id: 'Pets & Animal',
          name: 'Pets & Animal',
          items: [
            { name: 'Pet Day Care', href: '#' },
            { name: 'Aquatic Pet', href: '#' },
            { name: 'Bird Care', href: '#' },
            { name: 'Reptile Care', href: '#' },
            { name: 'Veterinarian ', href: '#' },
          ],
        },
        {
          id: 'Vehicle Service & Maintenance',
          name: 'Vehicle Service & Maintenance',
          items: [
            { name: 'Mechanic', href: '#' },
            { name: 'Vehicle Cleaning', href: '#' },
          ],
        },
        {
          id: 'Cargo & Moving House',
          name: 'Cargo & Moving House',
          items: [
            { name: 'Cargo Service', href: '#' },
            { name: 'Moving House Service', href: '#' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'About Us', href: '/aboutus' },
    { name: 'Become Service Provider', href: '/becomeprovider' },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setOpen}>
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
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 pt-5 pb-2 flex">
                <button
                  type="button"
                  className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Links */}
              <Tab.Group as="div" className="mt-2">
                <div className="border-b border-gray-200">
                  <Tab.List className="-mb-px flex px-4 space-x-8">
                    {navigation.categories.map((category) => (
                      <Tab
                        key={category.name}
                        className={({ selected }) =>
                          classNames(
                            selected ? 'text-red-600 border-red-600' : 'text-gray-900 border-transparent',
                            'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
                          )
                        }
                      >
                        {category.name}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>
                <Tab.Panels as={Fragment}>
                  {navigation.categories.map((category) => (
                    <Tab.Panel key={category.name} className="pt-10 pb-8 px-4 space-y-10">
                      {category.sections.map((section) => (
                        <div key={section.name}>
                          <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                            {section.name}
                          </p>
                          <ul
                            role="list"
                            aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                            className="mt-6 flex flex-col space-y-6"
                          >
                            {section.items.map((item) => (
                              <li key={item.name} className="flow-root">
                                <a href={item.href} className="-m-2 p-2 block text-gray-500">
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                {navigation.pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <NavLink to={page.href} className="-m-2 p-2 block font-medium text-gray-900">
                      {page.name}
                    </NavLink>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                <div className="flow-root">
                  <a href="#" className="-m-2 p-2 block font-medium text-gray-900">
                    Sign in
                  </a>
                </div>
                <div className="flow-root">
                  <a href="#" className="-m-2 p-2 block font-medium text-gray-900">
                    Create account
                  </a>
                </div>
              </div>

              <div className="border-t border-gray-200 py-6 px-4">
                <a href="#" className="-m-2 p-2 flex items-center">
                  <img
                    src="https://tailwindui.com/img/flags/flag-canada.svg"
                    alt=""
                    className="w-5 h-auto block flex-shrink-0"
                  />
                  <span className="ml-3 block text-base font-medium text-gray-900">IDR</span>
                  <span className="sr-only">, change currency</span>
                </a>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <p className="bg-red-800 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
          Service Provider Account
        </p>

        <nav aria-label="Top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="h-16 flex items-center">
              <button
                type="button"
                className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <NavLink to="/">
                  <span className="sr-only">Workflow</span>
                  <img
                    className="h-8 w-auto"
                    src="../images/icon.png"
                    alt="Kita Bantu"
                  />
                </NavLink>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="h-full flex space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-red-600 text-red-600'
                                  : 'border-transparent text-gray-700 hover:text-gray-800',
                                'relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px'
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute top-full inset-x-0 text-sm text-gray-500 z-10">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                              <div className="relative bg-white">
                                <div className="max-w-7xl mx-auto px-8">
                                  <div className="grid grid-cols-1 gap-y-10 gap-x-8 py-16">
                                    {/* <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div key={item.name} className="group relative text-base sm:text-sm">
                                          <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-center object-cover"
                                            />
                                          </div>
                                          <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                            <span className="absolute z-10 inset-0" aria-hidden="true" />
                                            {item.name}
                                          </a>
                                          <p aria-hidden="true" className="mt-1">
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div> */}
                                    <div className="row-start-1 grid grid-cols-6 gap-y-10 gap-x-8 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li key={item.name} className="flex">
                                                <a href={item.href} className="hover:text-gray-800">
                                                  {item.name}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <NavLink to="/dashboard" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Sign in
                  </NavLink>
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  <NavLink to="/register" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Create account
                  </NavLink>
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <a href="#" className="text-gray-700 hover:text-gray-800 flex items-center">
                    <img
                      src="../images/indonesia.png"
                      alt=""
                      className="w-5 h-auto block flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">IDR</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <DropdownMenu />
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <a href="#" className="group -m-2 p-2 flex items-center">
                    <StarIcon
                      className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

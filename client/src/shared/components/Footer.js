import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Footer() {
    return (
        <>
            <hr />
            <div className='px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8'>
                <div className='grid gap-16 row-gap-10 mb-8 lg:grid-cols-6'>
                    <div className='md:max-w-md lg:col-span-2'>
                        <a href='#'>
                            <span className='sr-only'>Workflow</span>
                            <img className='h-12 w-auto' src='../images/icon.png' alt='' />
                        </a>
                        <div className='mt-4 lg:max-w-sm'>
                            <p className='text-sm text-gray-800'>
                                KitaBantu is a platform for home service workers to offer services to clients. KitaBantu means “We Help” (translated
                                from Indonesian), this is because we envision the platform to help home service workers get a wider market as well as
                                to help the general public to get home service easily anywhere and anytime.
                            </p>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4'>
                        <div>
                            <p className='font-semibold tracking-wide text-gray-800'>Category</p>
                            <ul className='mt-2 space-y-2'>
                                <li>
                                    <a href='/' className='text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400'>
                                        House Chores
                                    </a>
                                </li>
                                <li>
                                    <a href='/' className='text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400'>
                                        House Cleaning
                                    </a>
                                </li>
                                <li>
                                    <a href='/' className='text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400'>
                                        House Maintenance
                                    </a>
                                </li>
                                <li>
                                    <a href='/' className='text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400'>
                                        Home Décor
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            {/* <p className="font-semibold tracking-wide text-gray-800">
              Home Appliances
            </p> */}
                            <ul className='space-y-2'>
                                <li>
                                    <a href='/' className='text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400'>
                                        Home Appliances
                                    </a>
                                </li>
                                <li>
                                    <a href='/' className='text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400'>
                                        IT Support & Security
                                    </a>
                                </li>
                                <li>
                                    <a href='/' className='text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400'>
                                        Day Care
                                    </a>
                                </li>
                                <li>
                                    <a href='/' className='text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400'>
                                        Student Needs
                                    </a>
                                </li>
                                <li>
                                    <a href='/' className='text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400'>
                                        Health & Well-Being
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul className='space-y-2'>
                                <li>
                                    <a href='/' className='text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400'>
                                        Pets & Animal
                                    </a>
                                </li>
                                <li>
                                    <a href='/' className='text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400'>
                                        Vehicle Service & Maintenance
                                    </a>
                                </li>
                                <li>
                                    <a href='/' className='text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400'>
                                        Cargo & Moving House
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <p className='font-semibold tracking-wide text-gray-800'>Other Page</p>
                            <ul className='mt-2 space-y-2'>
                                <li>
                                    <a href='/' className='text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400'>
                                        <NavLink to={'/aboutus'}>About Us</NavLink>
                                    </a>
                                </li>
                                <li>
                                    <a href='/' className='text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400'>
                                        Become Provider
                                    </a>
                                </li>
                                <li>
                                    <a href='/' className='text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400'>
                                        Sign Up
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='https://github.com/IgnazMaula/kitabantu-web-app'
                                        target='_blank'
                                        rel='noreferrer'
                                        className='text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400'
                                    >
                                        Github Repo
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-between pt-5 pb-10 border-t sm:flex-row'>
                    <p className='text-sm text-gray-600'>© Copyright 2021 KitaBantu Inc. All rights reserved.</p>
                </div>
            </div>
        </>
    );
}

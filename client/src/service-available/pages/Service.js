import { Fragment, useState, useEffect, useContext } from 'react';
import { StarIcon, ChevronRightIcon, BookmarkIcon, BookmarkAltIcon, InboxIcon, InboxInIcon } from '@heroicons/react/solid';
import { Tab } from '@headlessui/react';
import { useParams } from 'react-router';

import ProviderProfile from '../components/ProviderProfile';
import Navbar from '../../shared/components/Navbar';
import Footer from '../../shared/components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import { services } from '../../services';
import { AuthContext } from '../../shared/context/auth-context';
import Badge from '../../shared/components/Badge';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import { NavLink } from 'react-router-dom';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Service() {
    const auth = useContext(AuthContext);
    const sid = useParams().sid;
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState([]);
    const [service, setService] = useState([]);
    const [properties, setProperties] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [clients, setClients] = useState([]);
    useEffect(() => {
        const getService = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/services/${sid}`);
                const responseData = await response.json();
                // if (auth.loggedUser !== undefined) {
                //     const responseUser = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/users/${auth.loggedUser.id}`);
                //     const responseDataUser = await responseUser.json();
                //     setUser(responseDataUser.user);
                // }
                setService(responseData.service);
                setProperties(responseData.service.properties);
                const responseR = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/orders/service/${sid}/review`);
                const responseDataR = await responseR.json();
                setReviews(responseDataR.orders);
                const responseC = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/users`);
                const responseDataC = await responseC.json();
                setClients(responseDataC.users);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        };
        getService();
    }, []);
    useEffect(() => {
        const getService = async () => {
            try {
                if (auth.loggedUser !== undefined) {
                    const responseUser = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/users/${auth.loggedUser.id}`);
                    const responseDataUser = await responseUser.json();
                    setUser(responseDataUser.user);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getService();
    }, []);

    const addBookmarkHandler = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/users/update/add-bookmarks/${auth.loggedUser.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    serviceId: sid,
                }),
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }
            const responseUser = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/users/${auth.loggedUser.id}`);
            const responseDataUser = await responseUser.json();
            setUser(responseDataUser.user);
        } catch (error) {
            console.log(error);
        }
    };

    const removeBookmarkHandler = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/users/update/remove-bookmarks/${auth.loggedUser.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    serviceId: sid,
                }),
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }
            const responseUser = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/users/${auth.loggedUser.id}`);
            const responseDataUser = await responseUser.json();
            setUser(responseDataUser.user);
        } catch (error) {
            console.log(error);
        }
    };
    const getUserName = (userId) => {
        let name = '';
        clients.forEach((user) => {
            if (userId === user.id) {
                name = user.name;
            }
        });
        return name;
    };
    const getUserImage = (userId) => {
        let image = '';
        clients.forEach((user) => {
            if (userId === user.id) {
                image = user.image;
            }
        });
        return image;
    };
    return (
        <>
            <Navbar />
            <div className='bg-white'>
                {isLoading ? (
                    <div className='text-center p-24'>
                        <LoadingSpinner />
                    </div>
                ) : (
                    <div className='mx-auto py-12 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8'>
                        <div className='pb-8'>
                            <Breadcrumbs name={service.name} category={service.category} />
                        </div>
                        {/* Product */}
                        <div className='lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16'>
                            {/* Product image */}
                            <div className='lg:row-end-1 lg:col-span-4'>
                                <div className='aspect-w-4 aspect-h-3 w-full h-96 rounded-lg bg-gray-100 overflow-hidden'>
                                    <img
                                        src={`${process.env.REACT_APP_BACKEND_URL}${service.image}`}
                                        alt={service.name}
                                        className='object-right object-cover h-full w-full'
                                    />
                                </div>
                            </div>

                            {/* Product details */}
                            <div className='max-w-2xl mx-auto mt-14 sm:mt-16 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3'>
                                <div className='flex flex-col-reverse'>
                                    <div className='mt-4'>
                                        <h1 className='text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl'>{service.name}</h1>
                                        {service.subCategory === 'AC' && (
                                            <span
                                                className={`inline-flex items-center px-3 mt-4 py-0.5 rounded-full text-sm font-medium bg-yellow-300 text-gray-800`}
                                            >
                                                <StarIcon width={20} className='text-yellow-600'></StarIcon>
                                                {''} Signature Service
                                            </span>
                                        )}
                                        {service.subCategory === 'Plumber' && (
                                            <span
                                                className={`inline-flex items-center px-3 mt-4 py-0.5 rounded-full text-sm font-medium bg-yellow-300 text-gray-800`}
                                            >
                                                <StarIcon width={20} className='text-yellow-600'></StarIcon>
                                                {''} Signature Service
                                            </span>
                                        )}
                                        {service.subCategory === 'Electrician' && (
                                            <span
                                                className={`inline-flex items-center px-3 mt-4 py-0.5 rounded-full text-sm font-medium bg-yellow-300 text-gray-800`}
                                            >
                                                <StarIcon width={20} className='text-yellow-600'></StarIcon>
                                                {''} Signature Service
                                            </span>
                                        )}
                                        <h2 id='information-heading' className='sr-only'>
                                            Product information
                                        </h2>
                                        <div className='flex items-center'>
                                            <p className='mt-2 text-sm font-medium text-gray-500 hover:text-gray-700'>{service.category}</p>
                                            <ChevronRightIcon className='mt-3 flex-shrink-0 h-5 w-5 text-gray-400' aria-hidden='true' />
                                            <p className='mt-2 text-sm font-medium text-gray-500 hover:text-gray-700'>{service.subCategory}</p>
                                        </div>
                                    </div>

                                    {/* <div>
                                        <h3 className='sr-only'>Reviews</h3>
                                        <div className='flex items-center'>
                                            {[0, 1, 2, 3, 4].map((rating) => (
                                                <StarIcon
                                                    key={rating}
                                                    className={classNames(
                                                        reviews.average > rating ? 'text-yellow-400' : 'text-gray-300',
                                                        'h-5 w-5 flex-shrink-0'
                                                    )}
                                                    aria-hidden='true'
                                                />
                                            ))}
                                        </div>
                                        <p className='sr-only'>{reviews.average} out of 5 stars</p>
                                    </div> */}
                                </div>
                                {/* <p className='text-gray-500 mt-6'>{product.description}</p> */}
                                <div>
                                    <h1 className='mt-8 text-sm font-medium text-gray-500'>
                                        Starting at Rp. <span className='text-4xl font-bold text-black'>{service.price}</span>
                                        {service.unit}
                                    </h1>
                                </div>
                                <p className='mt-8 mb-5 text-sm font-medium text-gray-500 hover:text-gray-700'>{service.label}: </p>
                                {properties.map((p) => (
                                    <Badge name={p} className='ml-1 mb-2' />
                                ))}
                                <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2'>
                                    {user !== undefined && auth.loggedUser !== undefined && auth.loggedUser.role === 'Client' ? (
                                        <>
                                            {service.subCategory === 'AC' ||
                                            service.subCategory === 'Plumber' ||
                                            service.subCategory === 'Electrician' ? (
                                                <NavLink
                                                    to={`/service/${sid}/order/${service.subCategory.replaceAll(' ', '')}`}
                                                    className='w-full bg-green-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500'
                                                >
                                                    <InboxInIcon className='h-6 w-6 text-green-100' aria-hidden='true' />
                                                    Order Now
                                                </NavLink>
                                            ) : (
                                                <NavLink
                                                    to={`/service/${sid}/order`}
                                                    className='w-full bg-green-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500'
                                                >
                                                    <InboxInIcon className='h-6 w-6 text-green-100' aria-hidden='true' />
                                                    Order Now
                                                </NavLink>
                                            )}

                                            {user.bookmarks !== undefined && auth.loggedUser !== undefined && user.bookmarks.includes(sid) ? (
                                                <button
                                                    onClick={() => removeBookmarkHandler()}
                                                    type='button'
                                                    className='w-full bg-yellow-50 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-yellow-700 hover:bg-yellow-100'
                                                >
                                                    <BookmarkIcon className='h-6 w-6 text-yellow-600' aria-hidden='true' />
                                                    Remove Services
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => addBookmarkHandler()}
                                                    type='button'
                                                    className='w-full bg-green-50 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-green-700 hover:bg-green-100'
                                                >
                                                    <BookmarkIcon className='h-6 w-6 text-green-600' aria-hidden='true' />
                                                    Bookmark Services
                                                </button>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                disabled
                                                type='button'
                                                className='w-full bg-green-50 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-green-700  disabled:opacity-70 cursor-not-allowed'
                                            >
                                                <InboxInIcon className='h-6 w-6 text-green-600' aria-hidden='true' />
                                                Order Now
                                            </button>
                                            <button
                                                disabled
                                                type='button'
                                                className='w-full bg-green-50 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-green-700  disabled:opacity-70 cursor-not-allowed'
                                            >
                                                <BookmarkIcon className='h-6 w-6 text-green-600' aria-hidden='true' />
                                                Bookmark Service
                                            </button>
                                        </>
                                    )}
                                </div>
                                <div className='mt-10 pt-10'>
                                    <ProviderProfile providerId={service.serviceProvider} />
                                </div>
                            </div>

                            <div className='w-full max-w-2xl mx-auto mt-16 lg:max-w-none lg:mt-0 lg:col-span-4'>
                                <p className='text-md text-gray-700 my-5 text-justify'>
                                    <span className='font-bold'>Description: </span>
                                    {service.description}
                                </p>
                                <Tab.Group as='div'>
                                    <div className='border-b border-gray-200'>
                                        <Tab.List className='-mb-px flex space-x-8'>
                                            <Tab
                                                className={({ selected }) =>
                                                    classNames(
                                                        selected
                                                            ? 'border-red-600 text-red-600'
                                                            : 'border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300',
                                                        'whitespace-nowrap py-6 border-b-2 font-medium text-sm'
                                                    )
                                                }
                                            >
                                                Customer Reviews
                                            </Tab>
                                        </Tab.List>
                                    </div>
                                    <Tab.Panels as={Fragment}>
                                        <Tab.Panel className='-mb-10'>
                                            <h3 className='sr-only'>Customer Reviews</h3>

                                            {reviews.length > 0 ? (
                                                <>
                                                    {reviews.map((review, reviewIdx) => (
                                                        <div
                                                            key={review.id}
                                                            className='flex text-sm border-t border-gray-200 text-gray-500 space-x-4'
                                                        >
                                                            <div className='flex-none py-10'>
                                                                <img
                                                                    src={`${process.env.REACT_APP_BACKEND_URL}${getUserImage(review.client)}`}
                                                                    alt=''
                                                                    className='w-10 h-10 bg-gray-100 rounded-full'
                                                                />
                                                            </div>
                                                            <div className={classNames(reviewIdx === 0 ? '' : '', 'py-10')}>
                                                                <h3 className='font-medium text-gray-900'>{getUserName(review.client)}</h3>
                                                                <p>
                                                                    <time dateTime={review.datetime}>{review.date}</time>
                                                                </p>

                                                                <div className='flex items-center mt-4'>
                                                                    {[0, 1, 2, 3, 4].map((rating) => (
                                                                        <StarIcon
                                                                            key={rating}
                                                                            className={classNames(
                                                                                review.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                                                                                'h-5 w-5 flex-shrink-0'
                                                                            )}
                                                                            aria-hidden='true'
                                                                        />
                                                                    ))}
                                                                </div>
                                                                <p className='sr-only'>{review.rating} out of 5 stars</p>

                                                                <div
                                                                    className='mt-4 prose prose-sm max-w-none text-gray-500'
                                                                    dangerouslySetInnerHTML={{ __html: review.review }}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </>
                                            ) : (
                                                <p className='text-center mt-10'>No reviews for this service</p>
                                            )}
                                        </Tab.Panel>
                                    </Tab.Panels>
                                </Tab.Group>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

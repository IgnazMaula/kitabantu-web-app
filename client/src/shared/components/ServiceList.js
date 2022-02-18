import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import NavSearchMenu from './NavSearchMenu';
import SideFilters from './SideFilters';
// import Alert from "../components/Alert"
import ServiceCard from './ServiceCard';
import LoadingSpinner from './LoadingSpinner';

import Pagination from './Pagination';
import { Link } from 'react-router-dom';

export default function ServiceList() {
    let serviceAvailable = false;
    const [isLoading, setIsLoading] = useState(false);
    const [services, setServices] = useState([]);
    const [users, setUsers] = useState([]);

    const [keyWord, setKeyWord] = useState('');
    const [sortType, setSortType] = useState('Default');
    const [location, setLocation] = useState('All');
    const [providerType, setProviderType] = useState('All');
    const [category, setCategory] = useState('All');

    useEffect(() => {
        const getService = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('http://localhost:5000/api/services');
                const responseUser = await fetch(`http://localhost:5000/api/users/`);
                const responseData = await response.json();
                const responseDataUser = await responseUser.json();
                setServices(responseData.services);
                setUsers(responseDataUser.users);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        };
        getService();
    }, []);

    const getUserName = (userId) => {
        let name = '';
        users.forEach((user) => {
            if (userId === user.id) {
                name = user.name;
            }
        });
        return name;
    };
    const getLocation = (userId) => {
        let location = '';
        users.forEach((user) => {
            if (userId === user.id) {
                location = user.location;
            }
        });
        return location;
    };
    const filterLocation = (getLocation, location) => {
        if (location === 'All') {
            return true;
        } else {
            return getLocation === location;
        }
    };

    const getProviderType = (userId) => {
        let userType = '';
        users.forEach((user) => {
            if (userId === user.id) {
                userType = user.userType;
            }
        });
        return userType;
    };
    const filterProviderType = (getProviderType, providerType) => {
        if (providerType === 'All') {
            return true;
        } else {
            return getProviderType === providerType;
        }
    };
    const filterCategory = (getCategory, category) => {
        if (category === 'All') {
            return true;
        } else {
            return getCategory === category;
        }
    };

    const sortList = (a, b) => {
        if (sortType === 'Default') {
            return 1;
        } else if (sortType === 'Newer Service') {
            return -1;
        } else if (sortType === 'Ascending') {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
            }
        } else if (sortType === 'Descending') {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
            }
        } else if (sortType === 'Most Popular') {
            return 1;
        }
    };

    const serviceList = services
        .filter(
            (ss) =>
                ss.name.toLowerCase().includes(keyWord.toLowerCase()) ||
                ss.category.toLowerCase().includes(keyWord.toLowerCase()) ||
                ss.subCategory.toLowerCase().includes(keyWord.toLowerCase()) ||
                ss.description.toLowerCase().includes(keyWord.toLowerCase()) ||
                getLocation(ss.serviceProvider).toLowerCase().includes(keyWord.toLowerCase()) ||
                getUserName(ss.serviceProvider).toLowerCase().includes(keyWord.toLowerCase())
        )
        .filter((ss) => filterLocation(getLocation(ss.serviceProvider), location))
        .filter((ss) => filterProviderType(getProviderType(ss.serviceProvider), providerType))
        .filter((ss) => filterCategory(ss.category, category))
        .sort((a, b) => sortList(a, b))
        .map((s) => {
            const { id, image, name, rating, serviceProvider, location, category, subCategory, price, unit, status } = s;
            if (status === 'Active') {
                serviceAvailable = true;
                return (
                    <Link to={`/service/${id}`} key={id}>
                        <ServiceCard
                            key={name}
                            image={image}
                            className='mx-auto cursor-pointer h-full shadow-sm'
                            html={
                                <div className='text-sm'>
                                    <div className='h-14  '>
                                        <h3 className='font-bold text-base'>{name}</h3>
                                    </div>
                                    <div className='flex items-center text-yellow-400'>
                                        <FontAwesomeIcon icon={faStar} className='mr-2' /> {rating}
                                        <FontAwesomeIcon icon={faStar} className='mr-2' /> {rating}
                                        <FontAwesomeIcon icon={faStar} className='mr-2' /> {rating}
                                        <FontAwesomeIcon icon={faStar} className='mr-2' /> {rating}
                                        <FontAwesomeIcon icon={faStar} className='mr-2' /> {rating}
                                    </div>
                                    <p className='mt-1 text-green-600 font-bold'>{getUserName(serviceProvider)}</p>
                                    <p>
                                        {category} • {subCategory}
                                    </p>
                                    <p className='font-bold'>{location}</p>
                                    <p className='text-gray-400 mt-2'>
                                        {' '}
                                        Price starting at {price}
                                        {unit}
                                    </p>
                                </div>
                            }
                        />
                    </Link>
                );
            }
        });
    return (
        <div>
            <NavSearchMenu setKeyWord={setKeyWord} />
            <div className='container mx-auto px-0'>
                <div className='w-full flex flex-col lg:flex-row lg:px-6'>
                    <SideFilters setLocation={setLocation} setProviderType={setProviderType} setSortType={setSortType} setCategory={setCategory} />
                    <div className='flex-1 lg:pl-12 py-6 px-6 lg:px-0'>
                        <div className='mt-12'>
                            {keyWord === '' ? (
                                <h1 className='text-3xl font-bold'>Recommendation for You</h1>
                            ) : (
                                <h1 className='text-3xl font-bold'>Search Result for '{keyWord}'</h1>
                            )}
                            {isLoading ? (
                                <div className='text-center p-24'>
                                    <LoadingSpinner />
                                </div>
                            ) : serviceAvailable ? (
                                <div className='grid grid-cols-1 sm:grid-cols-6 xl:grid-cols-4 gap-6 mt-12'>{serviceList}</div>
                            ) : (
                                <h1 className='text-center text-lg p-24'>Service that you search is not available</h1>
                            )}
                        </div>
                        <div className='pt-16'>{/* <Pagination></Pagination> */}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

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

export default function Content() {
    const [isLoading, setIsLoading] = useState(false);
    const [services, setServices] = useState([]);
    const [users, setUsers] = useState([]);
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

    console.log(services);
    const serviceList = services.map((s) => {
        const { id, image, name, rating, serviceProvider, location, category, subCategory, price, unit } = s;
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
    });
    return (
        <div>
            <NavSearchMenu />
            <div className='container mx-auto px-0'>
                <div className='w-full flex flex-col lg:flex-row lg:px-6'>
                    <SideFilters />
                    <div className='flex-1 lg:pl-12 py-6 px-6 lg:px-0'>
                        <div className='mt-12'>
                            <h1 className='text-3xl font-bold'>Recommended For You</h1>
                            {isLoading ? (
                                <div className='text-center p-24'>
                                    <LoadingSpinner />
                                </div>
                            ) : services.length > 0 ? (
                                <div className='grid grid-cols-1 sm:grid-cols-6 xl:grid-cols-4 gap-6 mt-12'>{serviceList}</div>
                            ) : (
                                <h1 className='p-12'>No Service Registered Yet</h1>
                            )}
                        </div>
                        <div className='pt-16'>
                            <Pagination></Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

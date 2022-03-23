import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
// import Alert from "../components/Alert"
import ServiceCard from '../../shared/components/ServiceCard';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import Pagination from '../../shared/components/Pagination';
import { Link } from 'react-router-dom';

export default function ProviderAllService(props) {
    const { providerName, providerId } = props;
    let serviceAvailable = false;
    const [isLoading, setIsLoading] = useState(false);
    const [services, setServices] = useState([]);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const getService = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/services/user/${providerId}`);
                const responseUser = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/users/`);
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
    }, [services]);
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
            <div className='container mx-auto px-0'>
                <div className='w-full flex flex-col lg:flex-row'>
                    <div className='flex-1 py-6 px-6 lg:px-0'>
                        <div className='mt-6'>
                            <h1 className='text-xl font-bold text-gray-900 sm:text-2xl'>{providerName}'s services</h1>
                            {isLoading ? (
                                <div className='text-center p-24'>
                                    <LoadingSpinner />
                                </div>
                            ) : serviceAvailable ? (
                                <div className='grid grid-cols-1 sm:grid-cols-6 xl:grid-cols-4 gap-6 mt-8'>{serviceList}</div>
                            ) : (
                                <h1 className='p-12'>No Service Registered Yet</h1>
                            )}
                        </div>
                        <div className='pt-16'>{/* <Pagination></Pagination> */}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

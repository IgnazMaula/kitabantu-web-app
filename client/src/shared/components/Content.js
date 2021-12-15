import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import NavSearchMenu from './NavSearchMenu';
import SideFilters from './SideFilters';
// import Alert from "../components/Alert"
import ServiceCard from './ServiceCard';

import Pagination from './Pagination';
import { Link } from 'react-router-dom';

const Content = (props) => {
    const Services = props.services.map((r) => {
        const { id, image, name, rating, serviceProvider, location, category, type } = r;
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
                            </div>
                            <p className='mt-1 text-green-600 font-bold'>{serviceProvider}</p>
                            <p>
                                {category} • {type}
                            </p>
                            <p className='font-bold'>{location}</p>
                            <p className='text-gray-400 mt-2'> Starting at Rp. 250.000</p>
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
                            <div className='grid grid-cols-1 sm:grid-cols-6 xl:grid-cols-4 gap-6 mt-12'>{Services}</div>
                        </div>
                        <div className='pt-16'>
                            <Pagination></Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Content;

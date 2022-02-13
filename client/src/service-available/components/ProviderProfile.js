/* This example requires Tailwind CSS v2.0+ */
import { useState, useEffect } from 'react';
import { UserIcon, ChatIcon } from '@heroicons/react/solid';
import { NavLink } from 'react-router-dom';
import LoadingSpinner from '../../shared/components/LoadingSpinner';

export default function ProviderProfile(props) {
    const { providerId } = props;
    const [provider, setProvider] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const getProvider = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`http://localhost:5000/api/users/${providerId}`);
                const responseData = await response.json();
                setProvider(responseData.user);
                console.log(responseData.user);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };
        getProvider();
    }, [providerId]);
    return (
        <div>
            {isLoading && (
                <div className='text-center p-24'>
                    <LoadingSpinner />
                </div>
            )}
            {provider && !isLoading && (
                <ul role='list' className='grid'>
                    <li
                        key={provider.id}
                        className='col-span-1 flex flex-col text-center bg-white rounded-lg border-t border-b border-gray-200  sm:rounded-lg sm:border divide-y divide-gray-200'
                    >
                        <div className='flex-1 flex flex-col p-8'>
                            <div className='w-32 h-32 rounded-lg overflow-hidden mx-auto flex-shrink-0'>
                                <img
                                    src={`http://localhost:5000/${provider.image}`}
                                    alt={provider.name}
                                    className='object-right object-cover h-full w-full rounded-full '
                                />
                            </div>
                            <h3 className='mt-3 text-gray-900 text-sm font-medium text-2xl'>{provider.name}</h3>
                            <h3 className='text-gray-400 text-sm font-medium text-md'>Service Provider • {provider.userType}</h3>
                            <dl className='mt-1 flex-grow flex flex-col justify-between'>
                                <dt className='sr-only'>Title</dt>
                                <dt className='sr-only'>Role</dt>
                                <dd className='my-3'>
                                    {/* <span className='px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full'>{person.role}</span> */}
                                    {provider.vaccinated ? (
                                        <span className='px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full'>Vaccinated</span>
                                    ) : (
                                        <span className='px-2 py-1 text-red-800 text-xs font-medium bg-red-100 rounded-full'>Not Vaccinated</span>
                                    )}
                                </dd>
                                <dd className='text-gray-500 text-sm text-justify'>{provider.description}</dd>
                            </dl>
                        </div>
                        <div>
                            <div className='-mt-px flex divide-x divide-gray-200'>
                                <div className='w-0 flex-1 flex'>
                                    <NavLink
                                        to={`/provider-profile/${providerId}`}
                                        className='relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500'
                                    >
                                        <UserIcon className='w-5 h-5 text-gray-400' aria-hidden='true' />
                                        <span className='ml-3'>View Profile</span>
                                    </NavLink>
                                </div>
                                <div className='-ml-px w-0 flex-1 flex'>
                                    <a
                                        href={`tel:${provider.telephone}`}
                                        className='relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500'
                                    >
                                        <ChatIcon className='w-5 h-5 text-gray-400' aria-hidden='true' />
                                        <span className='ml-3'>Chat Provider</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            )}
        </div>
    );
}

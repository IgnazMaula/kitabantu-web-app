import { Fragment, useState, useEffect, useContext } from 'react';
import { Dialog, Switch, Transition } from '@headlessui/react';
import {
    BellIcon,
    BriefcaseIcon,
    ChatIcon,
    CogIcon,
    DocumentSearchIcon,
    HomeIcon,
    LockClosedIcon,
    QuestionMarkCircleIcon,
    UsersIcon,
    XIcon,
    CheckIcon,
} from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/solid';
import { AuthContext } from '../../shared/context/auth-context';
import { useForm } from '../../shared/hooks/form-hook';
import Input from '../../shared/components/form/Input';
import { VALIDATOR_EMAIL, VALIDATOR_MAXLENGTH, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import InformModal from '../../shared/components/modal/InformModal';

const navigation = [
    { name: 'Home', href: '#', icon: HomeIcon, current: false },
    { name: 'Jobs', href: '#', icon: BriefcaseIcon, current: false },
    { name: 'Applications', href: '#', icon: DocumentSearchIcon, current: false },
    { name: 'Messages', href: '#', icon: ChatIcon, current: false },
    { name: 'Team', href: '#', icon: UsersIcon, current: false },
    { name: 'Settings', href: '#', icon: CogIcon, current: true },
];
const secondaryNavigation = [
    { name: 'Help', href: '#', icon: QuestionMarkCircleIcon },
    { name: 'Logout', href: '#', icon: CogIcon },
];
const tabs = [
    { name: 'General', href: '#', current: true },
    { name: 'Password', href: '#', current: false },
    { name: 'Notifications', href: '#', current: false },
    { name: 'Plan', href: '#', current: false },
    { name: 'Billing', href: '#', current: false },
    { name: 'Team Members', href: '#', current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function ProviderProfile() {
    const [edit, setEdit] = useState(false);
    const [open, setOpen] = useState(false);
    const [provider, setProvider] = useState([]);
    const auth = useContext(AuthContext);
    const [formState, inputHandler, setFormData] = useForm({}, false);
    useEffect(() => {
        const getProvider = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/users/${auth.loggedUser.id}`);
                const responseData = await response.json();
                setProvider(responseData.user);
                console.log(auth.loggedUser);
            } catch (error) {
                console.log(error);
            }
        };
        getProvider();
    }, [edit]);

    const editSubmitHandler = async (event) => {
        setOpen(true);
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/users/${auth.loggedUser.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formState.inputs.name.value,
                    identityNumber: formState.inputs.identityNumber.value,
                    description: formState.inputs.description.value,
                }),
            });
            setEdit(false);
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }
            // navigate('/manage-service');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div>
                {/* Content area */}
                <InformModal open={open} setOpen={setOpen} title='Edit Success' message='User detail has been edited' buttonText='Okay' color='blue'>
                    <CheckIcon className='h-6 w-6 text-green-600' aria-hidden='true' />
                </InformModal>
                <div>
                    <div className='max-w-7xl mx-auto sm:px-2 lg:px-8'>
                        <main className='flex-1'>
                            <div className='relative max-w-4xl mx-auto md:px-8 xl:px-0'>
                                <div>
                                    <div className='px-4 sm:px-6 md:px-0'>
                                        <h1 className='text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl'>My Profile</h1>
                                        <p className='mt-2 text-sm text-gray-500'>View and update information related to your account.</p>
                                    </div>
                                    <form onSubmit={editSubmitHandler}>
                                        <div className='px-4 sm:px-6 md:px-0'>
                                            <div className='py-6'>
                                                {/* Description list with inline editing */}
                                                <div>
                                                    <div className='space-y-1'></div>
                                                    <div className='mt-6'>
                                                        <dl className='divide-y divide-gray-200'>
                                                            <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5'>
                                                                <dt className='text-sm font-medium text-gray-500'>Photo</dt>
                                                                <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                                                    <span className='flex-grow'>
                                                                        <img
                                                                            className='h-32 w-32 rounded-full'
                                                                            src='/images/provider-male.png'
                                                                            alt=''
                                                                        />
                                                                    </span>
                                                                    <span className='ml-4 flex-shrink-0 flex items-start space-x-4'>
                                                                        <button
                                                                            type='button'
                                                                            className='bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                                                        >
                                                                            Update
                                                                        </button>
                                                                        <span className='text-gray-300' aria-hidden='true'>
                                                                            |
                                                                        </span>
                                                                        <button
                                                                            type='button'
                                                                            className='bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                                                        >
                                                                            Remove
                                                                        </button>
                                                                    </span>
                                                                </dd>
                                                            </div>
                                                            <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4'>
                                                                <dt className='text-sm font-medium text-gray-500'>Name</dt>
                                                                <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                                                    {edit ? (
                                                                        <div className='flex-grow'>
                                                                            <Input
                                                                                element='input'
                                                                                id='name'
                                                                                type='text'
                                                                                initialValue={provider.name}
                                                                                initialValid={true}
                                                                                validators={[VALIDATOR_MINLENGTH(4)]}
                                                                                errorText='Please enter a valid name.'
                                                                                onInput={inputHandler}
                                                                            />
                                                                        </div>
                                                                    ) : (
                                                                        <span className='flex-grow'>{provider.name}</span>
                                                                    )}
                                                                    <span className='ml-4 flex-shrink-0'>
                                                                        {edit ? (
                                                                            <div>
                                                                                <button
                                                                                    disabled={!formState.isValid}
                                                                                    type='submit'
                                                                                    className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60'
                                                                                >
                                                                                    Save Change
                                                                                </button>
                                                                                <button
                                                                                    type='button'
                                                                                    onClick={() => setEdit(false)}
                                                                                    className='bg-white ml-3 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                                                                >
                                                                                    Cancel
                                                                                </button>
                                                                            </div>
                                                                        ) : (
                                                                            <button
                                                                                type='button'
                                                                                onClick={() => setEdit(true)}
                                                                                className='bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                                                            >
                                                                                Update
                                                                            </button>
                                                                        )}
                                                                    </span>
                                                                </dd>
                                                            </div>
                                                            <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5'>
                                                                <dt className='text-sm font-medium text-gray-500'>Email</dt>
                                                                <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                                                    <span className='flex-grow'>{auth.loggedUser.email}</span>
                                                                </dd>
                                                            </div>
                                                            <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200'>
                                                                <dt className='text-sm font-medium text-gray-500'>Type of Account</dt>
                                                                <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                                                    <span className='flex-grow'>Service Provider</span>
                                                                </dd>
                                                            </div>
                                                        </dl>
                                                    </div>
                                                </div>

                                                <div className='mt-10 divide-y divide-gray-200'>
                                                    <div className='space-y-1'>
                                                        <h3 className='text-lg leading-6 font-medium text-gray-900'>Account Details</h3>
                                                        <p className='max-w-2xl text-sm text-gray-500'>Detail information about your profile</p>
                                                    </div>
                                                    <div className='mt-6'>
                                                        <dl className='divide-y divide-gray-200'>
                                                            <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4'>
                                                                <dt className='text-sm font-medium text-gray-500'>National Identity Number</dt>
                                                                <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                                                    {edit ? (
                                                                        <div className='flex-grow'>
                                                                            <Input
                                                                                element='input'
                                                                                id='identityNumber'
                                                                                type='number'
                                                                                initialValue={provider.identityNumber}
                                                                                initialValid={true}
                                                                                validators={[VALIDATOR_MINLENGTH(16), VALIDATOR_MAXLENGTH(16)]}
                                                                                errorText='Please enter a valid 16-digit identity number'
                                                                                onInput={inputHandler}
                                                                            />
                                                                        </div>
                                                                    ) : (
                                                                        <span className='flex-grow'>{provider.identityNumber}</span>
                                                                    )}
                                                                    <span className='ml-4 flex-shrink-0'>
                                                                        {edit ? (
                                                                            <div>
                                                                                <button
                                                                                    type='submit'
                                                                                    className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                                                                >
                                                                                    Save Change
                                                                                </button>
                                                                                <button
                                                                                    type='button'
                                                                                    onClick={() => setEdit(false)}
                                                                                    className='bg-white ml-3 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                                                                >
                                                                                    Cancel
                                                                                </button>
                                                                            </div>
                                                                        ) : (
                                                                            <button
                                                                                type='button'
                                                                                onClick={() => setEdit(true)}
                                                                                className='bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                                                            >
                                                                                Update
                                                                            </button>
                                                                        )}
                                                                    </span>
                                                                </dd>
                                                            </div>
                                                            <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5'>
                                                                <dt className='text-sm font-medium text-gray-500'>Phone Number</dt>
                                                                <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                                                    <span className='flex-grow'>{auth.loggedUser.phoneNumber}</span>
                                                                    <span className='ml-4 flex-shrink-0'>
                                                                        <button
                                                                            type='button'
                                                                            className='bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                                                        >
                                                                            Update
                                                                        </button>
                                                                    </span>
                                                                </dd>
                                                            </div>
                                                            <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5'>
                                                                <dt className='text-sm font-medium text-gray-500'>Type of User</dt>
                                                                <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                                                    <span className='flex-grow'>{auth.loggedUser.userType}</span>
                                                                    <span className='ml-4 flex-shrink-0'>
                                                                        <button
                                                                            type='button'
                                                                            className='bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                                                        >
                                                                            Update
                                                                        </button>
                                                                    </span>
                                                                </dd>
                                                            </div>
                                                            <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5'>
                                                                <dt className='text-sm font-medium text-gray-500'>Vaccination Status</dt>
                                                                <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                                                    <span className='flex-grow'>
                                                                        {auth.loggedUser.vaccinated ? 'Vaccinated' : 'Not Vaccinated'}
                                                                    </span>
                                                                    <span className='ml-4 flex-shrink-0'>
                                                                        <button
                                                                            type='button'
                                                                            className='bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                                                        >
                                                                            Update
                                                                        </button>
                                                                    </span>
                                                                </dd>
                                                            </div>
                                                            <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5'>
                                                                <dt className='text-sm font-medium text-gray-500'>Location</dt>
                                                                <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                                                    <span className='flex-grow'>{auth.loggedUser.location}</span>
                                                                    <span className='ml-4 flex-shrink-0'>
                                                                        <button
                                                                            type='button'
                                                                            className='bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                                                        >
                                                                            Update
                                                                        </button>
                                                                    </span>
                                                                </dd>
                                                            </div>
                                                            <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5'>
                                                                <dt className='text-sm font-medium text-gray-500'>Address</dt>
                                                                <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                                                    <span className='flex-grow'>{auth.loggedUser.address}</span>
                                                                    <span className='ml-4 flex-shrink-0'>
                                                                        <button
                                                                            type='button'
                                                                            className='bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                                                        >
                                                                            Update
                                                                        </button>
                                                                    </span>
                                                                </dd>
                                                            </div>
                                                            <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5'>
                                                                <dt className='text-sm font-medium text-gray-500'>Description</dt>
                                                                <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                                                    {edit ? (
                                                                        <div className='flex-grow'>
                                                                            <Input
                                                                                element='textarea'
                                                                                id='description'
                                                                                type='text'
                                                                                initialValue={provider.description}
                                                                                initialValid={true}
                                                                                validators={[VALIDATOR_MINLENGTH(12)]}
                                                                                errorText='Description is too short.'
                                                                                onInput={inputHandler}
                                                                            />
                                                                        </div>
                                                                    ) : (
                                                                        <span className='flex-grow'>{provider.description}</span>
                                                                    )}
                                                                    <span className='ml-4 flex-shrink-0'>
                                                                        {edit ? (
                                                                            <div>
                                                                                <button
                                                                                    type='submit'
                                                                                    className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                                                                >
                                                                                    Save Change
                                                                                </button>
                                                                                <button
                                                                                    type='button'
                                                                                    onClick={() => setEdit(false)}
                                                                                    className='bg-white ml-3 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                                                                >
                                                                                    Cancel
                                                                                </button>
                                                                            </div>
                                                                        ) : (
                                                                            <button
                                                                                type='button'
                                                                                onClick={() => setEdit(true)}
                                                                                className='bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                                                            >
                                                                                Update
                                                                            </button>
                                                                        )}
                                                                    </span>
                                                                </dd>
                                                            </div>
                                                        </dl>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}

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
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import ImageUpload from '../../shared/components/form/ImageUpload';

const userTypes = ['Individuals', 'Group', 'Corporation'];
const locations = ['Jakarta', 'Bali', 'Surabaya'];
const vaccinations = [
    { option: 'Vaccinated', value: true },
    { option: 'Not Vaccinated', value: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function ProviderProfile() {
    const [isLoading, setIsLoading] = useState(false);
    const [edit, setEdit] = useState(false);
    const [open, setOpen] = useState(false);
    const [openP, setOpenP] = useState(false);
    const [provider, setProvider] = useState([]);
    const auth = useContext(AuthContext);
    const [formState, inputHandler, setFormData] = useForm({}, false);
    useEffect(() => {
        const getProvider = async () => {
            try {
                edit === false && setIsLoading(true);
                const response = await fetch(`http://localhost:5000/api/users/${auth.loggedUser.id}`);
                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message);
                }
                setProvider(responseData.user);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        };
        getProvider();
    }, [edit]);

    const editSubmitHandler = async (event) => {
        event.preventDefault();
        setOpen(true);
        let locationValue, userValue;
        formState.inputs.location.value === '' ? (locationValue = provider.location) : (locationValue = formState.inputs.location.value);
        formState.inputs.userType.value === '' ? (userValue = provider.userType) : (userValue = formState.inputs.userType.value);

        try {
            const response = await fetch(`http://localhost:5000/api/users/update/provider/${auth.loggedUser.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formState.inputs.name.value,
                    identityNumber: formState.inputs.identityNumber.value,
                    phoneNumber: formState.inputs.phoneNumber.value,
                    userType: userValue,
                    vaccinated: formState.inputs.vaccinated.value,
                    location: locationValue,
                    address: formState.inputs.address.value,
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

    const uploadProfileHandler = async (event) => {
        event.preventDefault();
        setOpenP(true);
        const formData = new FormData();
        formData.append('image', formState.inputs.image.value);
        try {
            await fetch(`http://localhost:5000/api/users/update/profile-picture/${auth.loggedUser.id}`, {
                method: 'PATCH',
                body: formData,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div>
                <InformModal open={open} setOpen={setOpen} title='Edit Success' message='User detail has been edited' buttonText='Okay' color='blue'>
                    <CheckIcon className='h-6 w-6 text-green-600' aria-hidden='true' />
                </InformModal>
                <InformModal
                    open={openP}
                    setOpen={setOpenP}
                    title='Edit Success'
                    message='User Profile has been edited'
                    buttonText='Okay'
                    color='blue'
                >
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
                                    {isLoading ? (
                                        <div className='text-center p-24'>
                                            <LoadingSpinner />
                                        </div>
                                    ) : (
                                        <form onSubmit={editSubmitHandler}>
                                            <div className='px-4 sm:px-6 md:px-0'>
                                                <div className='py-6'>
                                                    {/* Description list with inline editing */}
                                                    <div>
                                                        <div className='space-y-1'></div>
                                                        <div className='mt-6'>
                                                            <dl className='divide-gray-200'>
                                                                <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5'>
                                                                    <dt className='text-sm font-medium text-gray-500'>Photo</dt>
                                                                    <ImageUpload
                                                                        id='image'
                                                                        image={provider.image}
                                                                        onInput={inputHandler}
                                                                        onClick={uploadProfileHandler}
                                                                    />
                                                                </div>
                                                                <div className='mt-10 divide-y divide-gray-200'>
                                                                    <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5'>
                                                                        <dt className='text-sm font-medium text-gray-500'>
                                                                            <div className='space-y-1'>
                                                                                <h3 className='text-lg leading-6 font-medium text-gray-900'>
                                                                                    Account Details
                                                                                </h3>
                                                                                <p className='max-w-2xl text-sm text-gray-500'>
                                                                                    Detail information about your profile
                                                                                </p>
                                                                            </div>
                                                                        </dt>
                                                                        <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                                                            <span className='flex-grow'></span>
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
                                                                                        Update Profile Details
                                                                                    </button>
                                                                                )}
                                                                            </span>
                                                                        </dd>
                                                                    </div>
                                                                    <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4'>
                                                                        <dt className='text-sm font-medium text-gray-500'>Name</dt>
                                                                        <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                                                            {edit ? (
                                                                                <div className='w-80'>
                                                                                    <Input
                                                                                        element='input'
                                                                                        id='name'
                                                                                        type='text'
                                                                                        initialValue={provider.name}
                                                                                        initialValid={true}
                                                                                        validators={[VALIDATOR_MINLENGTH(8), VALIDATOR_MAXLENGTH(48)]}
                                                                                        errorText='Please enter name between 8-48 characters.'
                                                                                        onInput={inputHandler}
                                                                                    />
                                                                                </div>
                                                                            ) : (
                                                                                <span className='flex-grow'>{provider.name}</span>
                                                                            )}
                                                                            <span className='ml-4 flex-shrink-0'></span>
                                                                        </dd>
                                                                    </div>
                                                                    <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5'>
                                                                        <dt className='text-sm font-medium text-gray-500'>Email</dt>
                                                                        <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                                                            <span className='flex-grow'>{provider.email}</span>
                                                                        </dd>
                                                                    </div>
                                                                    <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200'>
                                                                        <dt className='text-sm font-medium text-gray-500'>Type of Account</dt>
                                                                        <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                                                            <span className='flex-grow'>Service Provider</span>
                                                                        </dd>
                                                                    </div>
                                                                </div>
                                                            </dl>
                                                        </div>
                                                    </div>

                                                    <div className='mt-10 divide-y divide-gray-200'>
                                                        <div className='mt-6'>
                                                            <dl className='divide-y divide-gray-200'>
                                                                <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4'>
                                                                    <dt className='text-sm font-medium text-gray-500'>National Identity Number</dt>
                                                                    <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                                                        {edit ? (
                                                                            <div className='w-80'>
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
                                                                        <span className='ml-4 flex-shrink-0'></span>
                                                                    </dd>
                                                                </div>
                                                                <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5'>
                                                                    <dt className='text-sm font-medium text-gray-500'>Phone Number</dt>
                                                                    <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                                                        <span className='flex-grow'>
                                                                            {edit ? (
                                                                                <div className='w-80'>
                                                                                    <Input
                                                                                        element='input'
                                                                                        id='phoneNumber'
                                                                                        type='tel'
                                                                                        initialValue={provider.phoneNumber}
                                                                                        initialValid={true}
                                                                                        validators={[
                                                                                            VALIDATOR_MINLENGTH(10),
                                                                                            VALIDATOR_MAXLENGTH(20),
                                                                                        ]}
                                                                                        errorText='Please enter a valid phone number'
                                                                                        onInput={inputHandler}
                                                                                    />
                                                                                </div>
                                                                            ) : (
                                                                                <span className='flex-grow'>{provider.phoneNumber}</span>
                                                                            )}
                                                                        </span>
                                                                        <span className='ml-4 flex-shrink-0'></span>
                                                                    </dd>
                                                                </div>
                                                                <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5'>
                                                                    <dt className='text-sm font-medium text-gray-500'>Type of User</dt>
                                                                    <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                                                        <span className='flex-grow'>
                                                                            {edit ? (
                                                                                <div className='w-80'>
                                                                                    <Input
                                                                                        element='option'
                                                                                        id='userType'
                                                                                        placeholder={provider.userType}
                                                                                        initialValid={true}
                                                                                        validators={[VALIDATOR_REQUIRE()]}
                                                                                        errorText='Please enter a valid user type.'
                                                                                        onInput={inputHandler}
                                                                                        option={userTypes}
                                                                                    />
                                                                                </div>
                                                                            ) : (
                                                                                <span className='flex-grow'>{provider.userType}</span>
                                                                            )}
                                                                        </span>
                                                                        <span className='ml-4 flex-shrink-0'></span>
                                                                    </dd>
                                                                </div>
                                                                <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5'>
                                                                    <dt className='text-sm font-medium text-gray-500'>Vaccination Status</dt>
                                                                    <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                                                        <span className='flex-grow'>
                                                                            {edit ? (
                                                                                <div className='w-80'>
                                                                                    <Input
                                                                                        element='radio'
                                                                                        id='vaccinated'
                                                                                        type='radio'
                                                                                        mode='edit'
                                                                                        placeholder={provider.vaccinated}
                                                                                        initialValue={provider.vaccinated}
                                                                                        initialValid={true}
                                                                                        defaultChecked={true}
                                                                                        validators={[VALIDATOR_REQUIRE()]}
                                                                                        errorText='Please enter a valid vaccination status.'
                                                                                        onInput={inputHandler}
                                                                                        option={vaccinations}
                                                                                    />
                                                                                </div>
                                                                            ) : (
                                                                                <span className='flex-grow'>
                                                                                    {provider.vaccinated ? 'Vaccinated' : 'Not Vaccinated'}
                                                                                </span>
                                                                            )}
                                                                        </span>
                                                                        <span className='ml-4 flex-shrink-0'></span>
                                                                    </dd>
                                                                </div>
                                                                <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5'>
                                                                    <dt className='text-sm font-medium text-gray-500'>Location</dt>
                                                                    <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                                                        <span className='flex-grow'>
                                                                            {edit ? (
                                                                                <div className='w-80'>
                                                                                    <Input
                                                                                        element='option'
                                                                                        id='location'
                                                                                        placeholder={provider.location}
                                                                                        initialValid={true}
                                                                                        validators={[VALIDATOR_REQUIRE()]}
                                                                                        errorText='Please enter a valid location'
                                                                                        onInput={inputHandler}
                                                                                        option={locations}
                                                                                    />
                                                                                </div>
                                                                            ) : (
                                                                                <span className='flex-grow'>{provider.location}</span>
                                                                            )}
                                                                        </span>
                                                                        <span className='ml-4 flex-shrink-0'></span>
                                                                    </dd>
                                                                </div>
                                                                <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5'>
                                                                    <dt className='text-sm font-medium text-gray-500'>Address</dt>
                                                                    <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                                                        <span className='flex-grow'>
                                                                            {edit ? (
                                                                                <div className='w-80'>
                                                                                    <Input
                                                                                        element='input'
                                                                                        id='address'
                                                                                        type='text'
                                                                                        initialValue={provider.address}
                                                                                        initialValid={true}
                                                                                        validators={[VALIDATOR_MINLENGTH(10)]}
                                                                                        errorText='Please enter a valid address.'
                                                                                        onInput={inputHandler}
                                                                                    />
                                                                                </div>
                                                                            ) : (
                                                                                <span className='flex-grow'>{provider.address}</span>
                                                                            )}
                                                                        </span>
                                                                        <span className='ml-4 flex-shrink-0'></span>
                                                                    </dd>
                                                                </div>
                                                                <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5'>
                                                                    <dt className='text-sm font-medium text-gray-500'>Description</dt>
                                                                    <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                                                        {edit ? (
                                                                            <div className='w-full'>
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
                                                                        <span className='ml-4 flex-shrink-0'></span>
                                                                    </dd>
                                                                </div>
                                                            </dl>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}

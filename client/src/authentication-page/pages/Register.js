import { useState, useContext } from 'react';
import { LockClosedIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

import Input from '../components/Input';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import RadioButton from '../components/RadioButton';
import ErrorModal from '../../shared/components/modal/ErrorModal';

const locations = ['Jakarta', 'Bali', 'Surabaya'];
const userTypes = ['Individuals', 'Group', 'Corporation'];
const vaccinations = [
    { option: 'Vaccinated', value: true },
    { option: 'Not Vaccinated', value: false },
];

export default function Register() {
    const auth = useContext(AuthContext);
    const [error, setError] = useState(false);

    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: '',
                isValid: false,
            },
            password: {
                value: '',
                isValid: false,
            },
            firstName: {
                value: '',
                isValid: false,
            },
            lastName: {
                value: '',
                isValid: false,
            },
            description: {
                value: '',
                isValid: false,
            },
            // location: {
            //     value: '',
            //     isValid: false,
            // },
            // gender: {
            //     value: '',
            //     isValid: false,
            // },
            // occupation: {
            //     value: '',
            //     isValid: false,
            // },
        },
        false
    );

    const authSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value,
                    name: formState.inputs.firstName.value + ' ' + formState.inputs.lastName.value,
                    location: formState.inputs.location.value,
                    userType: formState.inputs.userType.value,
                    vaccinated: formState.inputs.vaccinated.value,
                    description: formState.inputs.description.value,
                }),
            });

            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }
            console.log(responseData.user);
            auth.login(responseData.user);
        } catch (error) {
            console.log(error);
            setError(error.message || 'Something is wrong, please try again.');
        }
    };

    const errorHandler = () => {
        setError(null);
    };

    return (
        <>
            <ErrorModal error={error} onClear={errorHandler} />
            <div className='min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
                <div className='max-w-md w-full space-y-8'>
                    <div>
                        <Link to='/'>
                            <img className='mx-auto h-12 w-auto' src='../images/icon.png' alt='Workflow' />
                        </Link>
                        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900 pt-12'>Register as Service Provider</h2>
                        <p className='mt-2 text-center text-sm text-gray-600'>
                            Or{' '}
                            <Link to='/login' className='font-medium text-blue-600 hover:text-blue-500'>
                                Login to Your Account
                            </Link>
                        </p>
                    </div>
                    <form className='space-y-6' onSubmit={authSubmitHandler}>
                        <div className='mt-6 grid grid-cols-4 gap-6'>
                            <div className='col-span-4 sm:col-span-2'>
                                <Input
                                    element='input'
                                    id='firstName'
                                    type='text'
                                    label='First Name'
                                    placeholder='first name'
                                    validators={[VALIDATOR_MINLENGTH(1)]}
                                    errorText='Please enter a valid name.'
                                    onInput={inputHandler}
                                />
                            </div>

                            <div className='col-span-4 sm:col-span-2'>
                                <Input
                                    element='input'
                                    id='lastName'
                                    type='text'
                                    label='Last Name'
                                    placeholder='last name'
                                    validators={[VALIDATOR_MINLENGTH(1)]}
                                    errorText='Please enter a valid name.'
                                    onInput={inputHandler}
                                />
                            </div>
                        </div>
                        <Input
                            element='input'
                            id='email'
                            type='email'
                            label='Email'
                            placeholder='email'
                            validators={[VALIDATOR_EMAIL()]}
                            errorText='Please enter a valid email address'
                            onInput={inputHandler}
                        />
                        <Input
                            element='input'
                            id='password'
                            type='password'
                            label='Password'
                            placeholder='password'
                            validators={[VALIDATOR_MINLENGTH(5)]}
                            errorText='Please enter a valid password, at least 5 characters.'
                            onInput={inputHandler}
                        />
                        <div>
                            <Input
                                element='option'
                                id='location'
                                label='Location'
                                validators={[VALIDATOR_MINLENGTH(1)]}
                                errorText='Please enter a valid location.'
                                onInput={inputHandler}
                                option={locations}
                            />
                        </div>
                        <div className='mt-6 grid grid-cols-5 gap-6'>
                            <div className='col-span-4 sm:col-span-2'>
                                <Input
                                    element='option'
                                    id='userType'
                                    label='Type of User'
                                    validators={[VALIDATOR_MINLENGTH(1)]}
                                    errorText='Please enter a valid user type.'
                                    onInput={inputHandler}
                                    option={userTypes}
                                />
                            </div>
                            <div className='col-span-4 sm:col-span-3'>
                                <Input
                                    element='radio'
                                    id='vaccinated'
                                    type='radio'
                                    label='Vaccination Status'
                                    validators={[]}
                                    errorText='Please enter a valid vaccination status.'
                                    onInput={inputHandler}
                                    option={vaccinations}
                                />
                                {/* <RadioButton /> */}
                            </div>
                        </div>
                        <div>
                            <Input
                                element='textarea'
                                id='description'
                                placeholder='description about yourself/group/corporation'
                                label='Description'
                                validators={[VALIDATOR_MINLENGTH(12)]}
                                errorText='Description is too short.'
                                onInput={inputHandler}
                                option={locations}
                            />
                        </div>
                        <div>
                            <button
                                disabled={!formState.isValid}
                                type='submit'
                                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-60'
                            >
                                {!formState.isValid && (
                                    <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                                        <LockClosedIcon className='h-5 w-5 text-blue-500 group-hover:text-blue-400' aria-hidden='true' />
                                    </span>
                                )}
                                Register Now
                            </button>
                        </div>
                    </form>
                    <div className='text-sm text-center'>
                        <Link to='/' className='font-medium text-blue-600 hover:text-blue-500'>
                            Back to home
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

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
const occupations = ['Students', 'Worker', 'Housewife/Husband'];
const genders = [
    { option: 'Male', value: 'Male' },
    { option: 'Female', value: 'Female' },
];

export default function Signin() {
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
            const response = await fetch('http://localhost:5000/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value,
                    name: formState.inputs.firstName.value + ' ' + formState.inputs.lastName.value,
                    location: formState.inputs.location.value,
                    gender: formState.inputs.gender.value,
                    occupation: formState.inputs.occupation.value,
                }),
            });

            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }
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
                        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900 pt-12'>Register New Account</h2>
                        <p className='mt-2 text-center text-sm text-gray-600'>
                            Or{' '}
                            <Link to='/login' className='font-medium text-green-600 hover:text-green-500'>
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
                            <div className='col-span-4 sm:col-span-3'>
                                <Input
                                    element='option'
                                    id='occupation'
                                    label='Occupation'
                                    validators={[VALIDATOR_MINLENGTH(1)]}
                                    errorText='Please enter a valid occupation.'
                                    onInput={inputHandler}
                                    option={occupations}
                                />
                            </div>
                            <div className='col-span-4 sm:col-span-2'>
                                <Input
                                    element='radio'
                                    id='gender'
                                    type='radio'
                                    label='Occupation'
                                    validators={[]}
                                    errorText='Please enter a valid gender.'
                                    onInput={inputHandler}
                                    option={genders}
                                />
                                {/* <RadioButton /> */}
                            </div>
                        </div>
                        <div>
                            <button
                                disabled={!formState.isValid}
                                type='submit'
                                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-60'
                            >
                                {!formState.isValid && (
                                    <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                                        <LockClosedIcon className='h-5 w-5 text-green-500 group-hover:text-green-400' aria-hidden='true' />
                                    </span>
                                )}
                                Sign In
                            </button>
                        </div>
                    </form>
                    <div className='text-sm text-center'>
                        <Link to='/register' className='font-medium text-green-600 hover:text-green-500'>
                            Back to Registration Menu
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
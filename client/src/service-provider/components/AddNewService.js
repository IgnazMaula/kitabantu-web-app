import { useState, useContext } from 'react';
import { LockClosedIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

import Input from '../../shared/components/form/Input';
import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_EMAIL, VALIDATOR_MAXLENGTH, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { categories } from '../../shared/util/categories';

export default function Example() {
    const [error, setError] = useState(false);
    const [formState, inputHandler, setFormData] = useForm({}, false);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSubSelectedCategory] = useState(null);

    const handleSelectedCategory = (e) => {
        setSelectedCategory(e.target.value);
        console.log(selectedCategory);
    };

    const subCategoriesList = [];
    const categoriesList = [];
    let label;
    let unit;
    let element;

    categories.map((c) => {
        categoriesList.push(c.name);
        if (c.name === selectedCategory) {
            c.sub.forEach((s) => {
                subCategoriesList.push(s.name);
            });
        }
    });
    categories.forEach((c) => {
        if (c.name === selectedCategory) {
            c.sub.forEach((s) => {
                if (s.name === selectedSubCategory) {
                    label = s.label1;
                    unit = s.unit;
                    element = s.option1.map((o) => (
                        <div className='relative flex items-start'>
                            <div className='flex items-center h-5'>
                                <input
                                    id={o}
                                    name={o}
                                    type='checkbox'
                                    className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded'
                                />
                            </div>
                            <div className='ml-3 text-sm'>
                                <label htmlFor='comments' className='font-medium text-gray-700'>
                                    {o}
                                </label>
                            </div>
                        </div>
                    ));
                }
            });
        }
    });

    return (
        <div className='max-w-7xl mx-auto sm:px-2 lg:px-8'>
            <div className='px-4 sm:px-6 md:px-0'>
                <h1 className='text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl'>Add New Service</h1>
                <p className='mt-2 text-sm text-gray-500'>View and update information related to your account.</p>
            </div>
            <form className='space-y-8 divide-y divide-gray-200'>
                <div className='space-y-8 divide-y divide-gray-200 sm:space-y-5'>
                    <div>
                        <div className='mt-6 sm:mt-5 space-y-6 sm:space-y-5'>
                            <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                                <label htmlFor='about' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                    Service Name
                                </label>
                                <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                    <p className='text-sm text-gray-500'>
                                        This will be the title that displays to the client. try to make it as interesting as possible
                                    </p>
                                    <Input
                                        element='input'
                                        id='name'
                                        type='text'
                                        placeholder='Service name'
                                        validators={[VALIDATOR_MINLENGTH(4)]}
                                        errorText='Please enter a valid name.'
                                        onInput={inputHandler}
                                    />
                                </div>
                            </div>
                            <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                                <label htmlFor='about' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                    Categories
                                </label>
                                <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                    <Input
                                        element='option'
                                        id='location'
                                        placeholder='Select Categories'
                                        validators={[VALIDATOR_REQUIRE()]}
                                        errorText='Please enter a valid location'
                                        onInput={inputHandler}
                                        option={categoriesList}
                                        onChange={handleSelectedCategory}
                                    />
                                </div>
                            </div>
                            {selectedCategory && (
                                <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5'>
                                    <label htmlFor='about' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                        Sub Category
                                    </label>
                                    <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                        <Input
                                            element='option'
                                            id='location'
                                            placeholder='Select Sub Categories'
                                            validators={[VALIDATOR_REQUIRE()]}
                                            errorText='Please enter a valid location'
                                            onInput={inputHandler}
                                            option={subCategoriesList}
                                            onChange={(e) => setSubSelectedCategory(e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}
                            {selectedSubCategory && (
                                <div className='pt-6 sm:pt-5'>
                                    <div role='group' aria-labelledby='label-email'>
                                        <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline'>
                                            <div>
                                                <div className='text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700' id='label-email'>
                                                    {label}
                                                </div>
                                            </div>
                                            <div className='mt-4 sm:mt-0 sm:col-span-2'>
                                                <div className='max-w-lg space-y-4'>{element}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                                <label htmlFor='about' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                    Starting Price
                                </label>
                                <div className='mt-1 sm:mt-0 sm:col-span-1'>
                                    <div className='mt-1 relative'>
                                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                            <span className='text-gray-500 sm:text-sm'>Rp</span>
                                        </div>
                                        <input
                                            type='number'
                                            name='price'
                                            id='price'
                                            className='pl-10 pr-12 input-price'
                                            placeholder='0'
                                            aria-describedby='price-currency'
                                        />
                                        <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                                            <span className='text-gray-500 sm:text-sm' id='price-currency'>
                                                {unit}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div></div>
                            </div>
                            <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                                <label htmlFor='about' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                    Description
                                </label>
                                <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                    <p className='mt-2 text-sm text-gray-500'>Describe about your service in few lines.</p>
                                    <Input
                                        element='textarea'
                                        id='description'
                                        placeholder='Description about service that you offer'
                                        validators={[VALIDATOR_MINLENGTH(12)]}
                                        errorText='Description is too short.'
                                        onInput={inputHandler}
                                    />
                                </div>
                            </div>
                            <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                                <label htmlFor='cover-photo' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                    Cover photo
                                </label>
                                <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                    <div className='max-w flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
                                        <div className='space-y-1 text-center'>
                                            <svg
                                                className='mx-auto h-12 w-12 text-gray-400'
                                                stroke='currentColor'
                                                fill='none'
                                                viewBox='0 0 48 48'
                                                aria-hidden='true'
                                            >
                                                <path
                                                    d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                                                    strokeWidth={2}
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                            </svg>
                                            <div className='flex text-sm text-gray-600'>
                                                <label
                                                    htmlFor='file-upload'
                                                    className='relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500'
                                                >
                                                    <span>Upload a file</span>
                                                    <input id='file-upload' name='file-upload' type='file' className='sr-only' />
                                                </label>
                                                <p className='pl-1'>or drag and drop</p>
                                            </div>
                                            <p className='text-xs text-gray-500'>PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='pt-5'>
                    <div className='flex justify-end'>
                        <button
                            type='button'
                            className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        >
                            Save and Request for Approval
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

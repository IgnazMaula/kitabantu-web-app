import React, { useRef, useState, useEffect } from 'react';

const ImageUploadService = (props) => {
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);
    const filePickerRef = useRef();
    const saveButton = useRef();
    useEffect(() => {
        if (!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }, [file]);

    const pickedHandler = (event) => {
        let pickedFile;
        let fileIsValid = isValid;
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }
        props.onInput(props.id, pickedFile, fileIsValid);
    };

    const pickImageHandler = () => {
        filePickerRef.current.click();
    };

    // useEffect(() => {
    //     if (!previewUrl) {
    //         saveButton.current.disabled = true;
    //     } else {
    //         saveButton.current.disabled = false;
    //     }
    // }, [previewUrl]);

    return (
        // <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
        //     <input id={props.id} ref={filePickerRef} style={{ display: 'none' }} type='file' accept='.jpg,.png,.jpeg' onChange={pickedHandler} />
        //     <span className='flex-grow'>
        //         {previewUrl && (
        //             <span className='flex-grow'>
        //                 <img className='h-32 w-32 rounded-full' src={previewUrl} alt='' />
        //             </span>
        //         )}
        //         {!previewUrl && (
        //             <span className='flex-grow'>
        //                 <img className='h-32 w-32 rounded-full' src={`${process.env.REACT_APP_BACKEND_URL}${props.image}`} alt='' />
        //             </span>
        //         )}
        //     </span>
        //     <span className='ml-4 flex-shrink-0 flex items-start space-x-4'>
        //         <button
        //             type='button'
        //             onClick={pickImageHandler}
        //             className={`bg-white rounded-md font-medium text-${props.color}-600 hover:text-${props.color}-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${props.color}-500`}
        //         >
        //             Update
        //         </button>
        //         <span className='text-gray-300' aria-hidden='true'>
        //             |
        //         </span>
        //         <button
        //             ref={saveButton}
        //             type='button'
        //             onClick={props.onClick}
        //             className={`bg-white rounded-md font-medium text-${props.color}-600 hover:text-${props.color}-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${props.color}-500 disabled:opacity-40`}
        //         >
        //             Save Changes
        //         </button>
        //     </span>
        //     {!isValid && <p>{props.errorText}</p>}
        // </dd>
        <div className='mt-1 sm:mt-0 sm:col-span-2'>
            <div className='max-w flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
                <div className='space-y-1 text-center'>
                    {previewUrl && (
                        <span className='flex-grow'>
                            <img className='max-h-64 max-w-128' src={previewUrl} alt='' />
                        </span>
                    )}
                    {!previewUrl && (
                        <div>
                            {props.image === 'uploads/images/default-service.png' ? (
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
                            ) : (
                                <span className='flex-grow'>
                                    <img className='max-h-64 max-w-128' src={`${process.env.REACT_APP_BACKEND_URL}${props.image}`} alt='' />
                                </span>
                            )}
                        </div>
                    )}
                    <div className='flex text-sm text-gray-600 justify-center'>
                        <label
                            htmlFor='file-upload'
                            className='relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none'
                        >
                            <button type='button' onClick={pickImageHandler}>
                                Upload image file
                            </button>
                            <input
                                id={props.id}
                                ref={filePickerRef}
                                style={{ display: 'none' }}
                                type='file'
                                accept='.jpg,.png,.jpeg'
                                onChange={pickedHandler}
                            />
                        </label>
                    </div>
                    <p className='text-xs text-gray-500'>PNG, JPG, JPEG up to 5MB</p>
                    <br />
                    {previewUrl && (
                        <p
                            onClick={() => setPreviewUrl(undefined)}
                            className='relative cursor-pointer bg-white rounded-md font-sm text-sm text-blue-600 hover:text-blue-500 focus-within:outline-none'
                        >
                            Undo upload
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageUploadService;

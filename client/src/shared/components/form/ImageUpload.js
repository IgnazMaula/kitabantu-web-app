import React, { useRef, useState, useEffect } from 'react';

const ImageUpload = (props) => {
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);

    const filePickerRef = useRef();

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

    return (
        <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
            <input id={props.id} ref={filePickerRef} style={{ display: 'none' }} type='file' accept='.jpg,.png,.jpeg' onChange={pickedHandler} />
            <span className='flex-grow'>
                {previewUrl && (
                    <span className='flex-grow'>
                        <img className='h-32 w-32 rounded-full' src={previewUrl} alt='' />
                    </span>
                )}
                {!previewUrl && (
                    <span className='flex-grow'>
                        <img className='h-32 w-32 rounded-full' src={`http://localhost:5000/${props.image}`} alt='' />
                    </span>
                )}
            </span>
            <span className='ml-4 flex-shrink-0 flex items-start space-x-4'>
                <button
                    type='button'
                    onClick={pickImageHandler}
                    className='bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                >
                    Update
                </button>
                <span className='text-gray-300' aria-hidden='true'>
                    |
                </span>
                <button
                    disabled={!previewUrl}
                    type='button'
                    onClick={props.onClick}
                    className='bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-40'
                >
                    Save Changes
                </button>
            </span>
            {!isValid && <p>{props.errorText}</p>}
        </dd>
    );
};

export default ImageUpload;

import React, { useRef, useState, useEffect } from 'react';

const ImageUpload = (props) => {
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

    useEffect(() => {
        if (!previewUrl) {
            saveButton.current.disabled = true;
        } else {
            saveButton.current.disabled = false;
        }
    }, [previewUrl]);

    return (
        <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
            <input id={props.id} ref={filePickerRef} style={{ display: 'none' }} type='file' accept='.jpg,.png,.jpeg' onChange={pickedHandler} />
            <span className='flex-grow'>
                {previewUrl && (
                    <div className='w-32 h-32 rounded-lg overflow-hidden flex-shrink-0'>
                        <img src={previewUrl} alt={props.name} className='object-right object-cover h-full w-full rounded-full ' />
                    </div>
                )}
                {!previewUrl && (
                    <div className='w-32 h-32 rounded-lg overflow-hidden flex-shrink-0'>
                        <img
                            src={`${process.env.REACT_APP_BACKEND_URL}${props.image}`}
                            alt={props.name}
                            className='object-right object-cover h-full w-full rounded-full '
                        />
                    </div>
                )}
            </span>
            <span className='ml-4 flex-shrink-0 flex items-start space-x-4'>
                <button
                    type='button'
                    onClick={pickImageHandler}
                    className={`bg-white rounded-md font-medium text-${props.color}-600 hover:text-${props.color}-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${props.color}-500`}
                >
                    Update
                </button>
                <span className='text-gray-300' aria-hidden='true'>
                    |
                </span>
                <button
                    ref={saveButton}
                    type='button'
                    onClick={props.onClick}
                    className={`bg-white rounded-md font-medium text-${props.color}-600 hover:text-${props.color}-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${props.color}-500 disabled:opacity-40`}
                >
                    Save Changes
                </button>
            </span>
            {!isValid && <p>{props.errorText}</p>}
        </dd>
    );
};

export default ImageUpload;

import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { ExclamationIcon } from '@heroicons/react/outline';

import Backdrop from './Backdrop';
import './Modal.css';

const ModalOverlay = (props) => {
    const content = (
        <div
            className={`modal ${props.className} inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full`}
        >
            <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-6'>
                <form onSubmit={props.onSubmit ? props.onSubmit : (event) => event.preventDefault()}>
                    <div className='sm:flex sm:items-start'>
                        <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                            <ExclamationIcon className='h-6 w-6 text-red-600' aria-hidden='true' />
                        </div>
                        <div className='mt-24 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                            <h3 className='text-lg leading-6 font-medium text-gray-900 mt-2'>{props.header}</h3>
                        </div>
                    </div>
                    <div className='mt-6 mb-8'>
                        <p className='text-md text-gray-500 text-center'>{props.children}</p>
                    </div>
                    <div className='text-center flex items-center justify-center'>{props.footer}</div>
                </form>
            </div>
        </div>
    );
    return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = (props) => {
    return (
        <React.Fragment>
            {props.show && <Backdrop onClick={props.onCancel} />}
            <CSSTransition in={props.show} mountOnEnter unmountOnExit timeout={200} classNames='modal'>
                <ModalOverlay {...props} />
            </CSSTransition>
        </React.Fragment>
    );
};

export default Modal;

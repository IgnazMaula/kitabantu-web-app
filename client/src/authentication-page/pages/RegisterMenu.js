import { Link } from 'react-router-dom';

const RegisterMenu = () => {
    return (
        <div className='min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-md w-full space-y-8'>
                <div>
                    <Link to='/'>
                        <img className='mx-auto h-12 w-auto' src='../images/icon.png' alt='Workflow' />
                    </Link>
                    <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900 pt-12'>Login to Your Account</h2>
                    <p className='mt-2 text-center text-sm text-gray-600'>
                        Or{' '}
                        <Link to='/signin' className='font-medium text-red-600 hover:text-red-500'>
                            Create New Account
                        </Link>
                    </p>
                </div>
                <button
                    type='submit'
                    className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-60'
                >
                    Log In
                </button>
                <div className='text-sm text-center'>
                    <Link to='/' className='font-medium text-red-600 hover:text-red-500'>
                        Back to home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterMenu;

import { Link } from 'react-router-dom';

const RegisterMenu = () => {
    return (
        <div className='min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-md w-full space-y-8'>
                <div>
                    <Link to='/'>
                        <img className='mx-auto h-12 w-auto' src='../images/icon.png' alt='Workflow' />
                    </Link>
                    <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900 pt-12'>Select Type of Account to Register</h2>
                    <p className='mt-2 text-center text-sm text-gray-600'>
                        Or{' '}
                        <Link to='/login' className='font-medium text-red-600 hover:text-red-500'>
                            Login to Your Account
                        </Link>
                    </p>
                </div>
                <p className='py-4'>Register as service client to be able to order a service from service provider</p>
                <Link to='/register-as-client'>
                    <button className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-60'>
                        Register as Service Client
                    </button>
                </Link>
                <hr />
                <p className='py-4'>Register as service client to be able to offered a service to service client</p>
                <Link to='/register-as-provider'>
                    <button className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-60'>
                        Register as Service Provider
                    </button>
                </Link>
                <hr />
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

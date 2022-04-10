import { NavLink } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/outline';

export default function OrderAction(props) {
    const { status, loggedUser, order, refetchData } = props;
    return (
        <div className='bg-white px-4 py-5 border border-gray-200 sm:px-6 sm:rounded-lg'>
            <div className='-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap'>
                <div className='ml-4 mt-2'>
                    {status === 'Order Canceled' || status === 'Order Declined' ? (
                        <h3 className='text-lg leading-6 font-medium text-red-600'>{status}</h3>
                    ) : (
                        <h3 className='text-lg leading-6 font-medium text-green-600'>{status}</h3>
                    )}
                </div>
                <div className='ml-4 mt-2 flex-shrink-0'>
                    <Action status={status} loggedUser={loggedUser} order={order} refetchData={refetchData} />
                </div>
            </div>
        </div>
    );
}

const Action = (props) => {
    const { status, loggedUser, order, refetchData } = props;
    const updateOrderStatus = async (newStatus) => {
        // setOpen(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/orders/manage-status/${order.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: newStatus,
                }),
            });
            const responseData = await response.json();
            refetchData();
            if (!response.ok) {
                throw new Error(responseData.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (loggedUser.role === 'Client' && order.client === loggedUser.id && status === 'Waiting for Provider Approval') {
        return (
            <button
                type='button'
                onClick={() => updateOrderStatus('Order Canceled')}
                className='relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
            >
                Cancel Order
            </button>
        );
    } else if (loggedUser.role === 'Provider' && order.provider === loggedUser.id && status === 'Waiting for Provider Approval') {
        return (
            <>
                <button
                    type='button'
                    onClick={() => updateOrderStatus('Waiting for Payment')}
                    className='mr-3 relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                >
                    Accept Order
                </button>
                <button
                    type='button'
                    onClick={() => updateOrderStatus('Order Declined')}
                    className='relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                >
                    Decline Order
                </button>
            </>
        );
    } else if (loggedUser.role === 'Client' && order.client === loggedUser.id && status === 'Waiting for Payment') {
        return (
            <>
                <NavLink
                    to={`/order/${order.id}/payment`}
                    className='mr-3 relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                >
                    Proceed Payment
                </NavLink>
            </>
        );
    } else if (loggedUser.role === 'Provider' && order.provider === loggedUser.id && status === 'Waiting for Payment') {
        return <p className='mr-4'>Wait for Client to do the payment</p>;
    } else if (loggedUser.role === 'Client' && order.client === loggedUser.id && status === 'Service Incoming') {
        return <p className='mr-4'>Payment Success. Wait for Provider to fulfil the service</p>;
    } else if (loggedUser.role === 'Provider' && order.provider === loggedUser.id && status === 'Service Incoming') {
        return (
            <button
                type='button'
                onClick={() => updateOrderStatus('Complete Approval')}
                className='relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
                Finish Order
            </button>
        );
    } else if (loggedUser.role === 'Client' && order.client === loggedUser.id && status === 'Complete Approval') {
        return (
            <button
                type='button'
                onClick={() => updateOrderStatus('Order Completed')}
                className='relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
                Confirm Finished Order
            </button>
        );
    } else if (loggedUser.role === 'Provider' && order.provider === loggedUser.id && status === 'Complete Approval') {
        return <p className='mr-4'>Wait for Client to confirm that the service is completed</p>;
    } else if (loggedUser.role === 'Client' && order.client === loggedUser.id && status === 'Order Completed') {
        return (
            <button
                type='button'
                onClick=''
                className='relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400'
            >
                <StarIcon className='w-6 h-6 mr-2' />
                Write Review
            </button>
        );
    } else if (loggedUser.role === 'Provider' && order.provider === loggedUser.id && status === 'Order Completed') {
        return <p className='mr-4'>Service order is completed</p>;
    } else if (loggedUser.role === 'Client' && order.client === loggedUser.id && status === 'Order Canceled') {
        return <p className='mr-4'>You have canceled this order</p>;
    } else if (loggedUser.role === 'Provider' && order.provider === loggedUser.id && status === 'Order Canceled') {
        return <p className='mr-4'>Client decided to canceled this order</p>;
    } else if (loggedUser.role === 'Client' && order.client === loggedUser.id && status === 'Order Declined') {
        return <p className='mr-4'>Provider decided to canceled this order</p>;
    } else if (loggedUser.role === 'Provider' && order.provider === loggedUser.id && status === 'Order Declined') {
        return <p className='mr-4'>You have declined this order</p>;
    } else {
        return <div></div>;
    }
};

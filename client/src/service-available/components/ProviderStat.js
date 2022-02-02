import { CursorClickIcon, MailOpenIcon, UsersIcon } from '@heroicons/react/outline';

export default function ProviderStat(props) {
    const { serviceOwned, orderReceived, averageRating } = props;
    const stats = [
        { name: 'Service Owned', stat: `${serviceOwned}`, icon: UsersIcon },
        { name: 'Order Received', stat: `${orderReceived}`, icon: UsersIcon },
        { name: 'Average Rating', stat: `${averageRating}`, icon: UsersIcon },
    ];

    return (
        <div>
            <dl className='mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3'>
                {stats.map((item) => (
                    <div key={item.name} className='px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6'>
                        <dt>
                            <item.icon className='h-6 w-6 text-red-600' aria-hidden='true' />
                            <p className='text-sm font-medium text-gray-500 truncate'>{item.name}</p>
                        </dt>

                        <dd className='mt-1 text-3xl font-semibold text-gray-900'>{item.stat}</dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}

import { CursorClickIcon, MailOpenIcon, UsersIcon } from '@heroicons/react/outline';

/* This example requires Tailwind CSS v2.0+ */
const stats = [
    { name: 'Service Owned', stat: '71,897', icon: UsersIcon },
    { name: 'Total Provider', stat: '58.16%', icon: UsersIcon },
    { name: 'Total Client', stat: '24.57%', icon: UsersIcon },
];

export default function ProviderStat() {
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

/* This example requires Tailwind CSS v2.0+ */
import { MailIcon, PhoneIcon } from '@heroicons/react/solid'
import { users } from '../../users'

const people = [
    {
        name: 'Jane Cooper',
        title: 'Individual',
        role: 'Service Provider',
        email: 'janecooper@example.com',
        telephone: '+1-202-555-0170',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    // More people...
]

export default function ProviderProfile(props) {
    const provider = users.find(u => u.id === props.providerId);
    return (
        <ul role="list" className="grid">
            {people.map((person) => (
                <li
                    key={person.email}
                    className="col-span-1 flex flex-col text-center bg-white rounded-lg border-t border-b border-gray-200  sm:rounded-lg sm:border divide-y divide-gray-200"
                >
                    <div className="flex-1 flex flex-col p-8">
                        <img className="w-32 h-32 flex-shrink-0 mx-auto rounded-full" src={provider.image} alt="" />
                        <h3 className="mt-3 text-gray-900 text-sm font-medium text-2xl">{provider.firstName + ' ' + provider.lastName}</h3>
                        <dl className="mt-1 flex-grow flex flex-col justify-between">
                            <dt className="sr-only">Title</dt>
                            <dt className="sr-only">Role</dt>
                            <dd className="my-3">
                                <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                                    {person.role}
                                </span>
                            </dd>
                            <dd className="text-gray-500 text-sm text-justify">The Application UI Icon Pack comes with over 200 icons in 3 styles: outline, filled, and branded. This playful icon pack is tailored for complex application user interfaces with a friendly and legible look. icon pack is tailored for complex application user interfaces with a friendly and legible look.icon pack is tailored for complex application user interfaces with a friendly and legible look.</dd>
                        </dl>
                    </div>
                    <div>
                        <div className="-mt-px flex divide-x divide-gray-200">
                            <div className="w-0 flex-1 flex">
                                <a
                                    href='/'
                                    className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                                >
                                    <MailIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                    <span className="ml-3">View Profile</span>
                                </a>
                            </div>
                            <div className="-ml-px w-0 flex-1 flex">
                                <a
                                    href={`tel:${person.telephone}`}
                                    className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                                >
                                    <PhoneIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                    <span className="ml-3">Chat Provider</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}

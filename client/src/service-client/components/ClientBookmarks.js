/* This example requires Tailwind CSS v2.0+ */
import { useState, useEffect, useContext } from 'react';
import { CheckIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import { services } from '../../services';

const orders = [
    {
        products: [
            {
                id: 1,
                name: 'Jasa Catering Bu Haji Mahmud Khas Sunda',
                description:
                    "This durable double-walled insulated tumbler keeps your beverages at the perfect temperature all day long. Hot, cold, or even lukewarm if you're weird like that, this bottle is ready for your next adventure.",
                href: '#',
                price: '$35.00',
                status: 'out-for-delivery',
                date: 'January 5, 2021',
                datetime: '2021-01-05',
                imageSrc: 'https://awsimages.detik.net.id/community/media/visual/2021/10/08/catering-pon-papua-2.jpeg?w=1200',
                imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
            },
            {
                id: 1,
                name: 'Babysitter Handal Untuk Menjaga Anak Anda',
                description:
                    "This durable double-walled insulated tumbler keeps your beverages at the perfect temperature all day long. Hot, cold, or even lukewarm if you're weird like that, this bottle is ready for your next adventure.",
                href: '#',
                price: '$35.00',
                status: 'out-for-delivery',
                date: 'January 5, 2021',
                datetime: '2021-01-05',
                imageSrc:
                    'https://cdn.popmama.com/content-images/post/20190201/img-01022019-140032-800-x-420-pixel-230896231d7cc97a5d5f067392782519_600xauto.jpg',
                imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
            },
            {
                id: 1,
                name: 'Service Aneka Perangkat Elektronik Rumah',
                description:
                    "This durable double-walled insulated tumbler keeps your beverages at the perfect temperature all day long. Hot, cold, or even lukewarm if you're weird like that, this bottle is ready for your next adventure.",
                href: '#',
                price: '$35.00',
                status: 'out-for-delivery',
                date: 'January 5, 2021',
                datetime: '2021-01-05',
                imageSrc: 'https://cdn-2.tstatic.net/bogor/foto/bank/images/jasa-service-elektronik_20160107_180725.jpg',
                imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
            },
        ],
    },
    // More orders...
];

export default function ClientBookmarks() {
    const auth = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [bookmarks, setBookmarks] = useState([]);
    useEffect(() => {
        const getService = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/users/bookmarks/${auth.loggedUser.id}`);
                const responseData = await response.json();
                setBookmarks(responseData.services);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        };
        getService();
    }, [bookmarks]);

    const removeBookmarkHandler = async (sid) => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/update/remove-bookmarks/${auth.loggedUser.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    serviceId: sid,
                }),
            });
            console.log(sid);
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='bg-white'>
            <div className='max-w-7xl mx-auto sm:px-2 lg:px-8'>
                <div className='px-4 sm:px-0'>
                    <h1 className='text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl'>My Bookmarks</h1>
                    <p className='mt-2 text-sm text-gray-500'>Check the status of recent orders, manage returns, and download invoices.</p>
                </div>

                <div className='mt-16'>
                    {isLoading ? (
                        <div className='text-center p-24'>
                            <LoadingSpinner />
                        </div>
                    ) : (
                        <div className='space-y-16 sm:space-y-24'>
                            <div>
                                <div className='mt-6 flow-root px-4 sm:mt-10 sm:px-0'>
                                    <div className='-my-6 divide-y divide-gray-200 sm:-my-10'>
                                        {bookmarks.map((bookmark) => (
                                            <div key={bookmark.id} className='flex py-6 sm:py-10'>
                                                <div className='min-w-0 flex-1 lg:flex lg:flex-col'>
                                                    <div className='lg:flex-1'>
                                                        <div className='flex'>
                                                            <div className='flex-1 text-sm'>
                                                                <div className='font-medium text-gray-900 sm:flex sm:justify-between'>
                                                                    <h3 className='text-base'>{bookmark.name}</h3>
                                                                </div>
                                                                <h3 className='text-gray-500 mb-8'>
                                                                    {bookmark.category}, {bookmark.subCategory}
                                                                </h3>

                                                                <p className='hidden sm:block sm:mt-2'>{bookmark.description}</p>
                                                                <p className='hidden sm:block sm:mt-2'>
                                                                    <b>Tags:</b> {bookmark.properties.join(', ')}
                                                                </p>
                                                            </div>
                                                            {/* <p className='mt-1 font-medium text-gray-900 sm:mt-0 sm:ml-6'>{bookmark.price}</p> */}
                                                        </div>
                                                        <div className='mt-8 flex text-sm font-medium sm:mt-8'>
                                                            <Link to={`/service/${bookmark.id}`}>
                                                                <button className='flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none'>
                                                                    Visit Service Page
                                                                </button>
                                                            </Link>
                                                            <div className='border-l border-gray-200 ml-4 pl-4 sm:ml-6 sm:pl-6'>
                                                                <button
                                                                    onClick={() => removeBookmarkHandler(bookmark.id)}
                                                                    className='flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none'
                                                                >
                                                                    Remove Bookmark
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='ml-4 flex-shrink-0 sm:m-0 sm:mr-6 sm:order-first'>
                                                    <img
                                                        src={`http://localhost:5000/${bookmark.image}`}
                                                        alt={`http://localhost:5000/${bookmark.image}`}
                                                        className='col-start-2 col-end-3 sm:col-start-1 sm:row-start-1 sm:row-span-2 w-20 h-20 rounded-lg object-center object-cover sm:w-40 sm:h-40 lg:w-52 lg:h-52'
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

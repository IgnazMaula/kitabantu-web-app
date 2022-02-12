import { Link } from 'react-router-dom';

export default function EmptyState(props) {
    const { title, link, children } = props;
    return (
        <Link to={link}>
            <button
                type='button'
                className='relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400'
            >
                {children}

                <span className='mt-2 block text-sm font-medium text-gray-400'>{title}</span>
            </button>
        </Link>
    );
}

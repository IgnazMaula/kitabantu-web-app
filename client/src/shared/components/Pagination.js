/* This example requires Tailwind CSS v2.0+ */
import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@heroicons/react/solid';

export default function Pagination({ postPerPage, totalPost, currentPage, paginate }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className='border-t border-gray-200 px-4 flex items-center justify-between sm:px-0'>
            <div className='-mt-px w-0 flex-1 flex'></div>
            <div className='hidden md:-mt-px md:flex'>
                {/* <a href='#' className='border-red-500 text-red-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium'>
                    1
                </a> */}
                {/* Current: "border-red-500 text-red-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
                {pageNumbers.map((number) => (
                    <button
                        onClick={() => paginate(number)}
                        key={number}
                        className={
                            number === currentPage
                                ? 'border-blue-500 text-blue-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium'
                        }
                        aria-current='page'
                    >
                        {number}
                    </button>
                ))}
            </div>
            <div className='-mt-px w-0 flex-1 flex'></div>
        </nav>
    );
}

/* This example requires Tailwind CSS v2.0+ */
export default function Badge(props) {
    return (
        <>
            <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800 ${props.className}`}>
                <svg className='-ml-1 mr-1.5 h-2 w-2 text-gray-400' fill='currentColor' viewBox='0 0 8 8'>
                    <circle cx={4} cy={4} r={3} />
                </svg>
                {props.name}
            </span>
        </>
    );
}

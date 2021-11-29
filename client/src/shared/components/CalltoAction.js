import React from "react";

export const CalltoAction = () => {
    return (
        <div>
            <section className="bg-red-700 px-4 py-12 mt-24 mb-12 mx-auto">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold leading-9 text-white sm:text-4xl sm:leading-10">
                        Providing Services from Our Trusted Partners Directly Into Your Home
                    </h2>
                    <p className="mt-3 text-base leading-7 sm:mt-4 text-white">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi beatae quibusdam numquam!
                    </p>
                </div>
                <div className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
                    <div>
                        <p className="text-5xl font-extrabold leading-none text-white">
                            50
                        </p>
                        <p className="mt-2 text-base font-medium leading-6 text-white">
                            Service Categories
                        </p>
                    </div>
                    <div className="mt-10 sm:mt-0">
                        <p className="text-5xl font-extrabold leading-none text-white">
                            125+
                        </p>
                        <p className="mt-2 text-base font-medium leading-6 text-white">
                            Service Provider
                        </p>
                    </div>
                    <div className="mt-10 sm:mt-0">
                        <p className="text-5xl font-extrabold leading-none text-white">
                            150+
                        </p>
                        <p className="mt-2 text-base font-medium leading-6 text-white">
                            Services
                        </p>
                    </div>
                </div>
                <div className="w-52 mx-auto mt-4 p-4 flex">
                    <div className="rounded-md shadow">
                        <a
                            href="#"
                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-800 hover:bg-red-600 md:py-4 md:text-lg md:px-10"
                        >
                            Get started
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CalltoAction;

// import React from "react";

// export const CalltoAction = () => {
//     return (
//         <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
//             <div className="grid gap-10 lg:grid-cols-2">
//                 <div className="flex flex-col justify-center md:pr-8 xl:pr-0 lg:max-w-lg">
//                     <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-teal-accent-400">
//                         <svg className="text-teal-900 w-7 h-7" viewBox="0 0 24 24">
//                             <polyline
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeMiterlimit="10"
//                                 points=" 8,5 8,1 16,1 16,5"
//                                 strokeLinejoin="round"
//                             />
//                             <polyline
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeMiterlimit="10"
//                                 points="9,15 1,15 1,5 23,5 23,15 15,15"
//                                 strokeLinejoin="round"
//                             />
//                             <polyline
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeMiterlimit="10"
//                                 points="22,18 22,23 2,23 2,18"
//                                 strokeLinejoin="round"
//                             />
//                             <rect
//                                 x="9"
//                                 y="13"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeMiterlimit="10"
//                                 width="6"
//                                 height="4"
//                                 strokeLinejoin="round"
//                             />
//                         </svg>
//                     </div>
//                     <div className="max-w-xl mb-6">
//                         <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
//                             Let us handle
//                             <br className="hidden md:block" />
//                             your next{' '}
//                             <span className="inline-block text-deep-purple-accent-400">
//                                 destination
//                             </span>
//                         </h2>
//                         <p className="text-base text-gray-700 md:text-lg">
//                             Sed ut perspiciatis unde omnis iste natus error sit voluptatem
//                             accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
//                             quae. explicabo.
//                         </p>
//                     </div>
//                     <div>
//                         <a
//                             href="/"
//                             aria-label=""
//                             className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
//                         >
//                             Learn more
//                             <svg
//                                 className="inline-block w-3 ml-2"
//                                 fill="currentColor"
//                                 viewBox="0 0 12 12"
//                             >
//                                 <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
//                             </svg>
//                         </a>
//                     </div>
//                 </div>
//                 <div className="flex items-center justify-center -mx-4 lg:pl-8">
//                     <div className="flex flex-col items-end px-3">
//                         <img
//                             className="object-cover mb-6 rounded shadow-lg h-28 sm:h-48 xl:h-56 w-28 sm:w-48 xl:w-56"
//                             src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
//                             alt=""
//                         />
//                         <img
//                             className="object-cover w-20 h-20 rounded shadow-lg sm:h-32 xl:h-40 sm:w-32 xl:w-40"
//                             src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
//                             alt=""
//                         />
//                     </div>
//                     <div className="px-3">
//                         <img
//                             className="object-cover w-40 h-40 rounded shadow-lg sm:h-64 xl:h-80 sm:w-64 xl:w-80"
//                             src="https://images.pexels.com/photos/3182739/pexels-photo-3182739.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;w=500"
//                             alt=""
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CalltoAction;

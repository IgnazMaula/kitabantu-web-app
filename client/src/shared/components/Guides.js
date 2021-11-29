import React from 'react'

const Guides = () => {
    return (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                <div>
                    <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                        Brand new
                    </p>
                </div>
                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                    <span className="relative inline-block">
                        <span className="relative">The</span>
                    </span>{' '}
                    quick, brown fox jumps over a lazy dog
                </h2>
                <p className="text-base text-gray-700 md:text-lg">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                    accusantium doloremque rem aperiam, eaque ipsa quae.
                </p>
            </div>
            <div className="relative grid gap-8 row-gap-5 mb-8 md:row-gap-8 lg:grid-cols-4 sm:grid-cols-2">
                <div className="absolute inset-0 flex items-center justify-center sm:hidden lg:flex">
                    <div className="w-px h-full bg-gray-300 lg:w-full lg:h-px" />
                </div>
                <div className="p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-lg font-bold leading-5">Believe</p>
                        <p className="flex items-center justify-center w-6 h-6 font-bold rounded text-deep-purple-accent-400 bg-indigo-50">
                            1
                        </p>
                    </div>
                    <p className="text-sm text-gray-900">
                        Skate ipsum dolor sit amet, alley oop vert mute-air Colby Carter
                        flail 180 berm.
                    </p>
                </div>
                <div className="p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-lg font-bold leading-5">Be yourself</p>
                        <p className="flex items-center justify-center w-6 h-6 font-bold rounded text-deep-purple-accent-400 bg-indigo-50">
                            2
                        </p>
                    </div>
                    <p className="text-sm text-gray-900">
                        A flower in my garden, a mystery in my panties. Heart attack never
                        stopped.
                    </p>
                </div>
                <div className="p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-lg font-bold leading-5">Just do it</p>
                        <p className="flex items-center justify-center w-6 h-6 font-bold rounded text-deep-purple-accent-400 bg-indigo-50">
                            3
                        </p>
                    </div>
                    <p className="text-sm text-gray-900">
                        Chase ball of string eat plants, meow, and throw up because I ate
                        plants going.
                    </p>
                </div>
                <div className="p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-lg font-bold leading-5">Eat that</p>
                        <p className="flex items-center justify-center w-6 h-6 font-bold rounded text-deep-purple-accent-400 bg-indigo-50">
                            4
                        </p>
                    </div>
                    <p className="text-sm text-gray-900">
                        Bro ipsum dolor sit amet gaper backside single track, manny Bike
                        epic clipless.
                    </p>
                </div>
            </div>
            <div className="text-center">
                <a
                    href="/"
                    className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md md:w-auto bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                >
                    Learn more
                </a>
            </div>
        </div>
    )
}

export default Guides

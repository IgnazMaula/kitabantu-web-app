import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutUs = () => {
    return (
        <div>
            <Navbar />
            <div className='relative bg-white py-16 sm:py-24'>
                <div className='lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start'>
                    <div className='relative sm:py-16 lg:py-0'>
                        <div aria-hidden='true' className='hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen'>
                            <div className='absolute inset-y-0 right-1/2 w-full bg-gray-50 rounded-r-3xl lg:right-72' />
                            <svg
                                className='absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12'
                                width={404}
                                height={392}
                                fill='none'
                                viewBox='0 0 404 392'
                            >
                                <defs>
                                    <pattern
                                        id='02f20b47-fd69-4224-a62a-4c9de5c763f7'
                                        x={0}
                                        y={0}
                                        width={20}
                                        height={20}
                                        patternUnits='userSpaceOnUse'
                                    >
                                        <rect x={0} y={0} width={4} height={4} className='text-gray-200' fill='currentColor' />
                                    </pattern>
                                </defs>
                                <rect width={404} height={392} fill='url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)' />
                            </svg>
                        </div>
                        <div className='relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-20'>
                            {/* Testimonial card*/}
                            <img src='/images/banner.png' alt='' />
                        </div>
                    </div>

                    <div className='relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0'>
                        {/* Content area */}
                        <div className='pt-12 sm:pt-16 lg:pt-20'>
                            <h2 className='text-3xl text-gray-900 font-extrabold tracking-tight sm:text-4xl'>About Kita Bantu</h2>
                            <div className='mt-6 text-gray-500 space-y-6'>
                                <p className='text-base leading-7 text-justify'>
                                    KitaBantu is a platform for home service workers to offer services to clients. KitaBantu means “We Help”
                                    (translated from Indonesian), this is because we envision the platform to help home service workers get a wider
                                    market as well as to help the general public to get home service easily anywhere and anytime. Our project aims to
                                    provide a platform where workers, especially those who are financially impacted by the COVID-19 pandemic, can
                                    offer on-demand home services to clients and increase income. We adopt a multi-faceted platform model, which will
                                    encourage workers to become self-employed enabling them to create their own working conditions and contribute to
                                    the workers' work-life balance.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AboutUs;

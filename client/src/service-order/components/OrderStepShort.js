/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon } from '@heroicons/react/solid';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function OrderStepShort(props) {
    const steps = props.steps;
    return (
        <div className='lg:border-t lg:border-b lg:border-gray-200'>
            <nav className='mx-auto max-w-7xl' aria-label='Progress'>
                <ol role='list' className='rounded-md overflow-hidden lg:flex lg:border-l lg:border-r lg:border-gray-200 lg:rounded-none'>
                    {steps.map((step, stepIdx) => (
                        <li key={step.id} className='relative overflow-hidden lg:flex-1'>
                            <div
                                className={classNames(
                                    stepIdx === 0 ? 'border-b-0 rounded-t-md' : '',
                                    stepIdx === steps.length - 1 ? 'border-t-0 rounded-b-md' : '',
                                    'border border-gray-200 overflow-hidden lg:border-0'
                                )}
                            >
                                {step.status === 'complete' ? (
                                    <>
                                        <span
                                            className='absolute top-0 left-0 w-1 h-full bg-green-600 lg:w-full lg:h-1 lg:bottom-0 lg:top-auto'
                                            aria-hidden='true'
                                        />
                                        <span
                                            className={classNames(stepIdx !== 0 ? 'lg:pl-9' : '', 'px-6 py-5 flex items-start text-sm font-medium')}
                                        >
                                            <span className='flex-shrink-0'>
                                                <span className='w-10 h-10 flex items-center justify-center bg-green-600 rounded-full'>
                                                    <CheckIcon className='w-6 h-6 text-white' aria-hidden='true' />
                                                </span>
                                            </span>
                                            <span className='mt-0.5 ml-4 min-w-0 flex flex-col'>
                                                <span className='text-xs font-semibold tracking-wide'>{step.name}</span>
                                            </span>
                                        </span>
                                    </>
                                ) : step.status === 'current' ? (
                                    <>
                                        <span
                                            className='absolute top-0 left-0 w-1 h-full bg-green-600 lg:w-full lg:h-1 lg:bottom-0 lg:top-auto'
                                            aria-hidden='true'
                                        />
                                        <span
                                            className={classNames(stepIdx !== 0 ? 'lg:pl-9' : '', 'px-6 py-5 flex items-start text-sm font-medium')}
                                        >
                                            <span className='flex-shrink-0'>
                                                <span className='w-10 h-10 flex items-center justify-center border-2 border-green-600 rounded-full'>
                                                    <span className='text-green-600'>{step.id}</span>
                                                </span>
                                            </span>
                                            <span className='mt-0.5 ml-4 min-w-0 flex flex-col'>
                                                <span className='text-xs font-semibold tracking-wide'>{step.name}</span>
                                            </span>
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span
                                            className='absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-gray-200 lg:w-full lg:h-1 lg:bottom-0 lg:top-auto'
                                            aria-hidden='true'
                                        />
                                        <span
                                            className={classNames(stepIdx !== 0 ? 'lg:pl-9' : '', 'px-6 py-5 flex items-start text-sm font-medium')}
                                        >
                                            <span className='flex-shrink-0'>
                                                <span className='w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full'>
                                                    <span className='text-gray-500'>{step.id}</span>
                                                </span>
                                            </span>
                                            <span className='mt-0.5 ml-4 min-w-0 flex flex-col'>
                                                <span className='text-xs font-semibold tracking-wide'>{step.name}</span>
                                            </span>
                                        </span>
                                    </>
                                )}

                                {stepIdx !== 0 ? (
                                    <>
                                        {/* Separator */}
                                        <div className='hidden absolute top-0 left-0 w-3 inset-0 lg:block' aria-hidden='true'>
                                            <svg className='h-full w-full text-gray-300' viewBox='0 0 12 82' fill='none' preserveAspectRatio='none'>
                                                <path d='M0.5 0V31L10.5 41L0.5 51V82' stroke='currentcolor' vectorEffect='non-scaling-stroke' />
                                            </svg>
                                        </div>
                                    </>
                                ) : null}
                            </div>
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    );
}

import { Fragment } from 'react';

const Steps = () => {
    return (
        <Fragment>
            <div className=" mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-slate-900 to-fuchsia-900 -mt-8">
                <div>
                    <div class="text-center">
                        <h2 className="text-3xl font-extrabold text-white sm:text-4xl ">
                            How It Works
                        </h2>
                    </div>
                    <dl className="mt-12 space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
                        <div className="text-center">
                            <div className="flex flex-col items-center justify-center">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-purple-400 to-pink-600 text-white">
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                                <div className="mt-5">
                                    <dt className="text-lg leading-6 font-medium text-white">
                                        Step 1
                                    </dt>
                                    <dd className="mt-2 text-base text-gray-500">
                                        Create Phantom wallet and connect it to Deffy
                                    </dd>
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="flex flex-col items-center justify-center">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-purple-400 to-pink-600 text-white">
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                                <div className="mt-5">
                                    <dt className="text-lg leading-6 font-medium text-white">
                                        Step 2
                                    </dt>
                                    <dd className="mt-2 text-base text-gray-500">
                                        Create Campaign by filling the form
                                    </dd>
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <div class="flex flex-col items-center justify-center">
                                <div class="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-purple-400 to-pink-600 text-white">
                                    <svg
                                        class="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                                <div class="mt-5">
                                    <dt class="text-lg leading-6 font-medium text-white">
                                        Step 3
                                    </dt>
                                    <dd class="mt-2 text-base text-gray-500">
                                        Interact with your campign and explore others.
                                    </dd>
                                </div>
                            </div>
                        </div>
                    </dl>
                </div>
            </div>
        </Fragment>
    );
};

export default Steps;
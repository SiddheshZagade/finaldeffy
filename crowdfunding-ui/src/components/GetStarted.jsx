import React from 'react';

const GetStarted = () => {
    return (
        <div class="h-screen flex flex-col bg-gradient-to-b from-slate-900 to-fuchsia-900">
            <div class="container px-6 mx-auto mt-12">
                <section class="mb-12 text-gray-800 text-center">
                    <div class="text-center mb-14">
                        <h2 className="text-3xl font-extrabold text-white sm:text-4xl ">
                            Why is it so great?
                        </h2>
                    </div>

                    <div class="grid lg:gap-x-12 lg:grid-cols-3">
                        <div class="mb-12 lg:mb-0">
                            <div class="rounded-lg shadow-lg h-full block bg-white">
                                <div class="flex justify-center">
                                    <div class="p-4 bg-blue-600 rounded-full shadow-lg inline-block -mt-8">
                                        <svg
                                            class="w-5 h-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 640 512"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H112C85.5 0 64 21.5 64 48v48H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h272c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H40c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H64v128c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                                <div class="p-6">
                                    <h5 class="text-lg font-semibold mb-4">
                                        Low Cost
                                    </h5>
                                    <p>
                                        Our app offers low transaction fees,
                                        making it cost-effective for clients to
                                        launch and run campaigns. This means
                                        more funds can go towards the cause they
                                        are fundraising for, allowing them to
                                        make a greater impact with their
                                        campaigns.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="mb-12 lg:mb-0">
                            <div class="rounded-lg shadow-lg h-full block bg-white">
                                <div class="flex justify-center">
                                    <div class="p-4 bg-blue-600 rounded-full shadow-lg inline-block -mt-8">
                                        <svg
                                            class="w-8 h-8 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3zM256.1 446.3l-.1-381 175.9 73.3c-3.3 151.4-82.1 261.1-175.8 307.7z"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                                <div class="p-6">
                                    <h5 class="text-lg font-semibold mb-4">
                                        Safe and solid
                                    </h5>
                                    <p>
                                        Our app uses Solana's secure and
                                        decentralized blockchain technology to
                                        ensure the safety of our clients' funds.
                                        This reduces the risk of fraud, hacking,
                                        and other security threats, providing
                                        peace of mind to our clients.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="">
                            <div class="rounded-lg shadow-lg h-full block bg-white">
                                <div class="flex justify-center">
                                    <div class="p-4 bg-blue-600 rounded-full shadow-lg inline-block -mt-8">
                                        <svg
                                            class="w-8 h-8 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M505.12019,19.09375c-1.18945-5.53125-6.65819-11-12.207-12.1875C460.716,0,435.507,0,410.40747,0,307.17523,0,245.26909,55.20312,199.05238,128H94.83772c-16.34763.01562-35.55658,11.875-42.88664,26.48438L2.51562,253.29688A28.4,28.4,0,0,0,0,264a24.00867,24.00867,0,0,0,24.00582,24H127.81618l-22.47457,22.46875c-11.36521,11.36133-12.99607,32.25781,0,45.25L156.24582,406.625c11.15623,11.1875,32.15619,13.15625,45.27726,0l22.47457-22.46875V488a24.00867,24.00867,0,0,0,24.00581,24,28.55934,28.55934,0,0,0,10.707-2.51562l98.72834-49.39063c14.62888-7.29687,26.50776-26.5,26.50776-42.85937V312.79688c72.59753-46.3125,128.03493-108.40626,128.03493-211.09376C512.07526,76.5,512.07526,51.29688,505.12019,19.09375ZM384.04033,168A40,40,0,1,1,424.05,128,40.02322,40.02322,0,0,1,384.04033,168Z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div class="p-6">
                                    <h5 class="text-lg font-semibold mb-4">
                                        Extremely fast
                                    </h5>
                                    <p>
                                        Our app is built on Solana's high-speed
                                        blockchain technology that allows for
                                        instant transactions. This means our
                                        clients can launch their fundraising
                                        campaigns quickly and receive funds
                                        instantly, helping them achieve their
                                        goals faster.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default GetStarted;

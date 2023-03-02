import React from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import GetStarted from '../components/GetStarted.jsx';
import Steps from '../components/Steps.jsx';
import Footer from '../components/Footer.jsx';

const Home = () => {
    return (
        <div>
            <div
                name="home"
                className="w-full h-screen bg-gradient-to-b from-slate-900 to-fuchsia-900"
            >
                {/* Container */}
                <div className="max-w-[1000px] mx-auto px-8 flex flex-col justify-center h-full">
                    <p className="text-pink-600">Welcome to a</p>
                    <h1 className="text-4xl sm:text-7xl font-bold text-[#ccd6f6]">
                        Crowdfunding Platform
                    </h1>
                    <h2 className="text-4xl sm:text-7xl font-bold text-[#8892b0]">
                        On Solana
                    </h2>
                    <p className="text-[#8892b0] py-4 max-w-[700px]">
                        Empowering Crowdfunding with Fast and Affordable
                        Transactions on the Solana Blockchain. Deffy is designed
                        to provide a faster and more affordable alternative to
                        traditional crowdfunding platforms
                    </p>
                    <Link to="/campaigns" className="no-underline">
                        <button className="text-white group border-2 px-6 py-3 my-2 flex items-center hover:bg-pink-600 hover:border-pink-600">
                            View Campaigns
                            <span className="group-hover:bounce-90 duration-300">
                                <HiArrowNarrowRight className="ml-3 " />
                            </span>
                        </button>
                    </Link>
                </div>
            </div>

            <Steps />
            <GetStarted />
            <Footer />
        </div>
    );
};

export default Home;

import React from 'react';

const About = () => {
  return (
    <div name='about' className='w-full h-screen bg-[#0a192f] text-gray-300'>
      <div className='flex flex-col justify-center items-center w-full h-full'>
        <div className='max-w-[1000px] w-full grid grid-cols-2 gap-8'>
          <div className='sm:text-right pb-8 pl-4'>
            <p className='text-4xl font-bold inline border-b-4 border-pink-600'>
              About
            </p>
          </div>
          <div></div>
          </div>
          <div className='max-w-[1000px] w-full grid sm:grid-cols-2 gap-8 px-4'>
            <div className='sm:text-right text-4xl font-bold'>
              <p>Hi. Wecome to Deffy funds, nice to meet you. Please take a look around.</p>
            </div>
            <div>
              <p>We are proud to present the Solana crowdfunding app, which was developed by a team of skilled engineers. The team includes Krish Patil and Siddesh Zagade, who worked tirelessly to build a secure and user-friendly platform for our users. We are grateful for their hard work and dedication to this project, and we are confident that their contributions will help us achieve our goal of revolutionizing the crowdfunding industry.
</p>  
            </div>
          </div>
      </div>
    </div>
  );
};

export default About;
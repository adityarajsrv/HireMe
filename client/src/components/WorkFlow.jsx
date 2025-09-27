import { RiArrowRightFill } from '@remixicon/react';

const WorkFlow = () => {
  return (
    <div className="py-8 sm:py-12 md:py-15 px-4 sm:px-6 md:px-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold text-gray-900">
        How it <span className="text-[#212E7C]">Works?</span>
      </h1>
      <div className="relative mt-6 sm:mt-8 md:mt-10">
        <div className="flex flex-col sm:flex-row justify-center items-center sm:items-stretch gap-4 sm:gap-6 md:gap-8 px-4 sm:px-10 md:px-20">
          <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 text-center w-full sm:w-60 md:w-72">
            <h2 className="text-2xl sm:text-3xl text-[#212E7C] font-semibold">Step 1</h2>
            <h3 className="text-lg sm:text-xl font-semibold mt-1 sm:mt-2">Register Account</h3>
            <p className="text-gray-600 mt-1 text-sm sm:text-base md:text-lg">First you need to make an account</p>
            <button className="mt-3 sm:mt-4 bg-[#212E7C] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded cursor-pointer text-sm sm:text-base hover:bg-[#1a2563] transition-colors">
              REGISTER ACCOUNT
            </button>
          </div>
          <div className="hidden sm:flex items-center">
            <RiArrowRightFill size={32} sm:size={40} md:size={48} color={"#212E7C"} />
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 text-center w-full sm:w-60 md:w-72">
            <h2 className="text-2xl sm:text-3xl text-[#212E7C] font-semibold">Step 2</h2>
            <h3 className="text-lg sm:text-xl font-semibold mt-1 sm:mt-2">Find Job</h3>
            <p className="text-gray-600 mt-1 text-sm sm:text-base md:text-lg">Second, search for the job you want</p>
            <button className="mt-3 sm:mt-4 bg-[#212E7C] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded cursor-pointer text-sm sm:text-base hover:bg-[#1a2563] transition-colors">
              FIND JOB
            </button>
          </div>
          <div className="hidden sm:flex items-center">
            <RiArrowRightFill size={32} sm:size={40} md:size={48} color={"#212E7C"} />
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 text-center w-full sm:w-60 md:w-72">
            <h2 className="text-2xl sm:text-3xl text-[#212E7C] font-semibold">Step 3</h2>
            <h3 className="text-lg sm:text-xl font-semibold mt-1 sm:mt-2">Apply Job</h3>
            <p className="text-gray-600 mt-1 text-sm sm:text-base md:text-lg">Apply to the company and wait it</p>
            <button className="mt-3 sm:mt-4 bg-[#212E7C] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded cursor-pointer text-sm sm:text-base hover:bg-[#1a2563] transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkFlow;
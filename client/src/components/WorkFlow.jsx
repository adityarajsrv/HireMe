import { RiArrowRightFill } from '@remixicon/react'; 

const WorkFlow = () => {
  return (
    <div className="mt-15 py-3">
      <h1 className="text-5xl text-center font-bold">How it <span className="text-[#212E7C]">Works?</span></h1>
      <div className="relative mt-10">
        <div className="flex flex-row justify-between items-stretch px-30">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center w-72">
            <h2 className="text-3xl text-[#212E7C]">Step 1</h2>
            <h3 className="text-xl font-semibold mt-2">Register Account</h3>
            <p className="text-gray-600 mt-1 text-lg">First you need to make an account</p>
            <button className="mt-4 bg-[#212E7C] text-white px-4 py-2 rounded cursor-pointer">REGISTER ACCOUNT</button>
          </div>
          <div className="flex items-center">
            <RiArrowRightFill size={48} color={"#212E7C"} /> 
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center w-72">
            <h2 className="text-3xl text-[#212E7C]">Step 2</h2>
            <h3 className="text-xl font-semibold mt-2">Find Job</h3>
            <p className="text-gray-600 mt-1 text-lg">Second, search for the job you want</p>
            <button className="mt-4 bg-[#212E7C] text-white px-4 py-2 rounded cursor-pointer">FIND JOB</button>
          </div>
          <div className="flex items-center">
            <RiArrowRightFill size={48} color={"#212E7C"} /> 
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center w-72">
            <h2 className="text-3xl text-[#212E7C]">Step 3</h2>
            <h3 className="text-xl font-semibold mt-2">Apply Job</h3>
            <p className="text-gray-600 mt-1 text-lg">Apply to the company and wait it</p>
            <button className="mt-4 bg-[#212E7C] text-white px-4 py-2 rounded cursor-pointer">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkFlow;
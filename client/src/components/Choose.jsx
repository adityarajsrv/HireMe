const Choose = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Why Choose <span className="text-[#212E7C]">HireMe?</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl sm:max-w-4xl mx-auto leading-relaxed">
            Our platform combines cutting-edge technology with user-friendly design 
            to revolutionize the hiring process for both job seekers and employers.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
          <div className="group bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="text-[#212E7C] bg-blue-100 p-3 sm:p-4 rounded-2xl group-hover:bg-[#212E7C] group-hover:text-white transition-colors duration-300">
                <svg
                  className="w-6 sm:w-8 h-6 sm:h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 text-center group-hover:text-[#212E7C] transition-colors duration-300">
              Secure Registration & Login (JWT)
            </h3>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed text-center">
              Industry-standard security protocols to protect your data and ensure 
              safe access to your account with JSON Web Token authentication.
            </p>
          </div>
          <div className="group bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="text-[#212E7C] bg-blue-100 p-3 sm:p-4 rounded-2xl group-hover:bg-[#212E7C] group-hover:text-white transition-colors duration-300">
                <svg
                  className="w-6 sm:w-8 h-6 sm:h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6h2v-2h2v-2h-2V7zm0 6h-2v2h2v-2z"/>
                </svg>
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 text-center group-hover:text-[#212E7C] transition-colors duration-300">
              Personalized Profiles
            </h3>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed text-center">
              Create detailed profiles that showcase your skills, experience, and career 
              goals or company culture with customizable templates and AI-powered suggestions.
            </p>
          </div>
          <div className="group bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="text-[#212E7C] bg-blue-100 p-3 sm:p-4 rounded-2xl group-hover:bg-[#212E7C] group-hover:text-white transition-colors duration-300">
                <svg
                  className="w-6 sm:w-8 h-6 sm:h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6h2v-2h2v-2h-2V7zm0 6h-2v2h2v-2z"/>
                </svg>
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 text-center group-hover:text-[#212E7C] transition-colors duration-300">
              Easy Job Applications
            </h3>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed text-center">
              Streamlined application process that saves time for both candidates 
              and recruiters with one-click apply and smart matching algorithms.
            </p>
          </div>
        </div>
        <div className="text-center mt-8 sm:mt-12 md:mt-16">
          <div className="bg-gradient-to-r from-[#344392] to-[#141e56] rounded-2xl p-6 sm:p-8 shadow-lg">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
              Ready to Transform Your Hiring Experience?
            </h3>
            <p className="text-blue-100 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 max-w-xl sm:max-w-2xl mx-auto">
              Join thousands of professionals who have already discovered the power of HireMe.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button className="cursor-pointer bg-white text-[#212E7C] px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg text-sm sm:text-base">
                Get Started Free
              </button>
              <button className="cursor-pointer border-2 border-white text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors duration-200 text-sm sm:text-base">
                Schedule a Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Choose;
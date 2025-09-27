import hero from "../assets/hero.png";
import amazon from "../assets/amazon.png";
import jpmorgan from "../assets/jpmorgan.png";
import meta from "../assets/meta.png";
import microsoft from "../assets/microsoft.png";
import google from "../assets/google.png";
import salesforce from "../assets/salesforce.png";
import netflix from "../assets/netflix.png";
import samsung from "../assets/samsung.png";
import spotify from "../assets/spotify.png";
import { Link } from "react-router-dom";

const Hero = () => {
  const logos = [
    {
      src: amazon,
      alt: "Amazon",
      className:
        "h-8 sm:h-10 md:h-12 w-24 sm:w-32 md:w-36 mx-4 sm:mx-6 md:mx-8 mt-4 sm:mt-5 md:mt-6",
    },
    {
      src: microsoft,
      alt: "Microsoft",
      className:
        "h-8 sm:h-10 md:h-12 w-28 sm:w-36 md:w-40 mx-4 sm:mx-6 md:mx-8 mt-3 sm:mt-4 md:mt-5",
    },
    {
      src: jpmorgan,
      alt: "JPMorgan",
      className:
        "h-8 sm:h-10 md:h-12 w-28 sm:w-36 md:w-40 mx-4 sm:mx-6 md:mx-8 mt-3 sm:mt-4 md:mt-5",
    },
    {
      src: google,
      alt: "Google",
      className:
        "h-8 sm:h-10 md:h-12 w-24 sm:w-32 md:w-36 mx-4 sm:mx-6 md:mx-8 mt-2 sm:mt-3 md:mt-4",
    },
    {
      src: meta,
      alt: "Meta",
      className:
        "h-12 sm:h-16 md:h-20 w-24 sm:w-32 md:w-40 mx-4 sm:mx-6 md:mx-8",
    },
    {
      src: spotify,
      alt: "Spotify",
      className:
        "h-8 sm:h-10 md:h-12 w-24 sm:w-32 md:w-36 mx-4 sm:mx-6 md:mx-8 mt-2 sm:mt-3 md:mt-4",
    },
    {
      src: salesforce,
      alt: "Salesforce",
      className:
        "h-10 sm:h-12 md:h-16 w-16 sm:w-20 md:w-24 mx-4 sm:mx-6 md:mx-8 mt-2 sm:mt-2 md:mt-3",
    },
    {
      src: netflix,
      alt: "Netflix",
      className:
        "h-8 sm:h-10 md:h-12 w-28 sm:w-36 md:w-40 mx-4 sm:mx-6 md:mx-8 mt-2 sm:mt-3 md:mt-4",
    },
    {
      src: samsung,
      alt: "Samsung",
      className:
        "h-8 sm:h-10 md:h-12 w-24 sm:w-32 md:w-36 mx-4 sm:mx-6 md:mx-8 mt-2 sm:mt-3 md:mt-4",
    },
  ];

  const seamlessLogos = [...logos, ...logos];

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 space-y-3 sm:space-y-4 md:space-y-6 w-full md:w-1/2 md:ml-8 lg:ml-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl w-full sm:w-[90%] md:w-[80%] leading-tight tracking-wide font-bold text-gray-900">
            Find a Job With Your Interests and Abilities
          </h1>
          <p className="text-sm sm:text-base md:text-lg w-full sm:w-[90%] md:w-[80%] tracking-wide text-gray-600">
            Explore jobs that match your skills and passions. Connect with
            employers and start building your dream career.
          </p>
          <Link to={"/login"}>
            <button className="bg-[#212E7C] px-4 sm:px-6 py-2 sm:py-3 cursor-pointer rounded-full mt-2 sm:mt-4 text-white text-sm sm:text-base font-medium hover:bg-[#1a2563] transition-colors">
              Get Started
            </button>
          </Link>
        </div>
        <img
          src={hero}
          alt="Hero image"
          className="h-64 sm:h-80 md:h-96 lg:h-[600px] w-full md:w-auto mt-8 md:mt-0 md:mr-8 lg:mr-20 object-contain"
          loading="lazy"
        />
      </div>
      <div className="border border-gray-50 h-16 sm:h-20 overflow-hidden">
        <div className="flex animate-slide">
          {seamlessLogos.map((logo, index) => (
            <img
              key={`${logo.alt}-${index}`}
              src={logo.src}
              alt={logo.alt}
              className={logo.className}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero;

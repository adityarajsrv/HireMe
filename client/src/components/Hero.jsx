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

const Hero = () => {
  const logos = [
    { src: amazon, alt: "Amazon", className: "h-12 w-36 mx-8 mt-6" },
    { src: microsoft, alt: "Microsoft", className: "h-12 w-40 mx-8 mt-5" },
    { src: jpmorgan, alt: "JPMorgan", className: "h-12 w-40 mx-8 mt-5" },
    { src: google, alt: "Google", className: "h-12 w-36 mx-8 mt-4" },
    { src: meta, alt: "Meta", className: "h-20 w-40 mx-8" },
    { src: spotify, alt: "Spotify", className: "h-12 w-36 mx-8 mt-4" },
    { src: salesforce, alt: "Salesforce", className: "h-16 w-24 mx-8 mt-3" },
    { src: netflix, alt: "Netflix", className: "h-12 w-40 mx-8 mt-4" },
    { src: samsung, alt: "Samsung", className: "h-12 w-36 mx-8 mt-4" },
  ];

  const seamlessLogos = [...logos, ...logos];

  return (
    <>
      <div className="flex flex-row justify-between px-8">
        <div className="ml-20 mt-20 space-y-3">
          <h1 className="text-6xl w-[80%] leading-tight tracking-wide">
            Find a Job With Your Interests and Abilities
          </h1>
          <p className="text-lg w-[80%] tracking-wide">
            Explore jobs that match your skills and passions. Connect with
            employers and start building your dream career.
          </p>
          <button className="bg-[#212E7C] px-4 py-3 cursor-pointer rounded-4xl mt-2 text-white">
            Get Started
          </button>
        </div>
        <img src={hero} alt="Hero image" className="h-[600px] mr-20" />
      </div>
      <div className="border border-gray-50 h-20 overflow-hidden">
        <div className="flex animate-slide">
          {seamlessLogos.map((logo, index) => (
            <img
              key={`${logo.alt}-${index}`}
              src={logo.src}
              alt={logo.alt}
              className={logo.className}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero;
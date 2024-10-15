import React from "react";
import footer from "../../assets/Restaurant/footer.png";

const Footer : React.FC= () => {
  return (
    <footer className="bg-zinc-800 pt-4 p-8 text-white font-sans">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-zinc-700 bg-opacity-55 p-5 rounded-sm">
            <h3 className="text-lg mb-2 font-bold">
              <span className="text-xl">Discover Deliveroo </span>
            </h3>
            <a href="#" className="hover:text-[#81D8D0] pb-1 block">
              Investors
            </a>
            <a href="#" className="hover:text-[#81D8D0] pb-1 block">
              About us
            </a>
            <a href="#" className="hover:text-[#81D8D0] pb-1 block">
              Takeaway
            </a>
            <a href="#" className="hover:text-[#81D8D0] pb-1 block">
              More
            </a>
            <a href="#" className="hover:text-[#81D8D0] pb-1 block">
              Newsroom
            </a>
            <a href="#" className="hover:text-[#81D8D0] pb-1 block">
              Engineering blog
            </a>
            <a href="#" className="hover:text-[#81D8D0] pb-1 block">
              Design blog
            </a>
            <a href="#" className="hover:text-[#81D8D0] pb-1 block">
              Gift Cards
            </a>
            <a href="#" className="hover:text-[#81D8D0] pb-1 block">
              Deliveroo Students
            </a>
            <a href="#" className="hover:text-[#81D8D0] pb-1 block">
              Careers
            </a>
            <a href="#" className="hover:text-[#81D8D0] pb-1 block">
              Restaurant signup
            </a>
            <a href="#" className="hover:text-[#81D8D0] pb-1 block">
              Become a rider
            </a>
          </div>

          <div className="bg-zinc-700 bg-opacity-55 p-4 rounded-sm">
            <div className="pb-4 font-bold">
              <span className="text-xl">Legal </span>
            </div>
            <div className="mt-4 space-y-2 pb-1">
              <a href="#" className="block hover:text-[#81D8D0]">
                Terms and conditions
              </a>
              <a href="#" className="block hover:text-[#81D8D0]">
                Privacy
              </a>
              <a href="#" className="block hover:text-[#81D8D0]">
                Cookies
              </a>
              <a href="#" className="block hover:text-[#81D8D0]">
                Modern Slavery Statement
              </a>
              <a href="#" className="block hover:text-[#81D8D0]">
                Tax Strategy
              </a>
              <a href="#" className="block hover:text-[#81D8D0]">
                Section 172 Statement
              </a>
              <a href="#" className="block hover:text-[#81D8D0]">
                Public Authority Requests
              </a>
            </div>
          </div>

          <div className="bg-zinc-700 bg-opacity-55 p-4 rounded-sm">
            <div className="pb-4 font-bold">
              <span className="text-xl">Help </span>
            </div>
            <div className="mt-4 space-y-2">
              <a href="#" className="block hover:text-[#81D8D0] pb-1">
                Help
              </a>
              <a href="#" className="block hover:text-[#81D8D0] pb-1">
                Contact
              </a>
              <a href="#" className="block hover:text-[#81D8D0] pb-1">
                FAQs
              </a>
              <a href="#" className="block hover:text-[#81D8D0] pb-1">
                Cuisines
              </a>
              <a href="#" className="block hover:text-[#81D8D0] pb-1">
                Brands
              </a>
            </div>
          </div>

          <div className="bg-zinc-700 bg-opacity-55 p-4 rounded-sm">
            <div className="pb-4 font-bold">
              <span className="text-xl">Take Deliveroo with you </span>
            </div>
            <div>
              <img src={footer} alt="" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

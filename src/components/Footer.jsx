import jobVerseLogoWhite from "../assets/jobverse-logo-white.png";
import {
  FaAt,
  FaPhone,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-customBlack text-white/80 text-sm border-t-[1px] border-slate-600">
      <section className="flex justify-between flex-col md:flex-row gap-8">
        <div className="flex flex-col gap-2">
          <img
            src={jobVerseLogoWhite}
            alt="Job Verse Logo"
            className="w-40 mb-4"
          />
          <p>123 Main Street, Cityville, State 12345, Country</p>
          <p>© 2023 JobVerse. All rights reserved.</p>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex gap-3 justify-start md:justify-end text-4xl">
            <FaFacebookF className="border rounded-full p-2 cursor-pointer hover:scale-[1.03] duration-200" />
            <FaTwitter className="border rounded-full p-2 cursor-pointer hover:scale-[1.03] duration-200" />
            <FaLinkedinIn className="border rounded-full p-2 cursor-pointer hover:scale-[1.03] duration-200" />
          </div>
          <div className="text-base flex flex-col items-start md:items-end gap-2">
            <div className="flex gap-2 items-center flex-row-reverse md:flex-row">
              <p>info@jobverse.com</p>
              <FaAt />
            </div>
            <div className="flex gap-2 items-center flex-row-reverse md:flex-row">
              <p>123-456-7890</p>
              <FaPhone />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;

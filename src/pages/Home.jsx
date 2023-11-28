import Hero from "../components/Hero";
import JobsTabs from "../components/JobsTabs";
import Testimonials from "../components/Testimonials";
import happyGoodLookingManinGlassesPointingFingerLeft from "../assets/happy-good-looking-man-in-glasses-pointing-finger-left.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Hero></Hero>
      <div className="bg-[#F5F7FB] dark:bg-slate-900">
        <section className="flex flex-col justify-center items-center text-center gap-6">
          <h3>
            One Platform <br />
            <span>Many Solutions</span>
          </h3>
          <JobsTabs></JobsTabs>
        </section>
      </div>
      <section className="text-center">
        <h3>
          <span>Success Stories</span>
          <br /> from JobVerse Users
        </h3>
        <Testimonials></Testimonials>
      </section>

      <div className="bg-customBlue dark:bg-slate-900 text-white">
        <section className="text-center flex flex-col lg:flex-row justify-center items-center pb-0 gap-10 lg:gap-24">
          <img
            src={happyGoodLookingManinGlassesPointingFingerLeft}
            alt=""
            className="max-w-[300px] lg:max-w-[450px]"
          />
          <div>
            <h4>
              Get Matched to the
              <span className="text-white underline font-bold">
                Most Valuable Jobs
              </span>
              , Just start applying at JobVerse
            </h4>

            <Link to="/all-jobs">
              <button className="mt-12 btn btn-lg !border-white hover:!bg-white hover:!text-customBlack">
                View All Jobs
              </button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;

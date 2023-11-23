const Hero = () => {
  return (
    <section className="text-center">
      <div className="max-w-4xl mx-auto space-y-4">
        <h1>
          Unlock Your <span>Career Potential</span> with JobVerse
        </h1>
        <p className="text-lg w-3/4 mx-auto">
          Explore endless possibilities and discover your dream job. JobVerse
          connects talent with opportunities, making your career journey
          seamless and rewarding. Join us in shaping the future of your career
          today.
        </p>

        <form className="pt-8 max-w-[360px] md:max-w-[450px] mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-customBlue dark:text-blue-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="search"
              className="block w-full py-[14px] px-8 border rounded-full text-sm border-customBlue focus:shadow-md focus:outline-none dark:bg-slate-800 dark:border-slate-500 dark:focus:border-blue-500"
              placeholder="Search jobs"
              required
            />
            <button
              type="submit"
              className="btn btn-sm absolute end-1.5 bottom-1.5 text-sm"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Hero;

import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section className="max-w-4xl min-h-screen text-center flex flex-col justify-center">
      <h1 className="mb-4 text-7xl lg:text-9xl tracking-tight font-extrabold">
        404
      </h1>
      <h1 className="text-3xl md:text-4xl lg:text-5xl mb-5">
        This Page Doesn't Seem To Exist.
      </h1>
      <p>
        Sorry, we can't find that page. You'll find lots to explore on the home
        page.
      </p>
      <Link to="/">
        <button className="btn btn-lg mt-8">Back to Homepage</button>
      </Link>
    </section>
  );
};

export default Error;

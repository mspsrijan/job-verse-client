import { Helmet } from "react-helmet";
const Blogs = () => {
  return (
    <div>
      <Helmet>
        <title>JobVerse | Blogs</title>
      </Helmet>
      <section>
        <h1 className="text-center mb-12">Blog</h1>
        <div className="max-w-screen-lg mx-auto my-4 flex flex-col gap-4 border border-slate-200 dark:border-slate-700 p-4 md:p-8 lg:p-12 rounded-lg">
          <h5>
            What is an access token and refresh token? How do they work and
            where should we store them on the client-side?
          </h5>
          <p>
            <strong>Access Token:</strong> Access token is an authorization
            token usually with a short life-span. The token is used to authorize
            the client to access protected contents.
          </p>
          <p>
            <strong>Refresh Token:</strong> Refresh token is another kind of
            authorization token that has longer life-span. Refresh token is used
            for regenarating access token when its expired. This ensure the
            client do not have to login again once an access token is expired.
          </p>
          <p>
            An access token is usually generated when an user log in to the app.
            It can be stored in multiple space. The most secure option is to
            store the access tokent to HTTP cookie. It can be stored in
            localstorage or session storage based on the project. A refresh
            token, however need to be stored in a more secure place, and it
            usually stored in server side.
          </p>
        </div>
        <div className="max-w-screen-lg mx-auto my-4 flex flex-col gap-4 border border-slate-200 dark:border-slate-700 p-4 md:p-8 lg:p-12 rounded-lg">
          <h5>What is Express JS? What is Nest JS?</h5>
          <p>
            <strong>Express JS: </strong>Express JS is a minimalist frameworks
            for Node JS to build backend/server side of an application. It has
            many utilities like middleware, CORS, dotenv, cookie parser to make
            the devlopment process simpler. Express JS has various tools to
            build robust RESTful APIs.
          </p>
          <p>
            <strong>Nest JS: </strong>Nest JS is another Node JS framework built
            with TypeScript. It promotes modularity to organize code better with
            modueles and components. It also integrates with Express JS.
          </p>
        </div>
        <div className="max-w-screen-lg mx-auto my-4 flex flex-col gap-4 border border-slate-200 dark:border-slate-700 p-4 md:p-8 lg:p-12 rounded-lg">
          <h5>Code explanation for JobVerse poject</h5>
          <p>
            JobVerse is a simple single page job board website built with React
            JS on the frontend and Express JS on the backend.
          </p>

          <ul className="list-disc pl-8">
            <li>The frontend is built with Vite React.</li>
            <li>The CSS styling is done with TailwindCSS.</li>
            <li>The routing is handled with React Router</li>
            <li>User authorization is configured with Firebase</li>
            <li>
              There are many NPM packages are used for different features. The
              most prominets are- Axios, Framer Motion, React Date Picker, React
              Helmet, React Icons, React to PDF, SweetAlert2 etc.
            </li>
          </ul>

          <ul className="list-disc pl-8">
            <li>The backend is developed with Express JS.</li>
            <li>MongoDB database is used for storing the data.</li>
            <li>The other packages used are- CORS, JWT, Dotenv etc.</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Blogs;

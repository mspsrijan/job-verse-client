import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import loginIllustration from "../assets/login-illustration.png";
import Swal from "sweetalert2";

const Login = () => {
  const { user, signIn, signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    setLoginSuccess("");
    setLoginError("");

    signIn(email, password)
      .then(() => {
        return Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Success!",
          showConfirmButton: false,
          timer: 1500,
          iconColor: "#4440DA",
        });
      })
      .then(() => {
        navigate(location?.state && location.state);
      })
      .catch((error) => {
        if (error.code === "auth/invalid-login-credentials") {
          setLoginError(
            "Invalid credentials. Please check your email and password and try again."
          );
        } else {
          setLoginError(error.message);
        }
      });
  };

  return (
    <section className="flex flex-col md:flex-row items-center gap-8 lg:gap-16">
      <div className="md:w-2/3 lg:w-1/2 flex justify-center">
        {user ? (
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 text-center">
            <img
              src={user.photoURL}
              alt=""
              className="w-[80px] h-[80px] object-cover mx-auto rounded-full"
            />
            <h6 className="mt-2">
              <span className="font-normal">Hello,</span> {user.displayName}
            </h6>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <button className="btn btn-outline btn-sm">
                <Link to="/profile">Profile</Link>
              </button>
              <button className="btn btn-outline btn-sm">
                <Link to="/applied-jobs">Applied Jobs</Link>
              </button>
              <button className="btn btn-outline btn-sm">
                <Link to="/post-a-job">Post a Job</Link>
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md p-6 border border-slate-100 rounded-xl shadow-sm dark:bg-slate-800 dark:border-slate-800">
            <div className="text-center">
              <h4 className="">Sign in</h4>
              <p className="mt-2 text-sm text-slate-800 dark:text-slate-400">
                Don't have an account yet? &nbsp;
                <Link
                  to="/registration"
                  className="text-customBlue hover:underline font-medium dark:text-slate-300"
                >
                  Sign up here
                </Link>
              </p>
            </div>

            <div className="mt-8">
              <button
                onClick={signInWithGoogle}
                type="button"
                className="w-full btn btn-outline  btn-sm inline-flex justify-center items-center gap-2"
              >
                <svg
                  className="w-4 h-auto"
                  width="46"
                  height="47"
                  viewBox="0 0 46 47"
                  fill="none"
                >
                  <path
                    d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                    fill="#34A853"
                  />
                  <path
                    d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                    fill="#EB4335"
                  />
                </svg>
                Sign in with Google
              </button>

              <div className="py-4 flex items-center text-xs text-slate-400 uppercase before:flex-[1_1_0%] before:border-t before:border-slate-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-slate-200 after:ms-6 dark:text-slate-500 dark:before:border-slate-600 dark:after:border-slate-600">
                Or
              </div>

              <form onSubmit={handleLogin}>
                <div className="grid gap-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm mb-2">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="block w-full py-3 px-4 border border-slate-300 rounded-full text-sm focus:border-customBlue focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:focus:border-customBlue"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="block w-full py-3 px-4 border border-slate-300 rounded-full text-sm focus:border-customBlue focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:focus:border-customBlue"
                      required
                    />
                  </div>

                  <button type="submit" className="mt-4 w-full btn !py-2.5">
                    Sign in
                  </button>
                </div>

                {loginError && (
                  <div
                    className="mt-4 px-6 py-4 text-sm text-center text-red-900 rounded-full bg-red-50 dark:bg-slate-900 dark:text-red-400"
                    role="alert"
                  >
                    <p>{loginError}</p>
                  </div>
                )}

                {loginSuccess && (
                  <div
                    className="mt-4 px-6 py-4 text-sm text-center text-customBlue rounded-full bg-customBlue/20 dark:bg-slate-900 dark:text-blue-300"
                    role="alert"
                  >
                    <p>{loginSuccess}</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-[600px] md:w-1/3 lg:w-1/2">
        <img src={loginIllustration} alt="" />
      </div>
    </section>
  );
};

export default Login;

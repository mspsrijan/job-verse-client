import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import loginIllustration from "../assets/login-illustration.png";

const Registration = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, createUser, updateUser, signInWithGoogle } =
    useContext(AuthContext);
  const [registrationError, setRegistrationError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState("");

  const handleRegistration = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");
    const photo = form.get("photo");

    if (password.length < 6) {
      setRegistrationError("Password should be at least 6 characters ");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegistrationError(
        "Your password should contain atleast one capital letter."
      );
      return;
    } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
      setRegistrationError(
        "Your password should contain atleast one special character."
      );
      return;
    }

    setRegistrationSuccess("");
    setRegistrationError("");

    createUser(email, password)
      .then(() => {
        updateUser(name, photo);
      })

      .then((result) => {
        if (result.isConfirmed) {
          navigate(location?.state ? location.state : "/");
        }
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setRegistrationError(
            "Email is already in use. Please use a different email."
          );
        } else {
          setRegistrationError(error.message);
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
              <h4 className="">Register</h4>
              <p className="mt-2 text-sm text-slate-800 dark:text-slate-400">
                Already have an account? &nbsp;
                <Link
                  to="/login"
                  className="text-customBlue hover:underline font-medium dark:text-slate-300"
                >
                  Login here
                </Link>
              </p>
            </div>

            <div className="mt-8">
              <form onSubmit={handleRegistration}>
                <div className="grid gap-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="block w-full py-3 px-4 border border-slate-300 rounded-full text-sm focus:border-customBlue focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:focus:border-customBlue"
                      required
                    />
                  </div>

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

                  <div>
                    <label htmlFor="photo" className="block text-sm mb-2">
                      Your photo URL
                    </label>
                    <input
                      type="text"
                      name="photo"
                      id="photo"
                      className="block w-full py-3 px-4 border border-slate-300 rounded-full text-sm focus:border-customBlue focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:focus:border-customBlue"
                      required
                    />
                  </div>

                  <button type="submit" className="mt-4 w-full btn !py-2.5">
                    Sign Up
                  </button>
                </div>

                {registrationError && (
                  <div
                    className="mt-4 px-6 py-4 text-sm text-center text-red-900 rounded-full bg-red-50 dark:bg-slate-900 dark:text-red-400"
                    role="alert"
                  >
                    <p>{registrationError}</p>
                  </div>
                )}

                {registrationSuccess && (
                  <div
                    className="mt-4 px-6 py-4 text-sm text-center text-customBlue rounded-full bg-customBlue/20 dark:bg-slate-900 dark:text-blue-300"
                    role="alert"
                  >
                    <p>{registrationSuccess}</p>
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

export default Registration;

import { use } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { sendEmailVerification, updateProfile } from "firebase/auth";

const Register = () => {
  const { createUser, signInWithGoogle } = use(AuthContext);
  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const displayName = e.target.name.value;
    const photoURL = e.target.imageUrl.value;
    const userProfile = { displayName, photoURL };
    createUser(email, password)
      .then((result) => {
        updateProfile(result.user, userProfile)
          .then(() => {
            sendEmailVerification(result.user).then(() => {
              toast(
                "You have successfully registered & Check Your Email to Verification"
              );
            });
          })
          .catch((error) => {
            toast(error.message);
          });
      })
      .catch((error) => {
        toast(error.message);
      });
  };
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };
        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => console.log("data after save", data));
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div className="bg-gray-100 flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl">
        {/* Header */}
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Get started with your free account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="mt-8 space-y-6">
          <div className="space-y-4 rounded-md">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="relative block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm transition duration-200"
                placeholder="John Doe"
              />
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                // autoComplete="email"
                // required
                className="relative block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm transition duration-200"
                placeholder="example@mail.com"
              />
            </div>

            {/* Image URL Input */}
            <div>
              <label
                htmlFor="image-url"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Profile Image URL
              </label>
              <input
                id="image-url"
                name="imageUrl"
                // type="url"
                // required
                className="relative block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm transition duration-200"
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                // required
                className="relative block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm transition duration-200"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-center text-sm">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              //   required
              //   className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="terms" className="ml-2 block text-gray-950">
              I agree to the{" "}
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Terms & Conditions
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 shadow-md hover:shadow-lg"
            >
              Register
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google Sign-In Button */}
        <div>
          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
          >
            {/* Google SVG Icon */}
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                fill="#EA4335"
              />
            </svg>
            <span>Sign up with Google</span>
          </button>
        </div>

        {/* Footer link */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            className="font-medium text-indigo-600 hover:text-indigo-500"
            to="/login"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

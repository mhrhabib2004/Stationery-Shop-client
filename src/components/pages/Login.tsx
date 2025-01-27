import { FormProvider, useForm } from "react-hook-form";
import Sinput from "../From/Sinput";

export default function Login() {
  const methods = useForm(); // React Hook Form এর কনফিগারেশন
  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="relative">
        {/* Gradient border effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg blur-xl opacity-75 animate-pulse"></div>

        <div
          id="form-container"
          className="relative z-10 bg-white p-10 rounded-2xl shadow-2xl w-96"
        >
          <h2
            id="form-title"
            className="text-center text-4xl font-extrabold mb-8 text-gray-800"
          >
            Welcome Back!
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Please login to your account.
          </p>

          <FormProvider {...methods}>
            <form
              className="space-y-6"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <Sinput type="text" name="username" label="Username" />
              <Sinput type="password" name="password" label="Password" />
              <button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg transition duration-300"
              >
                Login
              </button>
            </form>
          </FormProvider>

          <div className="mt-4 text-center text-sm text-gray-600">
            <span>Don't have an account?</span>{" "}
            <a
              href="#"
              className="text-blue-500 font-semibold hover:underline"
            >
              Sign up here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

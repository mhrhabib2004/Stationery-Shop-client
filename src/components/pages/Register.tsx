import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Sinput from "../From/Sinput";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAddUserMutation } from "../../redux/features/user/userMenagement";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

export default function Register() {
  const methods = useForm<Inputs>();
  const [addUser, { isLoading }] = useAddUserMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const toastId = toast.loading("Creating account...");

    const userData = {
      name: data.name,
      email: data.email,
      password: data.password

    };

    console.log(userData)

    try {
      const res = await addUser(userData).unwrap(); // Use unwrap() to handle the response

      if (res.success) {
        toast.success("Account created successfully!", { id: toastId });

        // Navigate to the login page
        setTimeout(() => {
          navigate("/login");
        }, 700);
      } else {
        toast.error(res.message || "Failed to create account", { id: toastId });
      }
    } catch (err ) {
      console.error("Registration error:", err);
       toast.error(err.message || "Something went wrong. Please try again.", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 sm:p-6 md:p-8">
      <div className="relative w-full max-w-md">
        {/* Gradient border effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg blur-xl opacity-75 animate-pulse"></div>

        <div
          id="form-container"
          className="relative z-10 bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl"
        >
          <h2
            id="form-title"
            className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 text-gray-800"
          >
            Create Your Account
          </h2>
          <p className="text-center text-gray-600 mb-4 sm:mb-6">
            Register now to start using our platform.
          </p>

          <FormProvider {...methods}>
            <form
              className="space-y-4 sm:space-y-6"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <Sinput type="text" name="name" label="Full Name"  />
              <Sinput type="email" name="email" label="Email Address"  />
              <Sinput type="password" name="password" label="Password"  />
            
              <button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg transition duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </form>
          </FormProvider>

          <div className="mt-4 text-center text-sm text-gray-600">
            <span>Already have an account?</span>{" "}
            <a
              href="login"
              className="text-blue-500 font-semibold hover:underline"
            >
              Log in here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
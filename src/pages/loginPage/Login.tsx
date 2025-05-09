import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "@/redux/api/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/authSlice";
import { toast } from "sonner";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginUser] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      const { user, token } = response.data;
      console.log("user:", user, "token:", token);
      dispatch(setUser({ user, token }));

      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Login failed! Check your credentials.");
    }
  };

  const autofillUser = () => {
    setFormData({
      email: "mdshahidsumon177@gmail.com",
      password: "12345",
    });
  };

  const autofillAdmin = () => {
    setFormData({
      email: "mdshahidsumon178@gmail.com",
      password: "12345",
    });
  };

  return (
    <div className="min-h-screen lg:h-screen flex flex-col lg:flex-row">
      {/* Left Side */}
      <div className="w-full p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 flex flex-col bg-white dark:bg-[#101010] overflow-y-auto scrollbar-hide transition-colors duration-300">
        <div className="max-w-md mx-auto w-full">
          {/* Header */}
          <div className="flex items-center mb-8 md:mb-10">
            <Link
              to="/"
              className="text-[#101010] dark:text-white hover:opacity-80 transition-opacity p-2 -ml-2"
            >
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold ml-2 text-[#101010] dark:text-white transition-colors">
              LOG-IN
            </h1>
          </div>

          {/* Welcome Text */}
          <div className="mb-8 md:mb-10">
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base transition-colors">
              Welcome Back!
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base transition-colors">
              Log in to access your dashboard.
            </p>
            {/* Credential Buttons */}
            <div className="flex gap-4  mt-4">
              <button
                onClick={autofillUser}
                type="button"
                className="px-4 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 text-sm transition-all"
              >
                Use User Credential
              </button>
              <button
                onClick={autofillAdmin}
                type="button"
                className="px-4 py-1 bg-purple-500 text-white rounded-full hover:bg-purple-600 text-sm transition-all"
              >
                Use Admin Credential
              </button>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your Email"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full text-[#101010] dark:text-white bg-white dark:bg-[#101010] focus:outline-none focus:ring-2 focus:ring-[#0AE08F] focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Type your Password"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full text-[#101010] dark:text-white bg-white dark:bg-[#101010] focus:outline-none focus:ring-2 focus:ring-[#0AE08F] focus:border-transparent transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0AE08F] text-white py-4 rounded-full hover:opacity-90 transition-all duration-200 text-base font-medium"
            >
              Login
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-[#0AE08F] hover:underline transition-colors"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

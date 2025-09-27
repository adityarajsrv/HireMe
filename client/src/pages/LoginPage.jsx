/* eslint-disable no-unused-vars */
import { useState } from "react";
import { LockClosedIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import loginUI from "../assets/login.png";
import { useNavigate, useLocation } from "react-router-dom";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "Job Seeker",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/profile";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const endpoint = isLogin
      ? `${baseUrl}/api/auth/login`
      : `${baseUrl}/api/auth/register`;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const text = await res.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch (err) {
        throw new Error("Invalid server response: Not valid JSON");
      }

      if (!res.ok) {
        throw new Error(data.msg || `HTTP error! Status: ${res.status}`);
      }

      if (isLogin) {
        if (!data.token || !data.user) {
          throw new Error("Invalid response: Missing token or user data");
        }
        const normalizedUser = {
          ...data.user,
          firstName: data.user.firstName || "",
          lastName: data.user.lastName || "",
          email: data.user.email || "",
          role: data.user.role || "Job Seeker",
          phone: data.user.phone || "",
          country: data.user.country || "",
          city: data.user.city || "",
          profileImage: data.user.profileImage || null,
          createdAt: data.user.createdAt || new Date().toISOString(),
        };
        localStorage.setItem("token", data.token);
        localStorage.setItem("userData", JSON.stringify(normalizedUser));
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => navigate(from, { replace: true }), 1200);
      } else {
        // After registration, automatically log in
        setSuccess("Registration successful! Logging in...");
        const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            role: formData.role,
          }),
        });

        const loginText = await loginRes.text();
        let loginData;
        try {
          loginData = loginText ? JSON.parse(loginText) : {};
        } catch (err) {
          throw new Error("Invalid login response: Not valid JSON");
        }

        if (!loginRes.ok) {
          throw new Error(loginData.msg || `Login failed! Status: ${loginRes.status}`);
        }

        if (!loginData.token || !loginData.user) {
          throw new Error("Invalid login response: Missing token or user data");
        }

        const normalizedUser = {
          ...loginData.user,
          firstName: loginData.user.firstName || formData.firstName || "",
          lastName: loginData.user.lastName || formData.lastName || "",
          email: loginData.user.email || formData.email || "",
          role: loginData.user.role || formData.role || "Job Seeker",
          phone: loginData.user.phone || "",
          country: loginData.user.country || "",
          city: loginData.user.city || "",
          profileImage: loginData.user.profileImage || null,
          createdAt: loginData.user.createdAt || new Date().toISOString(),
        };
        localStorage.setItem("token", loginData.token);
        localStorage.setItem("userData", JSON.stringify(normalizedUser));
        setSuccess("Registration and login successful! Redirecting...");
        setTimeout(() => navigate("/profile", { replace: true }), 1200);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          role: "Job Seeker",
        });
      }
    } catch (err) {
      console.error("Login/Register error:", err);
      setError(err.message || "Failed to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = ["Job Seeker", "Recruiter"];

  return (
    <div className="min-h-screen p-6 sm:p-12 overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-600/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/5 rounded-full blur-xl"></div>
      </div>
      <div className="relative z-10 w-full max-w-6xl mx-auto h-[85vh]">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl overflow-hidden h-full">
          <div className="flex flex-col lg:flex-row h-full">
            <div className="lg:w-3/5 h-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-indigo-900/20"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 to-transparent"></div>
              <img className="w-full h-full object-cover" src={loginUI} alt="Login UI" />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
            <div className="lg:w-2/5 h-full flex items-center justify-center p-8 sm:p-12">
              <div className="w-full max-w-sm mx-auto">
                <div className="text-center lg:text-left mb-6">
                  <h1 className="text-4xl font-bold text-white">
                    Hire<span className="text-blue-400">Me</span>
                  </h1>
                </div>
                <div className="text-center lg:text-left mb-8">
                  <h2 className="text-2xl font-bold text-white mt-2">
                    {isLogin ? "Welcome Back" : "Create Account"}
                  </h2>
                  <p className="mt-3 text-gray-300 text-sm">
                    {isLogin ? "Sign in to unlock your potential" : "Start your journey with us"}
                    <span
                      onClick={() => {
                        setIsLogin(!isLogin);
                        setError("");
                        setSuccess("");
                      }}
                      className="ml-1 text-blue-400 hover:text-blue-300 cursor-pointer font-medium transition-colors"
                    >
                      {isLogin ? "Need an account?" : "Already registered?"}
                    </span>
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {!isLogin && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-200 mb-2">
                            First Name
                          </label>
                          <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Enter your first name"
                            className="w-full rounded-xl border border-white/10 bg-white/5 focus:bg-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-gray-400 p-3.5 transition-all duration-200 backdrop-blur-sm"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-200 mb-2">
                            Last Name
                          </label>
                          <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Enter your last name"
                            className="w-full rounded-xl border border-white/10 bg-white/5 focus:bg-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-gray-400 p-3.5 transition-all duration-200 backdrop-blur-sm"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-200 mb-2">
                          I am a
                        </label>
                        <select
                          id="role"
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-white/10 bg-white/5 focus:bg-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 text-white p-3.5 transition-all duration-200 backdrop-blur-sm appearance-none"
                          required
                        >
                          {roleOptions.map((role) => (
                            <option key={role} value={role} className="bg-gray-900 text-white">
                              {role}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </>
                  )}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-white/10 bg-white/5 focus:bg-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-gray-400 p-3.5 transition-all duration-200 backdrop-blur-sm"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-white/10 bg-white/5 focus:bg-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-gray-400 p-3.5 pr-12 transition-all duration-200 backdrop-blur-sm"
                        placeholder="••••••••"
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-200 transition-colors"
                      >
                        {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                      </button>
                    </div>
                    {!isLogin && (
                      <p className="mt-1 text-xs text-gray-400">
                        Password must be at least 6 characters long
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer w-full flex items-center justify-center py-3.5 px-6 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/20"
                  >
                    <LockClosedIcon className="h-5 w-5 mr-2" />
                    {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
                  </button>
                  {error && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                      {success}
                    </div>
                  )}
                </form>
                <div className="mt-8 text-center text-xs text-gray-400">
                  <p>
                    By signing up, you agree to our{" "}
                    <a className="text-blue-400 hover:text-blue-300 underline transition-colors cursor-pointer">
                      Terms
                    </a>{" "}
                    and{" "}
                    <a className="text-blue-400 hover:text-blue-300 underline transition-colors cursor-pointer">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
import { useState } from "react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "abhi@gamil.com",
    password: "abhi",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log(error);
  }, [error]);
  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // required for cookies
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "Login failed");
        setLoading(false);
        return;
      }
      // console.log("Login success:", data.msg , data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("Login successful!");
      navigate("/questions");

    } catch (err) {
      console.log(err)
      setError(err.response?.data?.msg || "Login failed");
    }

    setLoading(false);
  };

  // Register
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // important for cookies
        body: JSON.stringify({
          name: form.name,
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.msg || "registration failed");
        setLoading(false);
        return;
      }
      console.log("Register success:", data);
      alert("Account created!");
      setIsLogin(true);
      
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    }

    setLoading(false);
  };

  return (
    <div className="w-full h-screen bg-[#262626] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#1e1e1e] p-8 rounded-2xl shadow-xl border border-gray-700"
      >
        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          {isLogin ? "Login" : "Register"}
        </h2>

        {/* ERROR */}
        {error && (
          <p className="text-red-400 text-center mb-2 text-sm">{error}</p>
        )}

        {/* FORM */}
        <form
          onSubmit={isLogin ? handleLogin : handleRegister}
          className="flex flex-col gap-4"
        >
          {!isLogin && (
            <>
              <input
                name="name"
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#262626] text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500"
              />

              <input
                name="username"
                type="text"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#262626] text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500"
              />
            </>
          )}

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
      
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[#262626] text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[#262626] text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        {/* SWITCH */}
        <p className="text-gray-400 text-sm text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-400 ml-1 hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthPage;

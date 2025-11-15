import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    navigate("/auth");
  };

  return (
    <nav className="h-16 bg-[#1e1e1e] border-b border-gray-700 fixed top-0 w-full z-50">
      <div className="max-w-full mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-orange-500 underline">
          Code2Place
        </Link>

        {/* Nav Links */}
        <div className="flex space-x-8 text-gray-300 font-medium">
          <Link to="/questions" className="hover:text-white transition">
            Questions
          </Link>

          <Link to="/ai-interview" className="hover:text-white transition">
            AI Interview
          </Link>

          <Link to="/resources" className="hover:text-white transition">
            Resources
          </Link>
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          {user ? (
            <>
              <button
                onClick={() => setOpen(!open)}
                className="ml-6 flex items-center gap-2 text-gray-300 hover:text-white"
              >
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-700">
                  {user.name ? user.name[0].toUpperCase() : "U"}
                </div>
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-48 bg-[#2a2a2a] shadow-lg border border-gray-700 rounded-lg py-2 animate-fadeIn text-gray-200">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-[#3b3b3b] rounded"
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-[#3b3b3b] rounded"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link
              to="/auth"
              className="ml-6 bg-orange-600 px-4 py-2 rounded text-white hover:bg-orange-700 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

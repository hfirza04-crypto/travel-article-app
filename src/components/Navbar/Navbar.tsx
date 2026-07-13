import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/authStore";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useAuthStore();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Apakah Anda yakin ingin logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Logout",
      cancelButtonText: "Batal",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) return;

    logout();

    setMenuOpen(false);

    toast.success("Logout berhasil!");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const activeClass =
    "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1";

  const normalClass =
    "text-gray-700 hover:text-blue-600 transition duration-300";

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur shadow-sm border-b">

      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/home"
          className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-blue-600 hover:scale-105 transition"
        >
          🌍
          <span>Travel Articles</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">

          <Link
            to="/home"
            className={
              location.pathname === "/home"
                ? activeClass
                : normalClass
            }
          >
            Home
          </Link>

          <Link
            to="/create"
            className={
              location.pathname === "/create"
                ? activeClass
                : normalClass
            }
          >
            Tambah Artikel
          </Link>

          <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-full">

            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex justify-center items-center font-bold">

              {user?.username
                ?.charAt(0)
                .toUpperCase()}

            </div>

            <div>

              <p className="text-xs text-gray-500">
                Login sebagai
              </p>

              <p className="font-semibold">
                {user?.username}
              </p>

            </div>

          </div>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 transition text-white px-5 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>

        {/* Mobile Button */}

        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>

      {/* Mobile Menu */}

      {menuOpen && (

        <div className="md:hidden border-t bg-white shadow-lg">

          <div className="flex flex-col gap-5 p-5">

            <Link
              to="/home"
              onClick={() => setMenuOpen(false)}
              className={
                location.pathname === "/home"
                  ? activeClass
                  : normalClass
              }
            >
              🏠 Home
            </Link>

            <Link
              to="/create"
              onClick={() => setMenuOpen(false)}
              className={
                location.pathname === "/create"
                  ? activeClass
                  : normalClass
              }
            >
              ➕ Tambah Artikel
            </Link>

            <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-3">

              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex justify-center items-center font-bold">

                {user?.username
                  ?.charAt(0)
                  .toUpperCase()}

              </div>

              <div>

                <p className="text-xs text-gray-500">
                  Login sebagai
                </p>

                <p className="font-semibold">
                  {user?.username}
                </p>

              </div>

            </div>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition"
            >
              Logout
            </button>

          </div>

        </div>

      )}

    </nav>
  );
}

export default Navbar;
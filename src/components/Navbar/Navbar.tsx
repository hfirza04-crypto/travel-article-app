import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/authStore";

function Navbar() {
  const navigate = useNavigate();

  const { user, logout } = useAuthStore();

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

    toast.success("Logout berhasil!");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

        <Link
          to="/home"
          className="text-3xl font-bold text-blue-600"
        >
          🌍 Travel Articles
        </Link>

        <div className="flex items-center gap-6">

          <Link
            to="/home"
            className="font-medium hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/create"
            className="font-medium hover:text-blue-600"
          >
            Tambah Artikel
          </Link>

          <div className="bg-gray-100 px-4 py-2 rounded-lg">
            👤 <b>{user?.username}</b>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;
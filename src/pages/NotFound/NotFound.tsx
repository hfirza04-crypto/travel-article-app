import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">

      <h1 className="text-8xl font-bold text-blue-600">
        404
      </h1>

      <h2 className="text-3xl font-semibold mt-4">
        Halaman Tidak Ditemukan
      </h2>

      <p className="text-gray-600 mt-3">
        Halaman yang Anda cari tidak tersedia.
      </p>

      <Link
        to="/home"
        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
      >
        Kembali ke Home
      </Link>

    </div>
  );
}

export default NotFound;
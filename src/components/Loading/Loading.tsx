import { FaSpinner } from "react-icons/fa";

function Loading() {
  return (
    <div className="fixed inset-0 bg-white/80 flex flex-col justify-center items-center z-50">

      <FaSpinner className="text-blue-600 text-6xl animate-spin" />

      <h2 className="mt-6 text-2xl font-bold text-gray-700">
        Memuat Data...
      </h2>

      <p className="mt-2 text-gray-500">
        Mohon tunggu sebentar
      </p>

    </div>
  );
}

export default Loading;
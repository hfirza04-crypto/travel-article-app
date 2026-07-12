import { FaSpinner } from "react-icons/fa";

function Loading() {
  return (
    <div className="flex flex-col justify-center items-center py-24">

      <FaSpinner className="text-blue-600 text-6xl animate-spin" />

      <p className="mt-6 text-xl font-semibold text-gray-600">
        Memuat data...
      </p>

    </div>
  );
}

export default Loading;
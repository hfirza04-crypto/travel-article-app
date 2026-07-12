import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { createArticle } from "../../api/article";

function CreateArticle() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (title.trim() === "" || description.trim() === "") {
      toast.error("Judul dan deskripsi wajib diisi!");
      return;
    }

    try {
      setLoading(true);

      const response = await createArticle(title, description);

      console.log("CREATE RESPONSE");
      console.log(response);

      toast.success("Artikel berhasil ditambahkan!");

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      console.log(error);

      toast.error("Gagal menambahkan artikel!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      <Navbar />

      <div className="flex-1 py-10">

        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">

          <h1 className="text-4xl font-bold text-center mb-2">
            Tambah Artikel
          </h1>

          <p className="text-center text-gray-500 mb-8">
            Buat artikel travel baru untuk dibagikan kepada pengguna.
          </p>

          <div className="mb-6">

            <label className="block mb-2 font-semibold">
              Judul Artikel
            </label>

            <input
              type="text"
              placeholder="Masukkan judul artikel"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <div className="mb-8">

            <label className="block mb-2 font-semibold">
              Deskripsi Artikel
            </label>

            <textarea
              rows={10}
              placeholder="Masukkan isi artikel..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <div className="flex gap-4">

            <button
              onClick={() => navigate("/home")}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition"
            >
              Batal
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`flex-1 py-3 rounded-lg text-white font-semibold transition ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Menyimpan..." : "Tambah Artikel"}
            </button>

          </div>

        </div>

      </div>

      <Footer />

    </div>
  );
}

export default CreateArticle;
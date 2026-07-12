import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";

import {
  getArticleById,
  updateArticle,
} from "../../api/article";

function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchArticle();
  }, []);

  const fetchArticle = async () => {
    try {
      setLoading(true);

      const data = await getArticleById(id!);

      setTitle(data.data.title);
      setDescription(data.data.description);
    } catch (error) {
      console.log(error);

      toast.error("Gagal mengambil data artikel!");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (title.trim() === "" || description.trim() === "") {
      toast.error("Judul dan deskripsi wajib diisi!");
      return;
    }

    try {
      setSaving(true);

      await updateArticle(id!, title, description);

      toast.success("Artikel berhasil diperbarui!");

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      console.log(error);

      toast.error("Gagal memperbarui artikel!");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      <Navbar />

      <div className="flex-1 py-10">

        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">

          <h1 className="text-4xl font-bold text-center mb-2">
            Edit Artikel
          </h1>

          <p className="text-center text-gray-500 mb-8">
            Perbarui informasi artikel yang sudah ada.
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
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>

          <div className="mb-8">

            <label className="block mb-2 font-semibold">
              Deskripsi Artikel
            </label>

            <textarea
              rows={10}
              placeholder="Masukkan deskripsi artikel"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
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
              onClick={handleUpdate}
              disabled={saving}
              className={`flex-1 py-3 rounded-lg text-white font-semibold transition ${
                saving
                  ? "bg-green-300 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {saving ? "Menyimpan..." : "Update Artikel"}
            </button>

          </div>

        </div>

      </div>

      <Footer />

    </div>
  );
}

export default EditArticle;
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getArticleById, updateArticle } from "../../api/article";

function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchArticle();
  }, []);

  const fetchArticle = async () => {
    try {
      const data = await getArticleById(id!);

      console.log("DETAIL ARTICLE");
      console.log(data);

      setTitle(data.data.title);
      setDescription(data.data.description);
    } catch (error) {
      console.log(error);

      toast.error("Gagal mengambil data artikel!");
    }
  };

  const handleUpdate = async () => {
    if (title.trim() === "" || description.trim() === "") {
      toast.error("Judul dan deskripsi wajib diisi!");
      return;
    }

    try {
      await updateArticle(id!, title, description);

      toast.success("Artikel berhasil diupdate!");

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      console.log(error);

      toast.error("Gagal update artikel!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-4xl font-bold text-center mb-8">
          Edit Artikel
        </h1>

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
            Deskripsi
          </label>

          <textarea
            rows={8}
            placeholder="Masukkan deskripsi artikel"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
          />

        </div>

        <button
          onClick={handleUpdate}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-semibold transition"
        >
          Update Artikel
        </button>

      </div>

    </div>
  );
}

export default EditArticle;
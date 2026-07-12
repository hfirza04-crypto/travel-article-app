import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createArticle } from "../../api/article";

function CreateArticle() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (title.trim() === "" || description.trim() === "") {
      toast.error("Judul dan deskripsi wajib diisi!");
      return;
    }

    try {
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
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-4xl font-bold mb-8 text-center">
          Tambah Artikel
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
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full border rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition"
        >
          Tambah Artikel
        </button>

      </div>

    </div>
  );
}

export default CreateArticle;
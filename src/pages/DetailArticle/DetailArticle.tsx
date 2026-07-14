import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";

import { getArticleById } from "../../api/article";

function DetailArticle() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (id) {
      fetchArticle();
    }
  }, [id]);

  const fetchArticle = async () => {
    try {
      setLoading(true);

      const response = await getArticleById(id!);

      if (!response.data) {
        setNotFound(true);
        return;
      }

      setArticle(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Artikel tidak ditemukan!");
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (notFound || !article) {
    return (
      <>
        <Navbar />

        <div className="min-h-[70vh] flex flex-col justify-center items-center text-center px-5">
          <h1 className="text-5xl font-bold text-red-600 mb-4">
            404
          </h1>

          <h2 className="text-3xl font-bold mb-3">
            Artikel Tidak Ditemukan
          </h2>

          <p className="text-gray-500 mb-8">
            Artikel yang Anda cari mungkin sudah dihapus
            atau URL tidak valid.
          </p>

          <button
            onClick={() => navigate("/home")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Kembali ke Home
          </button>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-5xl mx-auto py-10 px-5">

        <div className="flex justify-between items-center mb-6">

          <button
            onClick={() => navigate("/home")}
            className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg"
          >
            ← Kembali
          </button>

          <Link
            to={`/edit/${article.documentId}`}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg"
          >
            ✏ Edit Artikel
          </Link>

        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

          <img
            src={
              article.cover_image_url ||
              "https://picsum.photos/1200/500"
            }
            alt={article.title}
            className="w-full h-[450px] object-cover"
          />

          <div className="p-8">

            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              {article.category?.name || "Travel"}
            </span>

            <h1 className="text-4xl font-bold mb-5">
              {article.title}
            </h1>

            <div className="flex flex-wrap gap-6 text-gray-500 mb-8">

              <p>
                👤 <b>{article.user?.username || "Unknown"}</b>
              </p>

              <p>
                📅{" "}
                {new Date(article.createdAt).toLocaleDateString(
                  "id-ID",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )}
              </p>

            </div>

            <hr className="mb-8" />

            <div className="text-gray-700 leading-9 text-lg whitespace-pre-line">
              {article.description}
            </div>

          </div>

        </div>

      </div>

      <Footer />

    </div>
  );
}

export default DetailArticle;
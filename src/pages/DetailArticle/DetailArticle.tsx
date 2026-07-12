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

  useEffect(() => {
    fetchArticle();
  }, []);

  const fetchArticle = async () => {
    try {
      setLoading(true);

      const response = await getArticleById(id!);

      setArticle(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Gagal mengambil detail artikel!");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-5xl mx-auto py-10 px-5">

        <div className="flex justify-between items-center mb-6">

          <button
            onClick={() => navigate("/home")}
            className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg transition"
          >
            ← Kembali
          </button>

          <Link
            to={`/edit/${article.documentId}`}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg transition"
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
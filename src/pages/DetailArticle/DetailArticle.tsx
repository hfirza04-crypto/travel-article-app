import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
      alert("Gagal mengambil detail artikel");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-3xl font-bold mt-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-5xl mx-auto py-10 px-5">

        <button
          onClick={() => navigate("/home")}
          className="bg-gray-700 text-white px-5 py-2 rounded-lg mb-8"
        >
          ← Kembali
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">

          <img
            src={
              article.cover_image_url ||
              "https://picsum.photos/1200/500"
            }
            alt={article.title}
            className="w-full h-96 object-cover"
          />

          <div className="p-8">

            <h1 className="text-4xl font-bold mb-6">
              {article.title}
            </h1>

            <p className="text-gray-700 text-lg leading-9">
              {article.description}
            </p>

            <hr className="my-8" />

            <div className="space-y-3">

              <p>
                <b>Penulis :</b>{" "}
                {article.user?.username || "Unknown"}
              </p>

              <p>
                <b>Kategori :</b>{" "}
                {article.category?.name || "Travel"}
              </p>

              <p>
                <b>Dibuat :</b>{" "}
                {new Date(article.createdAt).toLocaleDateString()}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DetailArticle;
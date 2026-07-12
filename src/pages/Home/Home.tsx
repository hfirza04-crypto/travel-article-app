import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";

import { getArticles, deleteArticle } from "../../api/article";

function Home() {
  const [articles, setArticles] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);

      // Delay hanya untuk demo loading
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const data = await getArticles();

      setArticles(data.data);
    } catch (error) {
      console.log(error);
      toast.error("Gagal mengambil data artikel!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Hapus Artikel?",
      text: "Artikel yang dihapus tidak dapat dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteArticle(id);

      toast.success("Artikel berhasil dihapus!");

      fetchArticles();
    } catch (error) {
      console.log(error);
      toast.error("Gagal menghapus artikel!");
    }
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * articlesPerPage;
  const indexOfFirst = indexOfLast - articlesPerPage;

  const currentArticles = filteredArticles.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(
    filteredArticles.length / articlesPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100">

      {loading && <Loading />}

      <Navbar />

      <div className="max-w-7xl mx-auto p-8">

        <div className="mb-8">

          <h1 className="text-4xl font-bold mb-6">
            🌍 Travel Articles
          </h1>

          <input
            type="text"
            placeholder="Cari artikel..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full border rounded-xl p-4 shadow"
          />

        </div>

        {!loading && (
          <>
            {currentArticles.length === 0 ? (

              <div className="text-center py-20">

                <h2 className="text-3xl font-bold text-gray-500">
                  Artikel tidak ditemukan
                </h2>

                <p className="text-gray-400 mt-3">
                  Coba gunakan kata kunci lain.
                </p>

              </div>

            ) : (

              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                  {currentArticles.map((article) => (

                    <div
                      key={article.documentId}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col"
                    >

                      <img
                        src={
                          article.cover_image_url ||
                          "https://picsum.photos/600/400"
                        }
                        alt={article.title}
                        className="w-full h-52 object-cover"
                      />

                      <div className="p-5 flex flex-col flex-1">

                        <h2 className="text-2xl font-bold mb-3">
                          {article.title}
                        </h2>

                        <p className="text-gray-600 flex-1 line-clamp-4">
                          {article.description}
                        </p>

                        <div className="grid grid-cols-3 gap-2 mt-6">

                          <Link
                            to={`/article/${article.documentId}`}
                            className="bg-blue-600 text-center text-white py-2 rounded-lg hover:bg-blue-700"
                          >
                            Read
                          </Link>

                          <Link
                            to={`/edit/${article.documentId}`}
                            className="bg-yellow-500 text-center text-white py-2 rounded-lg hover:bg-yellow-600"
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() =>
                              handleDelete(article.documentId)
                            }
                            className="bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                          >
                            Delete
                          </button>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

                <div className="flex justify-center items-center gap-5 mt-10">

                  <button
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage(currentPage - 1)
                    }
                    className="bg-gray-300 px-5 py-2 rounded-lg disabled:opacity-50"
                  >
                    Previous
                  </button>

                  <span className="text-xl font-bold">
                    {currentPage} / {totalPages}
                  </span>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage(currentPage + 1)
                    }
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg disabled:opacity-50"
                  >
                    Next
                  </button>

                </div>

              </>
            )}
          </>
        )}

      </div>

      <Footer />

    </div>
  );
}

export default Home;
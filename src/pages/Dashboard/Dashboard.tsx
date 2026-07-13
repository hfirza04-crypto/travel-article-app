import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { getArticles } from "../../api/article";
import { useAuthStore } from "../../store/authStore";

function Dashboard() {
  const navigate = useNavigate();

  const { user } = useAuthStore();

  const [totalArticle, setTotalArticle] = useState(0);

  useEffect(() => {
    fetchTotalArticle();
  }, []);

  const fetchTotalArticle = async () => {
    try {
      const response = await getArticles();

      setTotalArticle(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      <Navbar />

      <div className="flex-1 max-w-6xl mx-auto w-full p-8">

        <h1 className="text-5xl font-bold mb-2">
          👋 Halo, {user?.username}
        </h1>

        <p className="text-gray-500 mb-10">
          Selamat datang kembali di Travel Articles.
        </p>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-xl shadow-lg p-6">

            <p className="text-gray-500">
              Total Artikel
            </p>

            <h2 className="text-5xl font-bold text-blue-600 mt-3">
              {totalArticle}
            </h2>

          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">

            <p className="text-gray-500">
              Username
            </p>

            <h2 className="text-2xl font-bold mt-3">
              {user?.username}
            </h2>

          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">

            <p className="text-gray-500">
              Email
            </p>

            <h2 className="text-xl font-bold mt-3 break-all">
              {user?.email}
            </h2>

          </div>

        </div>

        <div className="bg-white rounded-xl shadow-lg mt-10 p-8">

          <h2 className="text-3xl font-bold mb-6">
            Quick Menu
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <button
              onClick={() => navigate("/home")}
              className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg"
            >
              🏠 Home
            </button>

            <button
              onClick={() => navigate("/create")}
              className="bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg"
            >
              ➕ Tambah Artikel
            </button>

          </div>

        </div>

      </div>

      <Footer />

    </div>
  );
}

export default Dashboard;
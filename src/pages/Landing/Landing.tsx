import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-blue-50">

      <Navbar />

      <section className="flex-1 flex items-center">

        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Kiri */}
          <div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Explore Beautiful Destinations
            </h1>

            <p className="mt-6 text-lg text-gray-600">
              Find your next adventure with thousands of travel
              articles from all over Indonesia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">

              <Link
                to="/home"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-center transition"
              >
                🌍 Explore Now
              </Link>

              <Link
                to="/login"
                className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg text-center transition"
              >
                🔑 Login
              </Link>

            </div>

          </div>

          {/* Kanan */}
          <div className="flex justify-center">

            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"
              alt="Travel"
              className="rounded-2xl shadow-2xl w-full max-w-lg"
            />

          </div>

        </div>

      </section>

      <Footer />

    </div>
  );
}

export default Landing;
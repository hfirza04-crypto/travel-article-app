import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

function Landing() {
  return (
    <>
      <Navbar />

      <section className="bg-blue-50 min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-10 items-center">

          {/* Bagian Kiri */}
          <div>
            <h1 className="text-5xl font-bold leading-tight">
              Explore Beautiful Destinations
            </h1>

            <p className="mt-6 text-lg text-gray-600">
              Find your next adventure with thousands of travel articles from
              all over Indonesia.
            </p>

            <Link
              to="/login"
              className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-300"
            >
              Explore Now
            </Link>
          </div>

          {/* Bagian Kanan */}
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600"
              alt="Travel"
              className="rounded-xl shadow-xl"
            />
          </div>

        </div>
      </section>
    </>
  );
}

export default Landing;
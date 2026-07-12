import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import {
  registerSchema,
  type RegisterSchema,
} from "../../validation/registerSchema";

import { register as registerUser } from "../../api/auth";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (
    data: RegisterSchema
  ) => {
    try {
      setLoading(true);

      await registerUser(
        data.username,
        data.email,
        data.password
      );

      toast.success("Registrasi berhasil!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.log(error);

      toast.error("Registrasi gagal!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      <Navbar />

      <div className="flex-1 flex justify-center items-center py-10 px-4">

        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

          <h1 className="text-4xl font-bold text-center mb-2">
            Buat Akun
          </h1>

          <p className="text-center text-gray-500 mb-8">
            Daftarkan akun baru untuk mulai
            menggunakan aplikasi.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >

            <div className="mb-5">

              <label className="block mb-2 font-semibold">
                Username
              </label>

              <input
                type="text"
                placeholder="Masukkan username"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                {...register("username")}
              />

              <p className="text-red-500 text-sm mt-1">
                {errors.username?.message}
              </p>

            </div>

            <div className="mb-5">

              <label className="block mb-2 font-semibold">
                Email
              </label>

              <input
                type="email"
                placeholder="Masukkan email"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                {...register("email")}
              />

              <p className="text-red-500 text-sm mt-1">
                {errors.email?.message}
              </p>

            </div>

            <div className="mb-6">

              <label className="block mb-2 font-semibold">
                Password
              </label>

              <input
                type={
                  showPassword ? "text" : "password"
                }
                placeholder="Masukkan password"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                {...register("password")}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="text-sm text-green-600 mt-2 hover:underline"
              >
                {showPassword
                  ? "Sembunyikan Password"
                  : "Lihat Password"}
              </button>

              <p className="text-red-500 text-sm mt-1">
                {errors.password?.message}
              </p>

            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-semibold transition ${
                loading
                  ? "bg-green-300 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading
                ? "Mendaftar..."
                : "Register"}
            </button>

          </form>

          <p className="text-center mt-8">

            Sudah punya akun?

            <Link
              to="/login"
              className="text-green-600 font-semibold ml-2 hover:underline"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

      <Footer />

    </div>
  );
}

export default Register;
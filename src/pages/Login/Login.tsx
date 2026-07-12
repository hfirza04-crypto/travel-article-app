import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import {
  loginSchema,
  type LoginSchema,
} from "../../validation/loginSchema";

import { login } from "../../api/auth";
import { useAuthStore } from "../../store/authStore";

function Login() {
  const navigate = useNavigate();

  const { setUser, setToken } = useAuthStore();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      setLoading(true);

      const response = await login(
        data.identifier,
        data.password
      );

      localStorage.setItem("token", response.jwt);
      localStorage.setItem(
        "user",
        JSON.stringify(response.user)
      );

      setToken(response.jwt);
      setUser(response.user);

      toast.success("Login berhasil!");

      navigate("/home");
    } catch (error) {
      console.log(error);

      toast.error("Email atau password salah!");
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
            Selamat Datang
          </h1>

          <p className="text-center text-gray-500 mb-8">
            Silakan login untuk melanjutkan.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >

            <div className="mb-5">

              <label className="block mb-2 font-semibold">
                Email
              </label>

              <input
                type="email"
                placeholder="Masukkan email"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("identifier")}
              />

              <p className="text-red-500 text-sm mt-1">
                {errors.identifier?.message}
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
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("password")}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="text-sm text-blue-600 mt-2 hover:underline"
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
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Masuk..." : "Login"}
            </button>

          </form>

          <p className="text-center mt-8">

            Belum punya akun?

            <Link
              to="/register"
              className="text-blue-600 font-semibold ml-2 hover:underline"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

      <Footer />

    </div>
  );
}

export default Login;
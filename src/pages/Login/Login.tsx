import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { loginSchema, type LoginSchema } from "../../validation/loginSchema";
import { login } from "../../api/auth";
import { useAuthStore } from "../../store/authStore";

function Login() {
  const navigate = useNavigate();

  const { setUser, setToken } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const response = await login(data.identifier, data.password);

      localStorage.setItem("token", response.jwt);
      localStorage.setItem("user", JSON.stringify(response.user));

      setToken(response.jwt);
      setUser(response.user);

      toast.success("Login berhasil!");

      navigate("/home");
    } catch (error) {
      console.log(error);

      toast.error("Email atau password salah!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-8">
          Login
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >

          <div className="mb-5">

            <label className="block mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Masukkan email"
              className="w-full border rounded-lg p-3"
              {...register("identifier")}
            />

            <p className="text-red-500 text-sm">
              {errors.identifier?.message}
            </p>

          </div>

          <div className="mb-5">

            <label className="block mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Masukkan password"
              className="w-full border rounded-lg p-3"
              {...register("password")}
            />

            <p className="text-red-500 text-sm">
              {errors.password?.message}
            </p>

          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-6">

          Belum punya akun?

          <Link
            to="/register"
            className="text-blue-600 ml-2"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;
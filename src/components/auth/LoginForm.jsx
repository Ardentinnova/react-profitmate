import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../utils/api";
import toast from "react-hot-toast";

const LoginForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Implementasi login akan ditambahkan di sini
        console.log("Login form submitted:", formData);

        try {
            await login(formData);
            navigate("/dashboard");
        } catch (err) {
            console.log(err)

            if (err.status == 400) {
                toast.error("Email atau password anda salah");
                return;
            }
            toast.error("Terjadi kesalahan pada server")
            return
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-bold text-gray-700 mb-6 mt-12"
                >
                    Alamat Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Masukkan email anda"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange"
                />
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700 mb-6"
                >
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Masukkan password anda"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange"
                />
            </div>

            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="remember"
                        name="remember"
                        className="h-4 w-4 text-orange border-gray-300 rounded"
                        checked={formData.remember}
                        onChange={handleChange}
                    />
                    <label
                        htmlFor="remember"
                        className="ml-2 block text-sm text-gray-700"
                    >
                        Ingat saya
                    </label>
                </div>
            </div>

            {/* Tombol submit ditaruh di tengah */}
            <div className="flex justify-center">
                <button
                    type="submit"
                    className="w-64 py-2 px-4 mt-4 bg-orange-400 text-white font-medium rounded-full hover:bg-orange-500 transition-colors"
                >
                    Masuk
                </button>
            </div>

            <div className="text-center mt-4">
                <p className="text-sm text-gray-600 font-bold">
                    Belum punya akun?{" "}
                    <Link
                        to="/register"
                        className="text-orange-500 hover:underline font-medium"
                    >
                        Daftar
                    </Link>
                </p>
            </div>
        </form>
    );
};

export default LoginForm;

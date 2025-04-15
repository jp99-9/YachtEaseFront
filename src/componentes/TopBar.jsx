import { useNavigate } from "react-router-dom";
import { fetchLogout } from "../utils/apis";
// components/Topbar.jsx
export function Topbar({ user }) {

    const navigate = useNavigate();
    
    const handleLogout = async () => {
        try {
            await fetchLogout(); // llamada al backend

            // Limpieza del localStorage
            localStorage.removeItem("token");
            localStorage.removeItem("boat");

            navigate("/login");
        } catch (error) {
            console.error("Error durante el logout:", error.message);

            // Aun si el backend falla, limpia y redirige
            localStorage.removeItem("token");
            localStorage.removeItem("boat");
            navigate("/login");
        }
    };

    return (
        <header className="w-full h-16 px-6 py-10 flex items-center justify-between bg-white/30 backdrop-blur-md shadow-sm border-b border-white/20">
            <h1 className="text-xl font-semibold text-[#d4af37]">YachtEase</h1>
            <div className="flex items-center gap-3">
                <span className="text-gray-800 font-medium">{user.name}</span>
                <img
                    src="/icons/usuario.png"
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border border-white shadow"
                />
                <button
                    onClick={handleLogout}
                    className="bg-gradient-to-r from-red-400 to-red-600 text-white px-4 py-2 rounded-md focus:outline-none transition duration-300 ease-in-out hover:from-red-500 hover:to-red-700"
                    title="Cerrar sesión"

                >
                    Logout
                </button>
            </div>
        </header>
    );
}

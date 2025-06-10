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
        <header className="fixed top-0 left-0 w-full h-16 px-6 flex items-center justify-between
  bg-gradient-to-r from-[#123456]/60 to-[#654321]/60
  backdrop-blur-sm
  drop-shadow-md
  z-50">
            <h1 className="text-xl font-semibold text-[#d4af37]">YachtEase</h1>
            <div className="flex items-center gap-3">
                <div className="p-0.5 bg-gradient-to-tr from-[#143D63] to-yellow-500 rounded-full overflow-hidden">
                    <img 
                        src="/icons/usuario.png" 
                        alt={user.name}
                        className="w-10 h-10 rounded-full bg-white object-cover"
                        loading="lazy"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/icons/usuario.png";
                        }}
                    />
                </div>
                <span className="text-white font-medium">{user.name}</span>
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

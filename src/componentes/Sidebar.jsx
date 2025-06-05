import { Link } from "react-router-dom";
import { useSidebar } from "../utils/SidebarContext";
import { useLocation } from "react-router-dom";


//Este sidebar tendra 3 secciones en la inicial habra el icono de perfil del barco con su foto, y el nombre del barco junto con el icono para abrir y cerrar el sidebar para ocupar menos espacio.
//En la seccion principal que sera el menu estaran los links a cada pagina del app y sus iconos, al reducir la bara solo se veranm los iconos.
//En el footer del menu estara la seccion de ajustes y configuracion.sss
export function Sidebar({ name }) {

    const { isOpen, toggleSidebar } = useSidebar();
    const location = useLocation();


    return (
        <div className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-[#143D63] text-white flex flex-col justify-between transition-all  ease-in-out ${isOpen ? "w-64" : "w-25"}`}>
            {/* Top section */}
            <div>
                <div className="flex items-center px-4 py-4">
                    <button onClick={() => toggleSidebar(!isOpen)} className=" flex items-center gap-3 px-4 py-2 text-white opacity-70 hover:opacity-100">
                        <img
                            src={isOpen ? "/icons/cerrar_panel.svg" : "/icons/abrir_panel.svg"}
                            className="w-8 h-8 "
                            alt="Toggle Sidebar"
                        />
                        {isOpen && <span className="text-sm font-medium">Ocultar</span>}
                    </button>
                </div>

                {/* Menu */}
                <nav className="mt-4">
                    <p className="text-left text-sm py-2 ml-7 opacity-40">Main</p>
                    <ul className="flex flex-col">
                        <li className={`px-4 py-2 transition-all hover:bg-[#1C4E80] ${location.pathname === "/Dashboard" ? "border-r-4 border-[#d4af37] bg-[#1C4E80]" : ""
                            }`}>
                            <Link to="/Dashboard" className="flex items-center gap-2 ">
                                <SidebarItem icon={<img src="/icons/dashboard.svg" />} label="Dashboard" isOpen={isOpen} />
                            </Link>
                        </li>
                        <li className={`px-4 py-2 transition-all hover:bg-[#1C4E80] ${location.pathname === "/Inventario" ? "border-r-4 border-[#d4af37] bg-[#1C4E80]" : ""
                            }`}>
                            <Link to="/Inventario" className="flex items-center gap-2">
                                <SidebarItem icon={<img src="/icons/inventory.svg" />} label="Inventario" isOpen={isOpen} />
                            </Link>
                        </li>
                        <li className={`px-4 py-2 transition-all hover:bg-[#1C4E80] ${location.pathname === "/Mapa" ? "border-r-4 border-[#d4af37] bg-[#1C4E80]" : ""
                            }`}>
                            <Link to="/Mapa" className="flex items-center gap-2">
                                <SidebarItem icon={<img src="/icons/localizacion.svg" />} label="Mapa" isOpen={isOpen} />
                            </Link>
                        </li>

                        <p className="text-left text-sm ml-7 opacity-40 ">Control</p>

                        <li className="px-4 py-2">
                            <Link to="/" className="flex items-center gap-2">
                                <SidebarItem icon={<img src="/icons/alertas.svg" />} label="Alertas" isOpen={isOpen} />
                            </Link>
                        </li>
                        <li className={`px-4 py-2 transition-all hover:bg-[#1C4E80] ${location.pathname === "/Movements" ? "border-r-4 border-[#d4af37] bg-[#1C4E80]" : ""
                            }`}>
                            <Link to="/Movements" className="flex items-center gap-2">
                                <SidebarItem icon={<img src="/icons/movements.svg" />} label="Movements" isOpen={isOpen} />
                            </Link>
                        </li>
                        <div>
                            <p className="text-left text-sm ml-7 opacity-40 pt-96">Ajustes</p>

                            <li className="px-4 py-2 ">
                                <Link to="/Dashboard" className="flex items-center gap-2">
                                    <SidebarItem icon={<img src="/icons/ajustes.svg" />} label="Ajustes" isOpen={isOpen} />
                                </Link>
                            </li>
                            <li className="px-4 py-2 ">
                                <Link to="/" className="flex items-center gap-2">
                                    <SidebarItem icon={<img src="/icons/ayuda.svg" />} label="Soporte" isOpen={isOpen} />
                                </Link>
                            </li>
                            <li className="px-4 py-2 ">
                                <Link to="/" className="flex items-center gap-2">
                                    <SidebarItem icon={<img src="/icons/ajuste_perfiles.svg" />} label="Perfiles" isOpen={isOpen} />
                                </Link>
                            </li>
                        </div>
                    </ul>
                </nav>
            </div>

            {/* Bottom section */}
            <div className="bg-[#3E5569] py-4">
                {/* Icono de perfil del barco */}
                <div className="flex items-center px-8 py-3 hover:bg-[#1C4E80] transition-all">
                    <img
                        src="/icons/usuario.png"
                        alt="Avatar"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    {isOpen && <span className="ml-3 font-medium text-sm">Brende</span>}
                </div>

            </div>
        </div>
    );
}

function SidebarItem({ icon, label, isOpen }) {
    return (
        <div className="flex items-center px-4 py-2 transition-all opacity-80 hover:opacity-100">
            <div className="w-8 h-8 flex items-center justify-center">
                {icon}
            </div>
            {isOpen && <span className="text-sm ml-3 font-medium leading-none truncate">{label}</span>}
        </div>
    );
}

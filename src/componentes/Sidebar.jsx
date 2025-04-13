import { Link } from "react-router-dom";

//Este sidebar tendra 3 secciones en la inicial habra el icono de perfil del barco con su foto, y el nombre del barco junto con el icono para abrir y cerrar el sidebar para ocupar menos espacio.
//En la seccion principal que sera el menu estaran los links a cada pagina del app y sus iconos, al reducir la bara solo se veranm los iconos.
//En el footer del menu estara la seccion de ajustes y configuracion.
export function Sidebar({ name, isOpen, toggleSidebar }) {
    return (
        <div className={`h-full bg-[#143D63] text-white flex flex-col justify-between transition-all duration-300 ease-in-out ${isOpen ? "w-64" : "w-25"}`}>
            {/* Top section */}
            <div>
                <div className="flex items-center gap-2 px-4 py-4 bg-[#274A6B]">
                    {/*Icono de perfil del barco */}
                    {isOpen && <img
                        src="/icons/usuario.png"
                        alt="Avatar"
                        className="w-10 h-10 rounded-full object-cover"
                    />}

                    {isOpen && <span className="font-medium">Brende</span>}
                    <div className={isOpen ? "ml-auto" : "mx-auto"}>
                        <button onClick={toggleSidebar} className="text-white opacity-70 hover:opacity-100">
                            {isOpen ? (
                                <img src="/icons/cerrar_panel.svg" className="w-10 h-10" alt="Cerrar" />
                            ) : (
                                <img src="/icons/abrir_panel.svg" className="w-8 h-8" alt="Abrir" />
                            )}
                        </button>
                    </div>

                </div>

                {/* Menu */}
                <nav className="mt-4">
                    <ul className="flex flex-col">
                        <li className="px-4 py-2 hover:bg-[#1C4E80] transition-all cursor-pointer">
                            <Link to="/Dashboard" className="flex items-center gap-2">
                                <SidebarItem icon={<img src="/icons/dashboard.svg" className="w-10 h-10" />} label="Dashboard" isOpen={isOpen} />
                            </Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-[#1C4E80] transition-all cursor-pointer">
                            <Link to="/" className="flex items-center gap-2">
                                <SidebarItem icon={<img src="/icons/inventory.svg" className="w-10 h-10" />} label="Inventario" isOpen={isOpen} />
                            </Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-[#1C4E80] transition-all cursor-pointer">
                            <Link to="/" className="flex items-center gap-2">
                                <SidebarItem icon={<img src="/icons/localizacion.svg" className="w-10 h-10" />} label="Mapa" isOpen={isOpen} />
                            </Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-[#1C4E80] transition-all cursor-pointer">
                            <Link to="/" className="flex items-center gap-2">
                                <SidebarItem icon={<img src="/icons/alertas.svg" className="w-10 h-10" />} label="Alertas" isOpen={isOpen} />
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Bottom section */}
            <div className="bg-[#3E5569] py-4">
                <ul className="flex flex-col">
                    <li className="px-4 py-2 hover:bg-[#1C4E80] transition-all cursor-pointer">
                        <Link to="/Dashboard" className="flex items-center gap-2">
                            <SidebarItem icon={<img src="/icons/ajustes.svg" className="w-10 h-10" />} label="Ajustes" isOpen={isOpen} />
                        </Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-[#1C4E80] transition-all cursor-pointer">
                        <Link to="/" className="flex items-center gap-2">
                            <SidebarItem icon={<img src="/icons/ayuda.svg" className="w-10 h-10" />} label="Soporte" isOpen={isOpen} />
                        </Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-[#1C4E80] transition-all cursor-pointer">
                        <Link to="/" className="flex items-center gap-2">
                            <SidebarItem icon={<img src="/icons/ajuste_perfiles.svg" className="w-10 h-10" />} label="Perfiles" isOpen={isOpen} />
                        </Link>
                    </li>

                </ul>
            </div>
        </div>
    );
}

function SidebarItem({ icon, label, isOpen }) {
    return (
        <div className="flex items-center px-4 py-2 hover:bg-[#1C4E80] transition-all cursor-pointer">
            <span className="w-8 h-8  ">{icon}</span>
            {isOpen && <span className="ml-3 text-lg">{label}</span>}
        </div>
    );
}


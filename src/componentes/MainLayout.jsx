// MainLayout.jsx
import { Sidebar } from "./Sidebar";
import { Topbar } from "./TopBar";
import { useSidebar } from "../utils/SidebarContext";


export function MainLayout({ children }) {

    const { isOpen } = useSidebar();


    return (
        <div className="flex">
        <Sidebar />

        {/* Este div ocupa todo el ancho de la pantalla y contiene el Topbar y el contenido */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
            
            {/* Topbar fijo arriba sin márgenes laterales */}
            <Topbar user={""} />

            {/* El contenido sí se mueve con el sidebar */}
            <div className={`transition-all duration-300 flex-1 overflow-auto p-6 ${isOpen ? "ml-64" : "ml-24"}`}>
                {children}
            </div>
        </div>
    </div>
    );
}

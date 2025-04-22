// MainLayout.jsx
import { Sidebar } from "./Sidebar";
import { Topbar } from "./TopBar";
import { useSidebar } from "../utils/SidebarContext";


export function MainLayout({ children }) {

    const { isOpen } = useSidebar();


    return (
        <div className="flex">
            <Sidebar />
            <div className={`transition-all duration-300 flex-1 flex flex-col h-screen overflow-hidden ${isOpen ? "ml-64" : "ml-24"
                }`}>
                <Topbar user={""} />
                <main className="p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}

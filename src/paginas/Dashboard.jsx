import { useState } from "react";
import { Sidebar } from "../componentes/Sidebar";


export function Dashboard() {

    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen ">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-60" : "ml-20"} p-6`}>
                <h1 className="text-center">Dashboard</h1>
            </div>
        </div>

    );
}
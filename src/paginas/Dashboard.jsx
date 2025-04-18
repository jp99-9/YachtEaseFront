import { useState } from "react";
import { Sidebar } from "../componentes/Sidebar";
import { Topbar } from "../componentes/TopBar";



export function Dashboard() {



    return (
        <div className="grid grid-cols-[auto_1fr] h-screen transition-all duration-300">
            <Sidebar />
            <div className="flex flex-col">
                <Topbar user={""} />
                <main className="p-6 overflow-y-auto">
                    <h1 className="text-center">Dashboard</h1>
                </main>

            </div>
        </div>

    );
}
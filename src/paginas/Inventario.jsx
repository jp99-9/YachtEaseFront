import { Sidebar } from "../componentes/Sidebar";
import { Topbar } from "../componentes/TopBar";


export function Inventario() {
    return (
        <div className="grid grid-cols-[auto_1fr] h-screen transition-all duration-300">
            <Sidebar />
            <div className="flex flex-col">
                <Topbar user={""}/>
                <h1>Inventario</h1>
            </div>
        </div>
    )
}
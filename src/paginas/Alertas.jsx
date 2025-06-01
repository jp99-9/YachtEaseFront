import React, { useEffect, useState } from "react";

const AlertPage = () => {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        // Simulación de fetch de alertas desde backend
        setAlerts([
            {
                id: 1,
                type: "low_stock",
                message: "Quedan solo 5 filtros de agua en la ubicación A1",
                priority: "high",
                date: "2025-04-28",
            },
            {
                id: 2,
                type: "inactivity",
                message: "No se ha movido el generador de emergencia en 90 días",
                priority: "medium",
                date: "2025-04-20",
            },
            {
                id: 3,
                type: "unauthorized",
                message: "Se detectó apertura de caja sin perfil asignado",
                priority: "high",
                date: "2025-04-27",
            },
        ]);
    }, []);

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "high":
                return "bg-red-100 text-red-700 border-red-400";
            case "medium":
                return "bg-yellow-100 text-yellow-700 border-yellow-400";
            case "low":
                return "bg-blue-100 text-blue-700 border-blue-400";
            default:
                return "bg-gray-100 text-gray-700 border-gray-300";
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Alertas del Sistema</h1>
            <div className="space-y-4">
                {alerts.map((alert) => (
                    <div
                        key={alert.id}
                        className={`border-l-4 p-4 rounded shadow-sm ${getPriorityColor(alert.priority)}`}
                    >
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">{alert.message}</span>
                            <span className="text-sm text-gray-500">{alert.date}</span>
                        </div>
                        <p className="text-sm mt-1 capitalize">Tipo: {alert.type.replace("_", " ")}</p>
                    </div>
                ))}
                {alerts.length === 0 && (
                    <p className="text-gray-500">No hay alertas activas en este momento.</p>
                )}
            </div>
        </div>
    );
};

export default AlertPage;

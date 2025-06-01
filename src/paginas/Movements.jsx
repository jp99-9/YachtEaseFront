import { MainLayout } from "../componentes/MainLayout";
import { useEffect, useState } from "react";
import { fetchMovements } from "../utils/apis";

export function Movements() {

    const [movements, setMovements] = useState([]);

    useEffect(() => {
        const movement = async () => {
            const data = await fetchMovements();
            setMovements(data.data);
            console.log(movements);
        };
        movement();
    }, []);

    return (
        <MainLayout>
            <div className="max-w-6xl mx-auto p-6 space-y-4">
                <h1 className="text-3xl font-bold mb-6">Historial de Movimientos</h1>

                {movements.map(movement => (
                    <div
                        key={movement.id}
                        className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-2"
                    >
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl text-gray-700 font-semibold">
                                📦 {movement.item.name} ({movement.quantity})
                            </h2>
                            <p className="text-gray-500 text-sm">
                                {new Date(movement.movement_date).toLocaleDateString()}
                            </p>
                        </div>

                        <div className="text-gray-700 text-sm">
                            <p>
                                <span className="font-medium">De:</span>{" "}
                                {movement.from_location?.name || "Ubicación desconocida"}
                                {movement.from_box && ` / ${movement.from_box.name}`}
                            </p>
                            <p>
                                <span className="font-medium">Hacia:</span>{" "}
                                {movement.to_location?.name || "Ubicación desconocida"}
                                {movement.to_box && ` / ${movement.to_box.name}`}
                            </p>
                        </div>

                        {movement.reason && (
                            <p className="text-gray-600 italic text-sm mt-2">
                                Motivo: {movement.reason}
                            </p>
                        )}

                        {movement.observations && (
                            <p className="text-gray-500 text-xs mt-1">
                                Observaciones: {movement.observations}
                            </p>
                        )}
                    </div>
                ))}
            </div>

        </MainLayout>
    )
}
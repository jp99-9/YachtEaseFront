import { MainLayout } from "../componentes/MainLayout";
import { useEffect, useState } from "react";
import { fetchLocations } from "../utils/apis";


export function Mapa() {
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);


    useEffect(() => {
        const load = async () => {
            const data = await fetchLocations();
            setLocations(data.data); // Ajusta según tu API
            console.log(locations);
        };
        load();
    }, []);



    return (
        <MainLayout>
            <div className="p-6">
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden relative max-w-5xl mx-auto">
                    <img src="./icons/localizacion.svg" alt="Plano del barco" className="w-full object-contain" />

                    {/* Puntos encima */}
                    {locations.map(loc => (
                        <div
                            key={loc.id}
                            className="absolute w-4 h-4 bg-blue-600 rounded-full cursor-pointer"
                            style={{
                                top: `${loc.latitud}%`,
                                left: `${loc.longitud}%`,
                                transform: "translate(-50%, -50%)",
                            }}
                            onClick={() => setSelectedLocation(loc)}
                        />
                    ))}
                </div>
            </div>
            {selectedLocation && (
                <div className="mt-6 max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-4 transition-all">
                    <h2 className="text-xl font-bold mb-2">{selectedLocation.name}</h2>
                    <p className="text-gray-600">{selectedLocation.description}</p>
                    {/* Aquí puedes listar los ítems que hay en esa localización */}
                    {/* <ul className="mt-4 list-disc list-inside text-gray-700">
                        {selectedLocation.items?.map(item => (
                            <li key={item.id}>{item.name} ({item.type})</li>
                        ))}
                    </ul> */}
                </div>
            )}

        </MainLayout>
    )
}
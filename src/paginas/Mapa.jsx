import { MainLayout } from "../componentes/MainLayout";
import { useEffect, useState } from "react";
import { fetchLocations, fetchLocationItems } from "../utils/apis";


export function Mapa() {
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [clickedPoint, setClickedPoint] = useState(null);
    const [locationData, setLocationData] = useState(null);

    useEffect(() => {
        const load = async () => {
            const data = await fetchLocations();
            setLocations(data); // Ajusta según tu API
            console.log(locations);
        };
        load();
    }, []);

    const handleSelectLocation = async (loc) => {
        console.log("Localización clicada:", loc);
        console.log("ID a usar en la API:", loc.id);
        setSelectedLocation(loc);
        try {
            const data = await fetchLocationItems(loc.id);
            console.log("Data desde API de items:", data);
            setLocationData(data);
        } catch (err) {
            console.error("Error cargando los datos:", err);
            setLocationData(null);
        }
    };

    const handleImageClick = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        const point = {
            x: x.toFixed(2),
            y: y.toFixed(2),
        };

        console.log("Coordenadas clicadas:", point);
        setClickedPoint(point);
    };



    return (
        <MainLayout>
            <div className="p-6">
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden relative max-w-5xl mx-auto">
                    <img src="./images/floor1.png" alt="Plano del barco" className="w-full object-contain" onClick={handleImageClick} />

                    {/* Puntos encima */}
                    {locations.map(loc => (
                        <div
                            key={loc.id}
                            className="absolute z-20 w-8 h-8 bg-blue-600 rounded-full cursor-pointer"
                            style={{
                                top: `${loc.latitude}%`,
                                left: `${loc.longitude}%`,
                                transform: "translate(-50%, -50%)",
                            }}
                            onClick={() => handleSelectLocation(loc)}
                        />
                    ))}

                    {/* Punto clicado (opcional) */}
                    {clickedPoint && (
                        <div
                            className="absolute z-10 w-4 h-4 bg-red-500 rounded-full"
                            style={{
                                top: `${clickedPoint.y}%`,
                                left: `${clickedPoint.x}%`,
                                transform: "translate(-50%, -50%)",

                            }}
                        />
                    )}
                </div>
            </div>
            {locationData && (
                <div className="mt-6 max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-4">
                    <h1 className="text-2xl text-gray-700 font-bold">{locationData.location.name}</h1>
                    <h2 className="text-xl text-gray-700 font-bold">{locationData.location.description}</h2>


                    {locationData.direct_items.length > 0 && (
                        <div>
                            <h3 className="font-semibold mb-2">Ítems sueltos:</h3>
                            <ul className="list-disc list-inside text-gray-700">
                                {locationData.direct_items.map(item => (
                                    <li key={item.id}>{item.name} ({item.quantity})</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {locationData.storage_boxes.length > 0 && (
                        <div>
                            <h3 className="font-semibold mb-4">Cajas:</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {locationData.storage_boxes.map(({ box, items }) => (
                                    <div key={box.id} className="bg-gray-100 rounded-xl shadow p-4">
                                        <p className="text-lg font-semibold text-blue-800 mb-2">{box.name}</p>
                                        <ul className="list-disc list-inside ml-2 text-gray-700 space-y-1">
                                            {items.map(item => (
                                                <li key={item.id}>{item.name} ({item.quantity})</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

        </MainLayout>
    )
}
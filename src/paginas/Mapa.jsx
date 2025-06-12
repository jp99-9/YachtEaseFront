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
            setLocations(data);
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
            <div className="p-6 min-h-screen bg-gray-50">
                <div className="max-w-8xl mx-auto">
                    <div className="flex gap-6">
                        {/* Map Container - Always visible */}
                        <div className={`bg-white shadow-xl rounded-2xl overflow-hidden ${locationData ? 'w-3/5' : 'w-full'} transition-all duration-300`}>
                            <div className="p-4">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Mapa del Yate</h2>
                                <div className="relative">
                                    <img 
                                        src="./images/floor1.png" 
                                        alt="Plano del barco" 
                                        className="w-full h-auto object-contain"
                                        onClick={handleImageClick}
                                        loading="lazy"
                                    />

                                    {/* Location Points */}
                                    {locations.map(loc => (
                                        <div
                                            key={loc.id}
                                            className="absolute z-20 group"
                                            style={{
                                                top: `${loc.latitude}%`,
                                                left: `${loc.longitude}%`,
                                                transform: "translate(-50%, -50%)",
                                            }}
                                        >
                                            {/* Outer pulse animation ring */}
                                            <div className="absolute -inset-1">
                                                <div className="w-10 h-10 rounded-full animate-ping bg-blue-400 opacity-20"></div>
                                            </div>
                                            
                                            {/* Main point with interactive effects */}
                                            <div
                                                className={`
                                                    w-8 h-8 rounded-full cursor-pointer 
                                                    transition-all duration-300 ease-in-out
                                                    flex items-center justify-center
                                                    ${selectedLocation?.id === loc.id 
                                                        ? 'bg-blue-700 ring-4 ring-blue-300 scale-110' 
                                                        : 'bg-blue-500 hover:bg-blue-600 hover:scale-105'
                                                    }
                                                    shadow-lg hover:shadow-blue-300/50
                                                `}
                                                onClick={() => handleSelectLocation(loc)}
                                            >
                                                {/* Inner dot */}
                                                <div className={`
                                                    w-2 h-2 rounded-full 
                                                    transition-all duration-300
                                                    ${selectedLocation?.id === loc.id 
                                                        ? 'bg-white scale-150' 
                                                        : 'bg-white/70 group-hover:scale-125'
                                                    }
                                                `}></div>
                                            </div>

                                            {/* Enhanced tooltip */}
                                            <div className={`
                                                absolute bottom-full left-1/2 transform -translate-x-1/2 
                                                mb-3 px-4 py-2 bg-gray-900/90 backdrop-blur-sm
                                                text-white text-sm rounded-lg
                                                opacity-0 group-hover:opacity-100 
                                                transition-all duration-200 
                                                whitespace-nowrap pointer-events-none
                                                shadow-lg
                                                ${selectedLocation?.id === loc.id ? 'mb-4' : ''}
                                            `}>
                                                <span className="font-medium">{loc.name}</span>
                                                {/* Tooltip arrow */}
                                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                                                            border-4 border-transparent border-t-gray-900/90"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Location Information - Slides in from right */}
                        {locationData && (
                            <div className="w-2/5 transition-all duration-300 transform">
                                <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
                                    <div className="border-b pb-4 mb-6">
                                        <h2 className="text-2xl font-bold text-blue-800 mb-2">{locationData.location.name}</h2>
                                        <p className="text-gray-600 text-lg">{locationData.location.description}</p>
                                    </div>

                                    <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
                                        {/* Direct Items Section */}
                                        {locationData.direct_items.length > 0 && (
                                            <div className="bg-blue-50 rounded-xl p-6">
                                                <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                                                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                                    </svg>
                                                    Items Sueltos
                                                </h3>
                                                <div className="grid grid-cols-1 gap-3">
                                                    {locationData.direct_items.map(item => (
                                                        <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm flex items-center space-x-3">
                                                            <div className="bg-blue-100 rounded-full p-2">
                                                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                                                                </svg>
                                                            </div>
                                                            <div className="flex-1">
                                                                <p className="font-medium text-gray-800">{item.name}</p>
                                                                <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Storage Boxes Section */}
                                        {locationData.storage_boxes.length > 0 && (
                                            <div className="bg-green-50 rounded-xl p-6">
                                                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                                                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                                                    </svg>
                                                    Cajas de Almacenamiento
                                                </h3>
                                                <div className="space-y-4">
                                                    {locationData.storage_boxes.map(({ box, items }) => (
                                                        <div key={box.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                                                            <div className="bg-green-100 p-4">
                                                                <h4 className="text-lg font-semibold text-green-800">{box.name}</h4>
                                                            </div>
                                                            <div className="p-4">
                                                                <ul className="space-y-2">
                                                                    {items.map(item => (
                                                                        <li key={item.id} className="flex items-center space-x-2">
                                                                            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                                                            <span className="text-gray-700">{item.name}</span>
                                                                            <span className="text-gray-500 text-sm">({item.quantity})</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }
            `}</style>
        </MainLayout>
    );
}
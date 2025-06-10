import React, { useState, useEffect } from "react";
import { fetchItems, fetchBoxes, fetchLocations, fetchTypes } from "../utils/apis";
import { InventoryCard } from "../componentes/InventoryCard";
import { MainLayout } from "../componentes/MainLayout";


export function Inventario() {


    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 20,
        total: 0
    });

    const [filters, setFilters] = useState({
        search: '',
        type_id: '',
        location_id: '',
        box_id: '',
        page: 1,
    });

    const [types, setTypes] = useState([]);
    const [locations, setLocations] = useState([]);
    const [boxes, setBoxes] = useState([]);

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFilterData = async () => {
            const [typeData, locationData, boxData] = await Promise.all([
                fetchTypes(),
                fetchLocations(),
                fetchBoxes()
            ]);

            setTypes(typeData);
            setLocations(locationData);
            setBoxes(boxData);
        };

        loadFilterData();
    }, []);

    useEffect(() => {
        const loadItems = async () => {
            try {
                const data = await fetchItems(filters);
                setItems(data.items); // usamos .items porque el backend devuelve así
                setPagination(data.pagination)
            } catch (error) {
                console.error("Error al cargar los ítems:", error.message);
            } finally {
                setLoading(false);
            }
        };

        loadItems();
    }, [filters]);

    const handleChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value, page: 1 }));

    };
    const handlePageChange = (newPage) => {
        setFilters(prev => ({ ...prev, page: newPage }));
    };


    //if (loading) return <p>Cargando ítems...</p>;



    return (
        <MainLayout >
            <div className="flex flex-col min-h-screen">
                <div className="p-6 flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                        <input
                            type="text"
                            placeholder="Buscar ítem..."
                            value={filters.search}
                            onChange={(e) => handleChange('search', e.target.value)}
                            className="border border-gray-300 rounded px-4 py-2 max-w-sm"
                        />

                        <div className="flex gap-4 flex-wrap">
                            <select
                                value={filters.location_id}
                                onChange={(e) => handleChange('location_id', e.target.value)}
                                className="border border-gray-300 rounded px-4 py-2"
                            >
                                <option value="">Todas las ubicaciones</option>
                                {locations.map((loc) => (
                                    <option key={loc.id} value={loc.id}>{loc.name}</option>
                                ))}
                            </select>

                            <select
                                value={filters.type_id}
                                onChange={(e) => handleChange('type_id', e.target.value)}
                                className="border border-gray-300 rounded px-4 py-2"
                            >
                                <option value="">Todos los tipos</option>
                                {types.map((type) => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </select>

                            <select
                                value={filters.box_id}
                                onChange={(e) => handleChange('box_id', e.target.value)}
                                className="border border-gray-300 rounded px-4 py-2"
                            >
                                <option value="">Todas las cajas</option>
                                {boxes.map((box) => (
                                    <option key={box.id} value={box.id}>{box.name}</option>
                                ))}
                            </select>

                            <button
                                onClick={() =>
                                    setFilters({
                                        search: '',
                                        type_id: '',
                                        location_id: '',
                                        box_id: '',
                                    })
                                }
                                className="border border-gray-400 rounded px-4 py-2 hover:bg-gray-100"
                            >
                                Limpiar filtros
                            </button>
                        </div>
                    </div>

                    {loading ? <p className="text-center text-gray-400 mt-10">Cargando ítems...</p> :
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {items.map((item) => (
                                <InventoryCard key={item.id}
                                    {...item} />
                            ))}
                        </div>
                    }
                    {items.length === 0 && !loading && (
                        <p className="text-center text-gray-400 mt-10">No se encontraron ítems.</p>
                    )}
                </div>

                <div className="mt-auto">
                    <div className="py-4 px-6 flex justify-center items-center gap-2">
                        <button
                            disabled={pagination.current_page === 1}
                            onClick={() => handlePageChange(pagination.current_page - 1)}
                            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                        >
                            ← Anterior
                        </button>

                        <span>Página {pagination.current_page} de {pagination.last_page}</span>

                        <button
                            disabled={pagination.current_page === pagination.last_page}
                            onClick={() => handlePageChange(pagination.current_page + 1)}
                            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                        >
                            Siguiente →
                        </button>
                    </div>
                </div>

                <button className="fixed bottom-6 right-6 rounded-full px-6 py-3 text-lg shadow-lg bg-blue-600 text-white hover:bg-blue-700">
                    ➕ Agregar ítem
                </button>
            </div>
        </MainLayout>
    )
}
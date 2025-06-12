import React, { useState, useEffect } from "react";
import { fetchItems, fetchBoxes, fetchLocations, fetchTypes, fetchCreateItem, fetchCreateMovement } from "../utils/apis";
import { InventoryCard } from "../componentes/InventoryCard";
import { MainLayout } from "../componentes/MainLayout";
import AddItemForm from "../componentes/AddItemForm";
import { MovementForm } from "../componentes/MovementForm";
import { Toast } from "../componentes/Toast";

export function Inventario() {
    const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
    const [isMovementModalOpen, setIsMovementModalOpen] = useState(false);
    const [toast, setToast] = useState(null);

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

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };

    useEffect(() => {
        const loadFilterData = async () => {
            try {
                const [typeData, locationData, boxData] = await Promise.all([
                    fetchTypes(),
                    fetchLocations(),
                    fetchBoxes()
                ]);

                setTypes(typeData);
                setLocations(locationData);
                setBoxes(boxData);
            } catch (error) {
                console.error("Error al cargar los datos de filtro:", error);
                showToast("Error al cargar los datos de filtro", "error");
            }
        };

        loadFilterData();
    }, []);

    useEffect(() => {
        const loadItems = async () => {
            try {
                const data = await fetchItems(filters);
                setItems(data.items);
                setPagination(data.pagination);
            } catch (error) {
                console.error("Error al cargar los ítems:", error);
                showToast("Error al cargar los ítems", "error");
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

    const resetFilters = () => {
        setFilters({
            search: '',
            type_id: '',
            location_id: '',
            box_id: '',
            page: 1,
        });
    };

    const handleAddItem = async (formData) => {
        try {
            const response = await fetchCreateItem(formData);
            
            // After successful creation, refresh the items list
            const data = await fetchItems(filters);
            setItems(data.items);
            setPagination(data.pagination);
            showToast('Item creado exitosamente');
            setIsAddItemModalOpen(false);
        } catch (error) {
            console.error("Error al crear el ítem:", error);
            throw error; // Re-throw the error so AddItemForm can handle it
        }
    };

    const handleDeleteItem = (deletedId) => {
        setItems(prevItems => prevItems.filter(item => item.id !== deletedId));
    };

    const handleUpdateItem = async () => {
        try {
            const data = await fetchItems(filters);
            setItems(data.items);
            setPagination(data.pagination);
        } catch (error) {
            console.error("Error al actualizar la lista:", error);
            showToast("Error al actualizar la lista", "error");
        }
    };

    const handleCreateMovement = async (movementData) => {
        try {
            await fetchCreateMovement(movementData);
            showToast('Movimiento creado exitosamente');
            // Refresh items list after movement
            const data = await fetchItems(filters);
            setItems(data.items);
            setPagination(data.pagination);
        } catch (error) {
            console.error("Error al crear el movimiento:", error);
            showToast(error.message, 'error');
            throw error;
        }
    };

    return (
        <MainLayout>
            <div className="flex flex-col min-h-screen">
                <div className="p-6 flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                        <div className="flex items-center gap-4">
                            <input
                                type="text"
                                placeholder="Buscar ítem..."
                                value={filters.search}
                                onChange={(e) => handleChange('search', e.target.value)}
                                className="border border-gray-300 rounded px-4 py-2 w-64"
                            />
                            <button
                                onClick={resetFilters}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Resetear filtros
                            </button>
                        </div>

                        <div className="flex gap-4 flex-wrap">
                            <select
                                value={filters.type_id}
                                onChange={(e) => handleChange('type_id', e.target.value)}
                                className="border border-gray-300 rounded px-3 py-2"
                            >
                                <option value="">Todos los tipos</option>
                                {types.map(type => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </select>

                            <select
                                value={filters.location_id}
                                onChange={(e) => handleChange('location_id', e.target.value)}
                                className="border border-gray-300 rounded px-3 py-2"
                            >
                                <option value="">Todas las ubicaciones</option>
                                {locations.map(location => (
                                    <option key={location.id} value={location.id}>{location.name}</option>
                                ))}
                            </select>

                            <select
                                value={filters.box_id}
                                onChange={(e) => handleChange('box_id', e.target.value)}
                                className="border border-gray-300 rounded px-3 py-2"
                            >
                                <option value="">Todas las cajas</option>
                                {boxes.map(box => (
                                    <option key={box.id} value={box.id}>{box.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-8">
                            <p className="text-gray-600">Cargando ítems...</p>
                        </div>
                    ) : items.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                            {items.map(item => (
                                <InventoryCard
                                    key={item.id}
                                    {...item}
                                    onDelete={handleDeleteItem}
                                    onUpdate={handleUpdateItem}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-600">No se encontraron ítems</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {pagination.last_page > 1 && (
                        <div className="py-8 flex items-center justify-center gap-1 ">
                            <button
                                onClick={() => handlePageChange(1)}
                                disabled={pagination.current_page === 1}
                                className="px-2 py-1 rounded-md text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                ⟪
                            </button>
                            <button
                                onClick={() => handlePageChange(pagination.current_page - 1)}
                                disabled={pagination.current_page === 1}
                                className="px-2 py-1 rounded-md text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                ←
                            </button>

                            {/* Page numbers */}
                            {[...Array(pagination.last_page)].map((_, index) => {
                                const pageNumber = index + 1;
                                if (
                                    pageNumber === 1 ||
                                    pageNumber === pagination.last_page ||
                                    (pageNumber >= pagination.current_page - 1 &&
                                        pageNumber <= pagination.current_page + 1)
                                ) {
                                    return (
                                        <button
                                            key={pageNumber}
                                            onClick={() => handlePageChange(pageNumber)}
                                            className={`px-3 py-1 rounded-md text-sm font-medium ${
                                                pagination.current_page === pageNumber
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            {pageNumber}
                                        </button>
                                    );
                                } else if (
                                    pageNumber === pagination.current_page - 2 ||
                                    pageNumber === pagination.current_page + 2
                                ) {
                                    return <span key={pageNumber} className="px-2">...</span>;
                                }
                                return null;
                            })}

                            <button
                                onClick={() => handlePageChange(pagination.current_page + 1)}
                                disabled={pagination.current_page === pagination.last_page}
                                className="px-2 py-1 rounded-md text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                →
                            </button>
                            <button
                                onClick={() => handlePageChange(pagination.last_page)}
                                disabled={pagination.current_page === pagination.last_page}
                                className="px-2 py-1 rounded-md text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                ⟫
                            </button>

                            <span className="ml-4 text-sm text-gray-600">
                                Página {pagination.current_page} de {pagination.last_page}
                            </span>
                        </div>
                    )}
                </div>

                <div className="fixed bottom-6 right-6 flex gap-4">
                    <button 
                        onClick={() => setIsMovementModalOpen(true)}
                        className="rounded-full px-6 py-3 text-lg shadow-lg bg-green-600 text-white hover:bg-green-700"
                    >
                        ↔️ Mover ítem
                    </button>
                    <button 
                        onClick={() => setIsAddItemModalOpen(true)}
                        className="rounded-full px-6 py-3 text-lg shadow-lg bg-blue-600 text-white hover:bg-blue-700"
                    >
                        ➕ Agregar ítem
                    </button>
                </div>

                <AddItemForm
                    isOpen={isAddItemModalOpen}
                    onClose={() => setIsAddItemModalOpen(false)}
                    types={types}
                    locations={locations}
                    boxes={boxes}
                    onSubmit={handleAddItem}
                />

                <MovementForm
                    isOpen={isMovementModalOpen}
                    onClose={() => setIsMovementModalOpen(false)}
                    locations={locations}
                    boxes={boxes}
                    onSubmit={handleCreateMovement}
                />

                {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}
            </div>
        </MainLayout>
    );
}
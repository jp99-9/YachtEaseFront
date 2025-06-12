import { useState } from "react"
import { fetchDeleteItem } from "../utils/apis";
import { EditInventoryModal } from "./EditInventoryModal";
import { Toast } from "./Toast";

export function InventoryCard({
    id, name, description, quantity, image, brand, minimum_recommended, type, storage_box, location,
    onDelete, onUpdate
}) {
    const [openMore, setOpenMore] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [toast, setToast] = useState(null);

    const handleToggle = () => {
        setOpenMore(!openMore);
    };

    const handleMenuToggle = (e) => {
        e.stopPropagation();
        setIsMenuOpen(!isMenuOpen);
    };

    const handleClickOutside = () => {
        setIsMenuOpen(false);
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => {
            setToast(null);
        }, 3000);
    };

    const handleDelete = async () => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este item?')) {
            try {
                setIsLoading(true);
                await fetchDeleteItem(id);
                showToast('Item eliminado exitosamente', 'success');
                onDelete && onDelete(id);
            } catch (error) {
                console.error('Error al eliminar:', error);
                showToast('Error al eliminar el item: ' + (error.message || 'Error desconocido'), 'error');
            } finally {
                setIsLoading(false);
                setIsMenuOpen(false);
            }
        }
    };

    const handleEdit = () => {
        setIsEditModalOpen(true);
        setIsMenuOpen(false);
    };

    const handleUpdateSuccess = () => {
        showToast('Item actualizado exitosamente');
        onUpdate && onUpdate();
    };

    // Filter out any null or undefined tags
    const tags = [type?.name, brand, location?.name, storage_box?.name].filter(Boolean);

    return (
        <>
            <div key={id} className="bg-white rounded-xl shadow-md p-4 w-full max-w-xl relative" onClick={handleClickOutside}>
                <div className="flex items-center space-x-4">
                    {/* Image */}
                    <div className="w-24 h-24 flex-shrink-0">
                        <img
                            src={`http://localhost:8000/storage/${image}` || "/icons/usuario.png"}
                            alt={name}
                            className="w-full h-full object-contain"
                            loading="lazy"
                        />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                            <div className="pr-8">
                                <h3 className="font-semibold text-lg text-gray-900 truncate">{name}</h3>
                                <div className="flex items-baseline gap-2 mt-1">
                                    <span className="text-blue-600 font-medium">
                                        Cantidad: {quantity}
                                    </span>
                                    {minimum_recommended > 0 && (
                                        <span className={`text-sm ${quantity <= minimum_recommended ? 'text-red-500' : 'text-gray-500'}`}>
                                            (Mínimo: {minimum_recommended})
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Three-dot menu */}
                            <div className="absolute top-4 right-4">
                                <button 
                                    className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                                    onClick={handleMenuToggle}
                                    disabled={isLoading}
                                >
                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                                        <circle cx="4" cy="10" r="2" />
                                        <circle cx="10" cy="10" r="2" />
                                        <circle cx="16" cy="10" r="2" />
                                    </svg>
                                </button>
                                {/* Dropdown Menu */}
                                {isMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-1">
                                        <button
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                                            onClick={handleEdit}
                                            disabled={isLoading}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 disabled:opacity-50"
                                            onClick={handleDelete}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Eliminando...' : 'Eliminar'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tags */}
                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                                {tags.map((tag, idx) => (
                                    <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Ver más button */}
                        <button 
                            onClick={handleToggle} 
                            className="text-blue-600 hover:text-blue-700 text-sm mt-2 hover:underline focus:outline-none"
                        >
                            {openMore ? "Ver menos" : "Ver más"}
                        </button>

                        {/* Description */}
                        {openMore && description && (
                            <p className="mt-2 text-sm text-gray-600">
                                {description}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <EditInventoryModal
                item={{
                    id,
                    name,
                    description,
                    quantity,
                    minimum_recommended,
                    type,
                    location,
                    storage_box
                }}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onUpdate={handleUpdateSuccess}
            />

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </>
    );
}
import { useState, useEffect } from 'react';
import { fetchTypes, fetchLocations, fetchBoxes, fetchUpdateItem } from '../utils/apis';
import { Toast } from './Toast';

export function EditInventoryModal({ item, isOpen, onClose, onUpdate }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        quantity: 0,
        minimum_recommended: 0,
        type_id: '',
        location_id: '',
        storage_box_id: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [types, setTypes] = useState([]);
    const [locations, setLocations] = useState([]);
    const [boxes, setBoxes] = useState([]);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (item) {
            setFormData({
                name: item.name || '',
                description: item.description || '',
                quantity: item.quantity || 0,
                minimum_recommended: item.minimum_recommended || 0,
                type_id: item.type?.id || '',
                location_id: item.location?.id || '',
                storage_box_id: item.storage_box?.id || ''
            });
        }
    }, [item]);

    useEffect(() => {
        const loadOptions = async () => {
            try {
                const [typesData, locationsData, boxesData] = await Promise.all([
                    fetchTypes(),
                    fetchLocations(),
                    fetchBoxes()
                ]);
                setTypes(typesData || []);
                setLocations(locationsData || []);
                setBoxes(boxesData || []);
            } catch (error) {
                console.error('Error loading options:', error);
                showToast('Error al cargar las opciones', 'error');
            }
        };

        if (isOpen) {
            loadOptions();
        }
    }, [isOpen]);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await fetchUpdateItem(item.id, formData);
            showToast('Item actualizado exitosamente');
            setTimeout(() => {
                onUpdate && onUpdate();
                onClose();
            }, 1000);
        } catch (error) {
            console.error('Error:', error);
            showToast('Error al actualizar el item', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-h-[90vh] overflow-y-auto w-full max-w-3xl">
                <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl text-black font-bold">Editar Item</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600"
                            disabled={isLoading}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                    <input
                                        type="text"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                                    <select
                                        name="type_id"
                                        value={formData.type_id}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="">Seleccionar tipo</option>
                                        {types.map(type => (
                                            <option key={type.id} value={type.id}>{type.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
                                    <select
                                        name="location_id"
                                        value={formData.location_id}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="">Seleccionar ubicación</option>
                                        {locations.map(location => (
                                            <option key={location.id} value={location.id}>{location.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                        min="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mínimo Recomendado</label>
                                    <input
                                        type="number"
                                        name="minimum_recommended"
                                        value={formData.minimum_recommended}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                        min="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Caja de Almacenamiento</label>
                                    <select
                                        name="storage_box_id"
                                        value={formData.storage_box_id}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="">Seleccionar caja</option>
                                        {boxes.map(box => (
                                            <option key={box.id} value={box.id}>{box.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="sticky bottom-0 bg-white pt-4 pb-4 border-t border-gray-200">
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    disabled={isLoading}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
} 
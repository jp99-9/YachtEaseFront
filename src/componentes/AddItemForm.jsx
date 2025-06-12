import React, { useState } from 'react';
import { Toast } from './Toast';

const AddItemForm = ({ isOpen, onClose, types, locations, boxes, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        quantity: '',
        minimum_recommended: '',
        image: '',
        brand: '',
        type_id: '',
        location_id: '',
        storage_box_id: '',
        qr_code: null
    });
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let processedValue = value;

        // Convert numeric fields to numbers
        if (['quantity', 'minimum_recommended', 'type_id', 'location_id', 'storage_box_id'].includes(name)) {
            processedValue = value === '' ? '' : Number(value);
        }

        setFormData(prev => ({
            ...prev,
            [name]: processedValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Ensure qr field is included in the data sent
            const dataToSubmit = {
                name: formData.name,
                description: formData.description || null,
                quantity: Number(formData.quantity),
                minimum_recommended: formData.minimum_recommended !== '' ? Number(formData.minimum_recommended) : null,
                image: formData.image || null,
                brand: formData.brand || null,
                type_id: Number(formData.type_id),
                location_id: Number(formData.location_id),
                storage_box_id: formData.storage_box_id !== '' ? Number(formData.storage_box_id) : null,
                qr_code: formData.qr_code || null, // <-- corregido nombre
            };
            await onSubmit(dataToSubmit);
            showToast('Item creado exitosamente');
            setTimeout(() => {
                setFormData({
                    name: '',
                    description: '',
                    quantity: '',
                    minimum_recommended: '',
                    image: '',
                    brand: '',
                    type_id: '',
                    location_id: '',
                    storage_box_id: '',
                    qr_code: null
                });
                onClose();
            }, 1000);
        } catch (error) {
            console.error('Error al crear el item:', error);
            showToast('Error al crear el item. Por favor, inténtalo de nuevo.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
                    onClick={onClose}
                    disabled={isLoading}
                >
                    &times;
                </button>
                <h2 className="text-xl font-semibold mb-4 text-[#1B2C47]">Nuevo Ítem</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre del ítem *"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        maxLength={255}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        disabled={isLoading}
                    />

                    <input
                        type="text"
                        name="brand"
                        placeholder="Marca (opcional)"
                        value={formData.brand}
                        onChange={handleChange}
                        maxLength={255}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        disabled={isLoading}
                    />
//revisar despues la descripicion porque en el backend no tengo nullabe, pero deberia serlo.

                    <textarea
                        name="description"
                        placeholder="Descripción *"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        disabled={isLoading}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="number"
                            name="quantity"
                            placeholder="Cantidad actual *"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                            min="1"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            disabled={isLoading}
                        />

                        <input
                            type="number"
                            name="minimum_recommended"
                            placeholder="Cantidad mínima *"
                            value={formData.minimum_recommended}
                            onChange={handleChange}
                            required
                            min="1"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            disabled={isLoading}
                        />
                    </div>

                    <input
                        type="text"
                        name="image"
                        placeholder="URL de la imagen"
                        value={formData.image}
                        onChange={handleChange}
                        maxLength={255}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        disabled={isLoading}
                    />

                    <div className="flex gap-4">
                        <select
                            name="type_id"
                            value={formData.type_id}
                            onChange={handleChange}
                            required
                            className="flex-1 border border-gray-300 rounded px-3 py-2"
                            disabled={isLoading}
                        >
                            <option value="">Tipo *</option>
                            {types.map(type => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </select>

                        <select
                            name="location_id"
                            value={formData.location_id}
                            onChange={handleChange}
                            required
                            className="flex-1 border border-gray-300 rounded px-3 py-2"
                            disabled={isLoading}
                        >
                            <option value="">Ubicación *</option>
                            {locations.map(location => (
                                <option key={location.id} value={location.id}>{location.name}</option>
                            ))}
                        </select>
                    </div>
//Todo: enla migration backend no esta nullable, tengo que cambiarlo luego
                    <select
                        name="storage_box_id"
                        value={formData.storage_box_id}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        disabled={isLoading}
                        required
                    >
                        <option value="">Seleccionar caja *</option>
                        {boxes.map(box => (
                            <option key={box.id} value={box.id}>{box.name}</option>
                        ))}
                    </select>

                    <button
                        type="submit"
                        className="w-full bg-[#147CC8] text-white py-2 rounded hover:bg-[#0A3D62] transition disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Guardando...' : 'Guardar'}
                    </button>
                </form>
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
};

export default AddItemForm; 
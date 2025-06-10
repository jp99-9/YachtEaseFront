import React, { useState } from 'react';

const AddItemForm = ({ isOpen, onClose, types, locations, boxes, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        quantity: 1,
        minimum_recommended: 1,
        image: '',
        type_id: '',
        location_id: '',
        storage_box_id: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            name: '',
            description: '',
            quantity: 1,
            minimum_recommended: 1,
            image: '',
            type_id: '',
            location_id: '',
            storage_box_id: ''
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
                    onClick={onClose}
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
                    />

                    <textarea
                        name="description"
                        placeholder="Descripción"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />

                    <div className="flex gap-4">
                        <input
                            type="number"
                            name="quantity"
                            placeholder="Cantidad actual *"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                            min="1"
                            className="flex-1 border border-gray-300 rounded px-3 py-2"
                        />

                        <input
                            type="number"
                            name="minimum_recommended"
                            placeholder="Mínimo recomendado *"
                            value={formData.minimum_recommended}
                            onChange={handleChange}
                            required
                            min="1"
                            className="flex-1 border border-gray-300 rounded px-3 py-2"
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
                    />

                    <div className="flex gap-4">
                        <select
                            name="type_id"
                            value={formData.type_id}
                            onChange={handleChange}
                            required
                            className="flex-1 border border-gray-300 rounded px-3 py-2"
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
                        >
                            <option value="">Ubicación *</option>
                            {locations.map(location => (
                                <option key={location.id} value={location.id}>{location.name}</option>
                            ))}
                        </select>
                    </div>

                    <select
                        name="storage_box_id"
                        value={formData.storage_box_id}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                        <option value="">Seleccionar caja (opcional)</option>
                        {boxes.map(box => (
                            <option key={box.id} value={box.id}>{box.name}</option>
                        ))}
                    </select>

                    <button
                        type="submit"
                        className="w-full bg-[#147CC8] text-white py-2 rounded hover:bg-[#0A3D62] transition"
                    >
                        Guardar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItemForm; 
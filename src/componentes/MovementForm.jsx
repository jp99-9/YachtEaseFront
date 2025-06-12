import React, { useState, useEffect } from 'react';
import { fetchItems } from '../utils/apis';

export function MovementForm({ isOpen, onClose, onSubmit, locations, boxes }) {
    const [formData, setFormData] = useState({
        item_id: '',
        quantity: '',
        reason: '',
        observations: '',
        profile_id: 1, // This should be dynamic based on logged user
        from_location_id: '',
        from_box_id: '',
        to_location_id: '',
        to_box_id: ''
    });

    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [sourceLocation, setSourceLocation] = useState(null);
    const [sourceBox, setSourceBox] = useState(null);

    useEffect(() => {
        const loadItems = async () => {
            try {
                const data = await fetchItems();
                console.log('Loaded Items:', data);
                const itemsArray = Array.isArray(data) ? data : (data.items || []);
                setItems(itemsArray);
            } catch (error) {
                console.error("Error loading items:", error);
            }
        };
        
        if (isOpen) {
            loadItems();
        }
    }, [isOpen]);

    useEffect(() => {
        // When an item is selected, update the from_location_id and from_box_id
        if (selectedItem) {
            console.log('Selected Item:', selectedItem);
            
            // Use storage_box_id instead of box_id
            const locationId = selectedItem.location_id;
            const boxId = selectedItem.storage_box_id;
            
            setFormData(prev => ({
                ...prev,
                from_location_id: locationId,
                from_box_id: boxId
            }));
            
            // Find and set the source location and box
            const location = locations.find(l => l.id === Number(locationId));
            const box = boxes.find(b => b.id === Number(boxId));
            
            // We can also use the nested objects directly if they exist
            const sourceLocation = location || selectedItem.location;
            const sourceBox = box || selectedItem.storage_box;
            
            console.log('Location ID:', locationId);
            console.log('Box ID:', boxId);
            console.log('Source Location:', sourceLocation);
            console.log('Source Box:', sourceBox);
            
            setSourceLocation(sourceLocation);
            setSourceBox(sourceBox);
        } else {
            setSourceLocation(null);
            setSourceBox(null);
        }
    }, [selectedItem, locations, boxes]);

    const handleItemChange = (e) => {
        const itemId = e.target.value;
        setFormData(prev => ({ ...prev, item_id: itemId }));
        const item = items.find(i => i.id === Number(itemId));
        console.log('Selected Item:', item);
        setSelectedItem(item);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate that quantity is not greater than item's current quantity
        if (selectedItem && Number(formData.quantity) > selectedItem.quantity) {
            alert('La cantidad no puede ser mayor que la cantidad disponible del ítem');
            return;
        }

        // Validate that source and destination are different
        if (formData.from_location_id === formData.to_location_id && 
            formData.from_box_id === formData.to_box_id) {
            alert('La ubicación de origen y destino no pueden ser las mismas');
            return;
        }

        try {
            // Convert IDs to numbers before submitting
            const submitData = {
                ...formData,
                item_id: Number(formData.item_id),
                quantity: Number(formData.quantity),
                from_location_id: Number(formData.from_location_id),
                from_box_id: Number(formData.from_box_id),
                to_location_id: Number(formData.to_location_id),
                to_box_id: Number(formData.to_box_id)
            };

            await onSubmit(submitData);
            onClose();
            setFormData({
                item_id: '',
                quantity: '',
                reason: '',
                observations: '',
                profile_id: 1,
                from_location_id: '',
                from_box_id: '',
                to_location_id: '',
                to_box_id: ''
            });
            setSelectedItem(null);
        } catch (error) {
            console.error("Error submitting movement:", error);
            alert(error.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Crear Nuevo Movimiento</h3>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Ítem
                                </label>
                                <select
                                    value={formData.item_id}
                                    onChange={handleItemChange}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                    required
                                >
                                    <option value="">Seleccionar ítem</option>
                                    {items.map(item => (
                                        <option key={item.id} value={item.id}>
                                            {item.name} (Cantidad actual: {item.quantity})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {selectedItem && (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Ubicación Actual
                                            </label>
                                            <input
                                                type="text"
                                                value={sourceLocation?.name || ''}
                                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base text-black border-gray-300 bg-gray-100 sm:text-sm rounded-md"
                                                disabled
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Caja Actual
                                            </label>
                                            <input
                                                type="text"
                                                value={sourceBox?.name || ''}
                                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base text-black border-gray-300 bg-gray-100 sm:text-sm rounded-md"
                                                disabled
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Cantidad
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.quantity}
                                            onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                            required
                                            min="1"
                                            max={selectedItem?.quantity || 1}
                                        />
                                        <p className="mt-1 text-sm text-gray-500">
                                            Cantidad disponible: {selectedItem?.quantity}
                                        </p>
                                    </div>
                                </>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Razón
                                </label>
                                <input
                                    type="text"
                                    value={formData.reason}
                                    onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                    required
                                    placeholder="Ej: Traslado por diversificación"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Observaciones
                                </label>
                                <textarea
                                    value={formData.observations}
                                    onChange={(e) => setFormData(prev => ({ ...prev, observations: e.target.value }))}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                    rows="3"
                                    placeholder="Observaciones adicionales..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Ubicación Destino
                                    </label>
                                    <select
                                        value={formData.to_location_id}
                                        onChange={(e) => setFormData(prev => ({ ...prev, to_location_id: e.target.value }))}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                        required
                                    >
                                        <option value="">Seleccionar ubicación</option>
                                        {locations.map(location => (
                                            <option key={location.id} value={location.id}>
                                                {location.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Caja Destino
                                    </label>
                                    <select
                                        value={formData.to_box_id}
                                        onChange={(e) => setFormData(prev => ({ ...prev, to_box_id: e.target.value }))}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                        required
                                    >
                                        <option value="">Seleccionar caja</option>
                                        {boxes.map(box => (
                                            <option key={box.id} value={box.id}>
                                                {box.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Crear Movimiento
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 
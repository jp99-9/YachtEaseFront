import { useState } from "react"

export function InventoryCard({
    id, name, description, quantity, image, brand, minimum_recomended, type, storage_box, location
}) {
    const [openMore, setOpenMore] = useState(true);

    const handleToggle = () => {
        setOpenMore(!openMore);
    };

    // Example tags, you can replace with real data if available
    const tags = [type?.name, brand, location?.name, storage_box];

    return (
        <div key={id} className="flex items-start bg-white rounded-xl shadow-md p-4 w-full max-w-xl relative">
            {/* Image */}
            <div className="w-20 h-28 rounded-md bg-indigo-800 flex-shrink-0 mr-4">
                <img
                    src={image || "/icons/usuario.png"}
                    alt={name}
                    className="w-full h-full object-cover rounded-md"
                />
            </div>
            {/* Content */}
            <div className="flex-1">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="font-bold text-2xl text-black leading-tight">{name}</h3>
                        <p className="text-gray-400 text-base mt-1">{description || 'subtitle'}</p>
                    </div>
                    {/* Three-dot menu placeholder */}
                    <button className="ml-2 p-1 text-gray-400 hover:text-gray-600">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                            <circle cx="4" cy="10" r="2" />
                            <circle cx="10" cy="10" r="2" />
                            <circle cx="16" cy="10" r="2" />
                        </svg>
                    </button>
                </div>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                    {tags.filter(Boolean).map((tag, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
                {/* Optional: More info toggle */}
                <button onClick={handleToggle} className="text-blue-600 hover:underline text-sm mt-3">
                    {openMore ? "Ver más" : "Ver menos"}
                </button>
                {!openMore && (
                    <div className="mt-2 text-sm text-gray-500">
                        <div>Cantidad: {quantity}</div>
                        <div>Mínimo recomendado: {minimum_recomended}</div>
                    </div>
                )}
            </div>
        </div>
    );
}
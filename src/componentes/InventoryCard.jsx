import { useState } from "react"

export function InventoryCard({
    id ,name, description, quantity, image, brand, minimum_recomended, type, storage_box, location
}) {

    const [openMore, setOpenMore] = useState(true);

    const handleToggle = () => {
        setOpenMore(!openMore);
    };

    return (
        <div key={id} className="rounded-2xl shadow-md overflow-hidden bg-white">
            <img
                src={image || "/icons/usuario.png"}
                alt={name}
                className="w-full h-40 object-cover"
            />
            <div className="p-4 space-y-1">
                <h3 className="font-semibold text-lg text-gray-400">{name}</h3>
                <p className="text-sm text-gray-400">{type.name}</p>
                <p className="text-sm text-gray-500">{location.name}</p>
                <p className="text-sm text-gray-500">{quantity}</p>
                <button onClick={handleToggle} className="text-blue-600 hover:underline text-sm mt-2"> {openMore ? "Ver más" : "Ver menos"}</button>
                
            </div>
        </div>
    )

}
export function ProfileCard({ avatar, id, name, role, onEdit, onDelete }) {
    return (
        <div className="relative group bg-white hover:bg-white/10 border border-white/20 rounded-xl p-10 aspect-square flex flex-col items-center justify-center transition-transform duration-300 hover:scale-125 overflow-hidden">
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onEdit(id);
                    }}
                    className="text-black hover:text-yellow-300"
                >
                    Editar
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onDelete(id);
                    }}
                    className="text-white hover:text-red-400"
                >
                    Borrar
                </button>
            </div>
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-white/10 mb-3">
                <img
                    src={avatar || "/icons/usuario.png"}
                    alt={name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/icons/usuario.png";
                    }}
                />
            </div>
            <p className="text-[#1B2C47] font-medium text-sm sm:text-base">{name}</p>
            {/* Mostrar el rol al hacer hover */}
            {/* <p className="text-sm mt-1 text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {role}
            </p> */}
        </div>
    )
}
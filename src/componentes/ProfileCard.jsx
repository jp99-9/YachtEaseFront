

export function ProfileCard({avatar, id, name}) {
    return (
        <div className="bg-white hover:bg-white/20 border border-white/20 rounded-xl p-4 aspect-square flex flex-col items-center justify-center transition-all duration-300 ease-in-out">
            <img
                src={avatar || "/icons/usuario.png"}
                alt={name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mb-3"
            />
            <p className="text-[#1B2C47] font-medium text-sm sm:text-base">{name}</p>
        </div>
    )
}
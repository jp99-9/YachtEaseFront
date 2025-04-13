

export function ProfileCard({avatar, id, name}) {
    return (
        <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center w-36 sm:w-44">
            <img
                src={avatar || "/icons/usuario.png"}
                alt={name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mb-3"
            />
            <p className="text-[#1B2C47] font-medium text-sm sm:text-base">{name}</p>
        </div>
    )
}
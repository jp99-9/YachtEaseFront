import { useEffect, useState } from "react";
import { fetchProfiles, fetchRoles, fetchCrearPerfil, fetchDeleteProfile } from "../utils/apis";
import { Link } from "react-router-dom";
import { ProfileCard } from "../componentes/ProfileCard";


export function Perfiles() {

    const [perfiles, setPerfiles] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [newProfileName, setNewProfileName] = useState("");
    const [roleId, setRoleId] = useState('');
    const [avatar, setAvatar] = useState('');
    const [roles, setRoles] = useState([]);
    const [mensaje, setMensaje] = useState(null);


    const handleDeleteProfile = async (id) => {
        if (!confirm('¿Estás seguro de que deseas eliminar este perfil?')) return;

        try {
            await fetchDeleteProfile(id);
            // Actualiza la lista de perfiles eliminando el eliminado
            setPerfiles(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            alert('No se pudo eliminar el perfil: ' + error.message);
        }
    };


    async function handleAddProfile(e) {
        e.preventDefault();

        const nuevoPerfil = {
            name: newProfileName,
            role_id: roleId,
            avatar: avatar || null,
        };

        try {
            const data = await fetchCrearPerfil(nuevoPerfil);
            // Actualiza la lista de perfiles para mostrar el nuevo
            setPerfiles(prev => [...prev, data.data.profile]);

            // Limpia el formulario
            setNewProfileName('');
            setRoleId('');
            setAvatar('');
            setShowModal(false);
            setMensaje("Perfil creado correctamente.");
        } catch (error) {
            setMensaje("Hubo un error al crear el perfil.");
            console.error("Error al guardar el perfil:", error);
        }
    }
    useEffect(() => {
        const cargarRoles = async () => {
            const role = await fetchRoles();
            setRoles(role);
        }
        cargarRoles();
    }, []);


    useEffect(() => {
        const cargarPerfiles = async () => {

            try {
                const Getperfiles = await fetchProfiles();
                setPerfiles(Getperfiles);
            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        }
        cargarPerfiles();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-t from-[#0A3D62] to-[#147CC8] flex flex-col items-center justify-center px-4">

            <h1 className="text-white text-2xl sm:text-3xl font-semibold mb-10 text-center">
                CHOOSE YOUR PROFILE
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {loading ? (
                    <p className="text-white text-center col-span-full">Cargando perfiles...</p>
                ) : perfiles.length > 0 ? (
                    <>
                        {perfiles.map((perfil) => (
                            <Link to={`/Dashboard`} key={perfil.id}>
                                <ProfileCard {...perfil}
                                    //role={perfil.role?.name || "Sin rol"}
                                    onEdit={(id) => console.log("Editar perfil con id:", id)}
                                    onDelete={() => handleDeleteProfile(perfil.id)} />
                            </Link>
                        ))}

                        {/* Añadir nuevo perfil */}
                        <button
                            onClick={() => setShowModal(true)}
                            className="group flex flex-col items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-4 aspect-square transition-all duration-300 ease-in-out cursor-pointer"
                        >
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 group-hover:bg-white/30 text-white text-3xl">
                                +
                            </div>
                            <span className="mt-3 text-white font-medium text-center text-sm opacity-70 group-hover:opacity-100">
                                Añadir perfil
                            </span>
                        </button>

                        {showModal && (
                            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                                    <button
                                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
                                        onClick={() => setShowModal(false)}
                                    >
                                        &times;
                                    </button>
                                    <h2 className="text-xl font-semibold mb-4 text-[#1B2C47]">Nuevo Perfil</h2>

                                    <form onSubmit={handleAddProfile}>
                                        {mensaje && <p className="text-lg text-green-700 my-3 ">{mensaje}</p>}
                                        <input
                                            type="text"
                                            placeholder="Nombre del perfil"
                                            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                                            value={newProfileName}
                                            onChange={(e) => setNewProfileName(e.target.value)}
                                            required
                                        />
                                        <select
                                            value={roleId}
                                            onChange={(e) => setRoleId(e.target.value)}
                                            required
                                            className="border p-2 rounded"
                                        >
                                            <option value="">Selecciona un rol</option>
                                            {roles.map(role => (
                                                <option key={role.id} value={role.id}>{role.name}</option>
                                            ))}
                                        </select>

                                        <input
                                            type="text"
                                            placeholder="URL del avatar (opcional)"
                                            value={avatar}
                                            onChange={(e) => setAvatar(e.target.value)}
                                            className="ml-5 border p-2 rounded"
                                        />
                                        {/* Puedes añadir selector de avatar, etc. */}
                                        <button
                                            type="submit"
                                            className="w-full bg-[#147CC8] text-white py-2 mt-4 rounded hover:bg-[#0A3D62] transition"
                                        >
                                            Crear
                                        </button>


                                    </form>
                                </div>
                            </div>
                        )}

                    </>

                ) : (
                    <p className="text-white text-center col-span-full">No hay perfiles en este barco. Añade uno.</p>
                )}
            </div>
        </div>
    );

}
import { useEffect, useState } from "react";
import { fetchProfiles } from "../utils/apis";
import { Link } from "react-router-dom";
import { ProfileCard } from "../componentes/ProfileCard";


export function Perfiles() {

    const [perfiles, setPerfiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarPerfiles = async () => {

            try {
                const Getperfiles = await fetchProfiles();
                console.log(Getperfiles);
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
                    <p className="text-white text-center">Cargando perfiles...</p>
                ) : perfiles.length > 0 ? (
                    perfiles.map((perfil) => {
                        return (
                            <Link to={`/Dashboard`} key={perfil.id}>
                                <ProfileCard {...perfil}
                                />
                            </Link>);

                    })
                ) : (
                    <p className="text-white text-center">No hay perfiles en este barco. Añade uno.</p>
                )}

            </div>
        </div>
    );
}
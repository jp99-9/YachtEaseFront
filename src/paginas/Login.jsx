import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLogin } from "../utils/apis";


export function Login() {

    const [seePassword, setSeePassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [redirecting, setRedirecting] = useState(false);
    const [formValues, setFormValues] = useState({   //estado que recibe los parametros necesarios del formulario
        unique_code: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => { //manejamos el cambio de valores de los inputs.
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    };

    function handleClick() {
        setSeePassword(!seePassword);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const data = await fetchLogin(formValues);

            if (data?.token) {
                setSuccess(true);
                //setUsuario(data.user);  // Almacena el usuario en el estado global
                localStorage.setItem('boat', JSON.stringify(data.boat));  // userData contiene la información del usuario

                localStorage.setItem("token", data.token);  // Guarda el token

                // Redirigir después de 2 segundos
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                throw new Error("No se recibió un token de acceso válido.");
            }


        } catch (error) {
            setError("errorMessage");

        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="w-full min-h-screen bg-[#0A3D62] flex flex-col items-center justify-center p-6">

            <h1 className="text-4xl md:text-4xl font-medium text-[#F5F5F5] mb-10">Inicia sesión en YachtEase</h1>

            {success && <p className="text-green-900">Inicio de sesion exitoso</p>}
            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
                {/* Identificación */}
                <div>
                    <label className="block text-[#F5F5F5] text-left ml-4 mb-2">Identificación</label>
                    <input
                        type="text"
                        placeholder="Ingresa tu identificación"
                        id="unique_code"
                        name="unique_code"
                        className="w-full  p-4 rounded-lg bg-[#315A89] text-[#F5F5F5]  placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-[#A3A3A3]" onChange={handleChange} value={formValues.unique_code} required
                    />
                </div>

                {/* Contraseña */}
                <div>
                    <label className="block text-[#F5F5F5] text-left ml-4 mb-2">Contraseña</label>
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Ingresa tu contraseña"
                            id="password"
                            name="password"
                            className="w-full p-4 rounded-lg bg-[#315A89] text-[#F5F5F5]  placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-[#A3A3A3]" onChange={handleChange} value={formValues.password} required
                        />
                        <div className="absolute inset-y-0 right-4 flex items-center text-white cursor-pointer">
                            <span onClick={handleClick} className={`${seePassword ? "unsee" : "see"} w-6 h-6 block`} />
                        </div>
                    </div>
                    <p className="text-right text-sm text-white mt-2 cursor-pointer hover:text-gray-500">
                        ¿Has olvidado tu contraseña?
                    </p>
                </div>

                {/* Botón */}
                <button
                    type="submit"
                    className="w-full bg-[#B6DCF8] text-[#1E3A5F] font-medium py-4 rounded-lg hover:bg-blue-400 transition"
                >
                    Iniciar Sesión
                </button>
            </form>
        </div>
    );
}

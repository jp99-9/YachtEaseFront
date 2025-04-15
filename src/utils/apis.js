const BASE_URL = 'http://127.0.0.1:8000/api/';


export async function fetchLogin(credentials) {
    try {


        const response = await fetch(`${BASE_URL}login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        console.log("Response status:", response.status); // Verifica el código de estado

        // Verifica si la respuesta es exitosa
        if (!response.ok) {
            const errorData = await response.json().catch(() => null);

            throw new Error(errorData?.message || "Error en la solicitud al servidor");
        }

        // Procesa la respuesta JSON
        const responseData = await response.json();


        if (responseData.token) {
            localStorage.setItem("token", responseData.token);
        } else {
            throw new Error("El token no fue recibido correctamente");
        }

        return responseData;
    } catch (error) {
        console.error("Error en fetchLogin:", error.message);
        throw new Error("No se pudo conectar con el servidor: " + error.message);
    }



}

export async function fetchLogout() {
    try {
        const token = localStorage.getItem("token"); // Recuperar el token

        if (!token) {
            throw new Error("No hay token disponible");
        }

        const response = await fetch(`${BASE_URL}logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, // Asegurar que se envía el token
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error en la solicitud de logout: ${errorText}`);
        }

        return response.json(); // Retornar la respuesta JSON
    } catch (error) {
        throw new Error("No se pudo conectar con el servidor: " + error.message);
    }
}

export async function fetchProfiles() {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${BASE_URL}profiles`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const res = await response.json();
        return res.data;

    } catch (error) {
        throw new Error(error.message);
    }
}
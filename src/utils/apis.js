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

export async function fetchRoles() {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${BASE_URL}roles`, {
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

export async function fetchItems(filters = {}) {
    const token = localStorage.getItem("token");

    const queryParams = new URLSearchParams(filters).toString();

    const res = await fetch(`${BASE_URL}items?${queryParams}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!res.ok) {
        const errRes = await response.json();
        throw new Error(errRes.message || 'Error al obtener ítems');
    }

    const json = await res.json();
    return json.data;
}


export async function fetchTypes() {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}types`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    const json = await res.json();
    return json.data;
}

export async function fetchLocations() {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}locations`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    const json = await res.json();
    return json.data;
}


export async function fetchBoxes() {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}boxes`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    const json = await res.json();
    return json.data;
}

export async function fetchLocationItems(locationId) {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}locations/${locationId}/items`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) throw new Error("Error al cargar los ítems de la localización");
    return await res.json();
};


export async function fetchMovements() {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}movements`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("Error al cargar movimientos");
    }
    const json = await response.json();
    return json.data;
}

export async function fetchCrearPerfil(data) {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}profiles`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,

        },
        body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok || !json?.data?.profile) {
        console.error("Respuesta inesperada del servidor:", json);
        throw new Error('Respuesta inesperada del servidor');
    }

    return json;

};

export async function fetchDeleteProfile(profileId) {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}profiles/${profileId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,

        },
    });
    if (!res.ok) {
        const text = await res.text(); // ← evita error si la respuesta no es JSON
        throw new Error(`Error ${response.status}: ${text}`);
    }
    return await res.json();
}
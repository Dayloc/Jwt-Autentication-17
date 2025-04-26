const Url_Base= "https://effective-meme-wrr6wgrxq7qrhg74-3001.app.github.dev/"


export const GetAllUsers = async (dispatch) => {
    try {
        const response = await fetch(`${Url_Base}/api/users`)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        dispatch({ type: 'set_users', payload: data });
        return data;
      
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error; // Rethrow the error to handle it in the calling function
      
    }
}
// Fetch para crear usuario (signup)
export const SignupUser = async (email, password, dispatch) => {
    try {
        const response = await fetch(`${Url_Base}/api/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg || 'Error al registrar usuario');
        }

        const data = await response.json();
        
        // Guardar el token en localStorage
        localStorage.setItem('token', data.access_token);
        
        // Opcional: Dispatch para actualizar el estado global (ej: Redux)
        if (dispatch) {
            dispatch({ type: 'login_success', payload: data });
        }
        
        return data;
    } catch (error) {
        console.error("Error en SignupUser:", error.message);
        throw error;
    }
};

// Fetch para login (opcional, pero útil)
export const LoginUser = async (email, password, dispatch) => {
    try {
        const response = await fetch(`${Url_Base}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg || 'Credenciales incorrectas');
        }

        const data = await response.json();
        
        // Guardar el token en localStorage
        localStorage.setItem('token', data.access_token);
        
        // Opcional: Dispatch para actualizar el estado global
        if (dispatch) {
            dispatch({ type: 'login_success', payload: data });
        }
        
        return data;
    } catch (error) {
        console.error("Error en LoginUser:", error.message);
        throw error;
    }
};

// Fetch para obtener datos de usuario (protegido)
export const GetPrivateData = async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        
        if (!token) {
            throw new Error('No hay token disponible');
        }

        const response = await fetch(`${Url_Base}/api/private`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Acceso no autorizado');
        }

        const data = await response.json();
        
        if (dispatch) {
            dispatch({ type: 'set_private_data', payload: data });
        }
        
        return data;
    } catch (error) {
        console.error("Error en GetPrivateData:", error.message);
        throw error;
    }
};
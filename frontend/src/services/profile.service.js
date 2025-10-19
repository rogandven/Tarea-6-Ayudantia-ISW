import axios from './root.service.js';

export async function getProfile() {
    try {
        const response = await axios.get('/profile/private');
        return response.data;
    } catch (error) {
        return error.response?.data || { message: 'Error al obtener perfil' };
    }
}

export async function editProfile(data) {
    try {
        const { email, password } = data;
        const response = await axios.patch('/profile/private', {"email": email, "password": password});
        return (response.data || response);
    } 
    catch (error) {
        // console.log(error);
        return error.response?.data || { message: 'Error al conectar con el servidor' };
    }
}

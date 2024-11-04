import axios from 'axios';

const API_URL = 'http://192.168.217.71:5000/api/auth';

export const loggingUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Error en el servidor');
    } else if (error.request) {
      throw new Error('No se recibió respuesta del servidor.');
    } else {
      throw new Error('Error de configuración de la solicitud');
    }
  }
};

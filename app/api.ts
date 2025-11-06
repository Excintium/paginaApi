import axios from 'axios';

// Esta es la URL base de tu API NestJS
const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
});

export default apiClient;
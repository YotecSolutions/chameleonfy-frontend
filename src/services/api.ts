import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getRecommendation = async (text: string, genre: string, decade: string) => {
    const response = await api.post('/recommendation', { text, genre, decade });
    return response.data;
};

export default api;

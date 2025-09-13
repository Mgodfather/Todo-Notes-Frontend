import axios from 'axios';

const api = axios.create({
  // baseURL: import.meta.env.VITE_API_BASE_URL,
  // baseURL:'https://admin.gymjaao.com',
  baseURL: 'http://localhost:5000/api',
});

export async function apiRequest({ method, url, data = null, headers = {} }) {
  try {
    const response = await api({
      method,
      url,
      data,
      headers,
    });
    return response;
  } catch (error) {
    throw error;
  }
}


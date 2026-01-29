import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  register: async (data: { name: string; email: string; password: string }) => {
    const response = await apiClient.post('/auth/register', data);
    if (response.data.token) {
      Cookies.set('token', response.data.token, { expires: 7 });
    }
    return response.data;
  },
  
  login: async (data: { email: string; password: string }) => {
    const response = await apiClient.post('/auth/login', data);
    if (response.data.token) {
      Cookies.set('token', response.data.token, { expires: 7 });
    }
    return response.data;
  },
  
  getProfile: async () => {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  },
  
  updateProfile: async (data: any) => {
    const response = await apiClient.put('/auth/profile', data);
    return response.data;
  },
  
  logout: () => {
    Cookies.remove('token');
  },
};

// Deal APIs
export const dealAPI = {
  getAllDeals: async (filters?: {
    category?: string;
    search?: string;
    accessLevel?: string;
  }) => {
    const response = await apiClient.get('/deals', { params: filters });
    return response.data;
  },
  
  getDealById: async (id: string) => {
    const response = await apiClient.get(`/deals/${id}`);
    return response.data;
  },
};

// Claim APIs
export const claimAPI = {
  claimDeal: async (dealId: string) => {
    const response = await apiClient.post('/claims', { dealId });
    return response.data;
  },
  
  getUserClaims: async () => {
    const response = await apiClient.get('/claims/user/claims');
    return response.data;
  },
  
  getClaimStatus: async (dealId: string) => {
    const response = await apiClient.get(`/claims/status/${dealId}`);
    return response.data;
  },
  
  getClaimById: async (id: string) => {
    const response = await apiClient.get(`/claims/${id}`);
    return response.data;
  },
};

export default apiClient;

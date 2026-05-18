import api from './api';
import type { RegisterCredentials, AuthResponse, LoginCredentials } from '../types/user.types';

export const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await api.post('/auth/signup', credentials);
    return response.data;
};

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/auth/signin', credentials);
    return response.data;
};
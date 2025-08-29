import axios, { AxiosResponse, AxiosError } from 'axios';
import { API_CONFIG } from '../index';
import { TokenManager } from './tokenManager';
import {
    AuthResponse,
    LoginRequest,
    RegisterRequest,
    ApiError
} from '../types/types';

const api = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

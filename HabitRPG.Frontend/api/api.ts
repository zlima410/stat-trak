import axios, { AxiosResponse, AxiosError } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_CONFIG } from '../index'

const api = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});
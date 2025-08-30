import { Platform } from 'react-native';

export const STORAGE_KEYS = {
    AUTH_TOKEN: 'habitrpg_auth_token',
    USER_PREFERENCES: 'habitrpg_user_prefs',
} as const;

const isDevelopment = () => {
    return (
        __DEV__ ||
        process.env.NODE_ENV === 'development' ||
        process.env.EXPO_PUBLIC_ENV === 'development'
    );
};

const getApiUrl = () => {
    if (isDevelopment()) {
        const localIP = process.env.ENV_PUBLIC_LOCAL_IP;

        let apiUrl;
        if (Platform.OS === 'ios')
            apiUrl = process.env.EXPO_PUBLIC_API_URL_DEV_IP;
        else
            apiUrl = process.env.EXPO_PUBLIC_API_URL_DEV_IP || `http://${localIP}:5139/api`;
        return apiUrl;
    } else {
        return process.env.EXPO_PUBLIC_API_URL_PROD;
    }
};

export const API_CONFIG = {
    BASE_URL: getApiUrl(),
    TIMEOUT: 10000,
};
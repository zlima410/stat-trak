import { registerRootComponent } from 'expo';
import { Platform } from 'react-native';

import App from './App';

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
            apiUrl = process.env.EXPO_PUBLIC_API_URL_DEV;
        else
            apiUrl = process.env.EXPO_PUBLIC_API_URL_DEV_IP || `http://${localIP}:5139/api`;
    } else {
        return process.env.EXPO_PUBLIC_API_URL_PROD;
    }
};

export const API_CONFIG = {
    BASE_URL: getApiUrl(),
    TIMEOUT: 10000,
};
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

import { registerRootComponent } from 'expo';
import { Platform } from 'react-native';

import App from './App';

export const STORAGE_KEYS = {
    AUTH_TOKEN: 'habitrpg_auth_token',
    USER_PREFERENCES: 'habitrpg_user_prefs',
} as const;

const getApiUrl = () => {
    if (__DEV__) {
        return Platform.OS === 'ios'
            ? 'http://localhost:5139/api'
            : 'http://10.0.0.154:5139/api';
    } else {
        return 'https://habitrpg.zlima.dev/api';
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

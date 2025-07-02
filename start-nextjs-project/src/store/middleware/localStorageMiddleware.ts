import { Middleware } from '@reduxjs/toolkit';

// Временен тип за state до дефиниране на финалния RootState
interface TempRootState {
  auth: {
    token: string | null;
    [key: string]: any;
  };
}

/**
 * Middleware за управление на localStorage операции
 * Слуша за auth actions и синхронизира localStorage със state
 */
export const localStorageMiddleware: Middleware<{}, TempRootState> = (store) => (next) => (action) => {
  // Първо изпълни action-а
  const result = next(action);
  
  // След това провери дали трябва да обновим localStorage
  const state = store.getState();
  
  // Type guard за action
  if (typeof action === 'object' && action !== null && 'type' in action) {
    switch ((action as any).type) {
      case 'auth/setToken':
      case 'auth/handleGoogleCallbackAction/fulfilled':
        // Запази token в localStorage когато се задава
        if (state.auth.token) {
          try {
            localStorage.setItem('authToken', state.auth.token);
          } catch (error) {
            console.warn('Failed to save token to localStorage:', error);
          }
        }
        break;
        
      case 'auth/clearAuth':
      case 'auth/logoutAction/fulfilled':
      case 'auth/logoutAction/rejected':
        // Премахни token от localStorage при logout или clear
        try {
          localStorage.removeItem('authToken');
        } catch (error) {
          console.warn('Failed to remove token from localStorage:', error);
        }
        break;
        
      default:
        // Не правим нищо за другите actions
        break;
    }
  }
  
  return result;
};

/**
 * Utility функция за инициализиране на auth state от localStorage
 * Използва се при стартиране на приложението
 */
export const initializeAuthFromStorage = () => {
  if (typeof window === 'undefined') {
    // Server-side rendering - няма localStorage
    return { token: null, isAuthenticated: false };
  }
  
  try {
    const token = localStorage.getItem('authToken');
    return {
      token,
      isAuthenticated: Boolean(token)
    };
  } catch (error) {
    console.warn('Failed to read token from localStorage:', error);
    return { token: null, isAuthenticated: false };
  }
};
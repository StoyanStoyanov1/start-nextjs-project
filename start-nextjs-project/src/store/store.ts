import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { localStorageMiddleware } from './middleware/localStorageMiddleware';

// Създаваме store-а без цикличен референс
const storeConfig = {
    reducer: {
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware: any) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }).concat(localStorageMiddleware),
};

export const store = configureStore(storeConfig);

// След като store-а е създаден, можем да извлечем типовете
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

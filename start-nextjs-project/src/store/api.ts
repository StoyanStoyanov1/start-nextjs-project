// src/store/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/backend',
        prepareHeaders: (headers, { getState }) => {
            headers.set('content-type', 'application/json')
            return headers
        },
    }),
    tagTypes: ['User', 'Auth'],
    endpoints: (builder) => ({
        getGoogleAuthUrl: builder.query<{ authorization_url: string }, string[]>({
            query: (scopes) => ({
                url: '/auth/google/authorize',
                params: { scopes }
            }),
        }),

        googleCallback: builder.query<any, { code: string; state: string }>({
            query: (params) => ({
                url: '/auth/google/callback',
                params
            }),
        }),

        getProfile: builder.query<any, void>({
            query: () => '/profile',
            providesTags: ['User'],
        }),
    }),
})

export const {
    useLazyGetGoogleAuthUrlQuery,
    useLazyGoogleCallbackQuery,
    useGetProfileQuery
} = api
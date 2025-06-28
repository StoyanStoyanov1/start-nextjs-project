import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
        prepareHeaders: (headers, { getState }) => {
            headers.set('content-type', 'application/json')
            return headers
        },
    }),
    tagTypes: ['User', 'Auth'],
    endpoints: (builder) => ({
        // Google OAuth endpoints
        getGoogleAuthUrl: builder.query<{ authorization_url: string }, string[]>({
            query: (scopes) => ({
                url: '/auth/google/authorize',
                params: { scopes }
            }),
        }),

        googleCallback: builder.mutation<string, { code: string; state: string }>({
            query: (params) => ({
                url: '/auth/google/callback',
                method: 'POST',
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
    useGetGoogleAuthUrlQuery,
    useGoogleCallbackMutation,
    useGetProfileQuery
} = api
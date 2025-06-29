export const Urls = {
    auth: {
        googleAuthorize: '/auth/google/authorize',
        googleCallback: '/auth/google/callback',
        profile: '/auth/profile',
        logout: '/auth/logout',
    },
    user: {
        profile: '/user/profile',
        updateProfile: '/user/profile',
    }
} as const;
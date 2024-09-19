'use server'

import {cookies} from "next/headers";

export const setToken = async (token: { access: string, refresh: string }) => {
    cookies().set('access_token', token.access, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60,
        path: '/'
    })

    cookies().set('refresh_token', token.refresh, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/'
    })
}
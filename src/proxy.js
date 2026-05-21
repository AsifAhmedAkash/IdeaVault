import { auth } from '@/app/lib/auth';
import { NextResponse } from 'next/server';

export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: request.headers
    });

    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/addidea', '/myideas', '/myinteraction', '/profile/:path*'],
};
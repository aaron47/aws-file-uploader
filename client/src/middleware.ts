import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isTokenExpired } from './app/util/is-token-expired';

export function middleware(request: NextRequest) {
	// Get the authentication cookie
	const token = cookies().get('Authentication')?.value;

	// If the user is on the login page and has a cookie, redirect to home
	if (request.nextUrl.pathname.startsWith('/login')) {
		if (token && !isTokenExpired(token)) {
			return NextResponse.redirect(new URL('/', request.url));
		}
		return NextResponse.next();
	}

	// For all other pages, if no token exists, redirect to login
	if (!token || isTokenExpired(token)) {
		const loginUrl = new URL('/login', request.url);
		return NextResponse.redirect(loginUrl);
	}

	// Continue to the requested page if the user is authenticated
	return NextResponse.next();
}

// Apply middleware to every page except the API routes (if any)
export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|/login).*)'], // Matches all routes except login and API routes],
};

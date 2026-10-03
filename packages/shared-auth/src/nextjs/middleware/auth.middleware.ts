import { NextResponse, type NextRequest } from 'next/server';
import { AUTH_COOKIE_NAMES } from '../utils/cookie-names';

export interface AuthMiddlewareOptions {
  readonly publicPaths?: readonly string[];
  readonly loginPath?: string;
}

/**
 * Framework-agnostic auth middleware for Next.js.
 * Returns a NextResponse (redirect or next).
 */
export function authMiddleware(
  req: NextRequest,
  options: AuthMiddlewareOptions = {}
): NextResponse {
  const { publicPaths = ['/login', '/register', '/forgot-password'], loginPath = '/login' } =
    options;

  const { pathname } = req.nextUrl;
  const isPublic = publicPaths.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  const hasSession = Boolean(req.cookies.get(AUTH_COOKIE_NAMES.sessionId)?.value);

  if (!hasSession && !isPublic) {
    const url = req.nextUrl.clone();
    url.pathname = loginPath;
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }
  if (hasSession && isPublic && pathname === loginPath) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    url.search = '';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export interface AuthCookieOptions {
  readonly httpOnly: boolean;
  readonly secure: boolean;
  readonly sameSite: 'strict' | 'lax' | 'none';
  readonly path: string;
  readonly maxAge?: number;
}

export const ACCESS_COOKIE_OPTIONS: AuthCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
  maxAge: 60 * 15,
};

export const REFRESH_COOKIE_OPTIONS: AuthCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  path: '/',
  maxAge: 60 * 60 * 24 * 7,
};

export const CSRF_COOKIE_OPTIONS: AuthCookieOptions = {
  httpOnly: false, // readable by JS for double-submit
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  path: '/',
};

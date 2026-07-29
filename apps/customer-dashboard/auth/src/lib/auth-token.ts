/**
 * Auth Token Storage
 * Manages authentication tokens in localStorage
 */

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'auth_refresh_token';
const USER_KEY = 'auth_user';

/**
 * Get the current authentication token
 */
export function getToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Get the current refresh token
 */
export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

/**
 * Set authentication tokens
 */
export function setToken(token: string, refreshToken?: string): void {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.setItem(TOKEN_KEY, token);
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
}

/**
 * Remove authentication tokens
 */
export function removeToken(): void {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

/**
 * Get the current user from storage
 */
export function getUser(): Record<string, unknown> | null {
  if (typeof window === 'undefined') {
    return null;
  }
  const userStr = localStorage.getItem(USER_KEY);
  if (!userStr) {
    return null;
  }
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

/**
 * Set the current user in storage
 */
export function setUser(user: Record<string, unknown>): void {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getToken();
}

/**
 * Clear all auth data
 */
export function clearAuth(): void {
  removeToken();
}

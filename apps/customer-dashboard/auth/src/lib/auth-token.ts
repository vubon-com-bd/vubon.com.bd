/**
 * Auth Token Storage for Customer App
 * Manages authentication tokens in localStorage
 */

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'auth_refresh_token';
const USER_KEY = 'auth_user';

/**
 * Get the access token from localStorage
 * @returns Token string or null if not found
 */
export function getToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

/**
 * Get the refresh token from localStorage
 * @returns Refresh token string or null if not found
 */
export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  } catch {
    return null;
  }
}

/**
 * Set tokens and user data in localStorage
 * @param token - Access token
 * @param refreshToken - Refresh token (optional)
 * @param user - User data (optional)
 */
export function setTokens(
  token: string,
  refreshToken?: string | null,
  user?: Record<string, unknown> | null,
): void {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    localStorage.setItem(TOKEN_KEY, token);
    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  } catch (error) {
    console.error('Failed to set tokens:', error);
  }
}

/**
 * Remove all auth data from localStorage
 */
export function removeTokens(): void {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error('Failed to remove tokens:', error);
  }
}

/**
 * Check if user is authenticated
 * @returns boolean indicating if token exists
 */
export function isAuthenticated(): boolean {
  return !!getToken();
}

/**
 * Get stored user data
 * @returns User object or null if not found
 */
export function getUser(): Record<string, unknown> | null {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    const userStr = localStorage.getItem(USER_KEY);
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  } catch {
    return null;
  }
}

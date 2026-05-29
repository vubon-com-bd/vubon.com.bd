/**
 * Token Storage - Secure token storage abstraction
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-auth/src/client/token-storage
 *
 * RULES:
 * ✅ ONLY token storage abstraction - NO business logic
 * ✅ NO console.log(token), insecure persistence, secret hardcoding
 * ✅ Multiple storage strategies (cookies, memory, localStorage)
 * ✅ Secure cookie options (httpOnly not available client-side)
 * ✅ Singleton pattern for consistent storage
 * ✅ TypeScript strict
 */

import Cookies from 'js-cookie';
import { env } from '@vubon/shared-config/env';

// ==================== Types ====================

export interface TokenStorageConfig {
  accessTokenKey: string;
  refreshTokenKey: string;
  cookieOptions?: Cookies.CookieAttributes;
  useCookies?: boolean;
  useMemory?: boolean;
  useLocalStorage?: boolean;
  localStoragePrefix?: string;
  /** অটো-সিঙ্ক সক্রিয় কিনা (storage events across tabs) */
  enableCrossTabSync?: boolean;
  /** টোকেনের আগে কত সেকেন্ডে রিফ্রেশ করবে (ডিফল্ট: env থেকে) */
  refreshBufferSeconds?: number;
}

// ডিফল্ট কনফিগ (এনভায়রনমেন্ট অ্যাওয়ার)
const getDefaultCookieSecure = (): boolean => {
  // প্রোডাকশনে secure cookie বাধ্যতামূলক
  if (env.NODE_ENV === 'production') return true;
  // ডেভেলপমেন্টে HTTP-তেও কাজ করবে
  return typeof window !== 'undefined' ? window.location.protocol === 'https:' : false;
};

const getDefaultCookieSameSite = (): 'strict' | 'lax' | 'none' => {
  // প্রোডাকশনে strict, ডেভেলপমেন্টে lax
  return env.NODE_ENV === 'production' ? 'strict' : 'lax';
};

export const DEFAULT_TOKEN_CONFIG: TokenStorageConfig = {
  accessTokenKey: 'access_token',
  refreshTokenKey: 'refresh_token',
  cookieOptions: {
    secure: getDefaultCookieSecure(),
    sameSite: getDefaultCookieSameSite(),
    path: '/',
    expires: 7, // 7 days
  },
  useCookies: true,
  useMemory: false,
  useLocalStorage: false,
  localStoragePrefix: 'vubon_',
  enableCrossTabSync: true,
  refreshBufferSeconds: env.TOKEN_REFRESH_BUFFER_SECONDS ? Number(env.TOKEN_REFRESH_BUFFER_SECONDS) : 60,
};

// ==================== Storage Implementations ====================

class MemoryStorage {
  private storage: Map<string, string> = new Map();

  set(key: string, value: string): void {
    this.storage.set(key, value);
  }

  get(key: string): string | null {
    return this.storage.get(key) || null;
  }

  remove(key: string): void {
    this.storage.delete(key);
  }

  clear(): void {
    this.storage.clear();
  }

  has(key: string): boolean {
    return this.storage.has(key);
  }

  getAll(): Record<string, string> {
    return Object.fromEntries(this.storage.entries());
  }
}

class LocalStorageWrapper {
  private prefix: string;

  constructor(prefix: string = 'vubon_') {
    this.prefix = prefix;
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  set(key: string, value: string): void {
    try {
      localStorage.setItem(this.getKey(key), value);
    } catch (error) {
      // সাইলেন্ট ফেইল – localStorage ব্লক থাকতে পারে (private browsing)
      if (env.NODE_ENV === 'development') {
        console.warn('Failed to save to localStorage:', error);
      }
    }
  }

  get(key: string): string | null {
    try {
      return localStorage.getItem(this.getKey(key));
    } catch {
      return null;
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(this.getKey(key));
    } catch (error) {
      if (env.NODE_ENV === 'development') {
        console.warn('Failed to remove from localStorage:', error);
      }
    }
  }

  clear(): void {
    try {
      Object.keys(localStorage)
        .filter((key) => key.startsWith(this.prefix))
        .forEach((key) => localStorage.removeItem(key));
    } catch (error) {
      if (env.NODE_ENV === 'development') {
        console.warn('Failed to clear localStorage:', error);
      }
    }
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }
}

const memoryStore = new MemoryStorage();
let localStorageWrapper: LocalStorageWrapper | null = null;

const getLocalStorageWrapper = (prefix: string): LocalStorageWrapper => {
  if (!localStorageWrapper) {
    localStorageWrapper = new LocalStorageWrapper(prefix);
  }
  return localStorageWrapper;
};

// ==================== Cross-Tab Sync ====================

const TOKEN_UPDATE_EVENT = 'vubon:token-update';
const TOKEN_CLEAR_EVENT = 'vubon:token-clear';

/**
 * Cross-tab storage synchronization event handler
 */
const emitTokenUpdate = (accessToken: string, refreshToken: string): void => {
  if (typeof window === 'undefined') return;
  
  try {
    window.dispatchEvent(new CustomEvent(TOKEN_UPDATE_EVENT, { 
      detail: { accessToken, refreshToken, timestamp: Date.now() } 
    }));
  } catch {
    // Event may not be supported in some environments
  }
};

const emitTokenClear = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    window.dispatchEvent(new CustomEvent(TOKEN_CLEAR_EVENT, { detail: { timestamp: Date.now() } }));
  } catch {
    // Event may not be supported in some environments
  }
};

// ==================== Token Storage ====================

export class TokenStorage {
  private config: TokenStorageConfig;
  private localStorage: LocalStorageWrapper | null = null;
  private crossTabListeners: Array<() => void> = [];
  private isInitialized = false;

  constructor(config: Partial<TokenStorageConfig> = {}) {
    this.config = { ...DEFAULT_TOKEN_CONFIG, ...config };
    
    if (this.config.useLocalStorage && typeof window !== 'undefined') {
      this.localStorage = getLocalStorageWrapper(this.config.localStoragePrefix || 'vubon_');
    }
    
    this.setupCrossTabSync();
  }

  /**
   * Setup cross-tab storage synchronization
   */
  private setupCrossTabSync(): void {
    if (!this.config.enableCrossTabSync || typeof window === 'undefined') return;
    
    const handleTokenUpdate = (event: CustomEvent): void => {
      const { accessToken, refreshToken } = event.detail;
      // অন্য ট্যাবে টোকেন সেট করা হলে, এখানে স্টোরেজ আপডেট করুন
      if (accessToken && refreshToken) {
        // মেমরি স্টোরেজ আপডেট করুন (কুকি ইতিমধ্যে আপডেট হয়ে থাকবে)
        memoryStore.set(this.config.accessTokenKey, accessToken);
        memoryStore.set(this.config.refreshTokenKey, refreshToken);
      }
    };
    
    const handleTokenClear = (): void => {
      memoryStore.remove(this.config.accessTokenKey);
      memoryStore.remove(this.config.refreshTokenKey);
    };
    
    window.addEventListener(TOKEN_UPDATE_EVENT, handleTokenUpdate as EventListener);
    window.addEventListener(TOKEN_CLEAR_EVENT, handleTokenClear as EventListener);
    
    this.crossTabListeners.push(() => {
      window.removeEventListener(TOKEN_UPDATE_EVENT, handleTokenUpdate as EventListener);
      window.removeEventListener(TOKEN_CLEAR_EVENT, handleTokenClear as EventListener);
    });
  }

  /**
   * Initialize storage (load from cookies to memory if needed)
   */
  initialize(): void {
    if (this.isInitialized) return;
    
    // Sync cookies to memory for faster access
    if (this.config.useCookies && this.config.useMemory) {
      const accessToken = this.getAccessTokenFromCookies();
      const refreshToken = this.getRefreshTokenFromCookies();
      if (accessToken && refreshToken) {
        memoryStore.set(this.config.accessTokenKey, accessToken);
        memoryStore.set(this.config.refreshTokenKey, refreshToken);
      }
    }
    
    this.isInitialized = true;
  }

  /**
   * Get access token from cookies only (without priority logic)
   */
  private getAccessTokenFromCookies(): string | null {
    if (!this.config.useCookies) return null;
    return Cookies.get(this.config.accessTokenKey) || null;
  }

  /**
   * Get refresh token from cookies only (without priority logic)
   */
  private getRefreshTokenFromCookies(): string | null {
    if (!this.config.useCookies) return null;
    return Cookies.get(this.config.refreshTokenKey) || null;
  }

  /**
   * Set tokens (access + refresh)
   */
  setTokens(accessToken: string, refreshToken: string): void {
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
    
    // Cross-tab sync
    if (this.config.enableCrossTabSync) {
      emitTokenUpdate(accessToken, refreshToken);
    }
  }

  /**
   * Set access token
   */
  setAccessToken(token: string): void {
    if (!token) return;
    
    if (this.config.useCookies) {
      Cookies.set(this.config.accessTokenKey, token, this.config.cookieOptions);
    }
    if (this.config.useMemory) {
      memoryStore.set(this.config.accessTokenKey, token);
    }
    if (this.config.useLocalStorage && this.localStorage) {
      this.localStorage.set(this.config.accessTokenKey, token);
    }
  }

  /**
   * Set refresh token
   */
  setRefreshToken(token: string): void {
    if (!token) return;
    
    if (this.config.useCookies) {
      Cookies.set(this.config.refreshTokenKey, token, this.config.cookieOptions);
    }
    if (this.config.useMemory) {
      memoryStore.set(this.config.refreshTokenKey, token);
    }
    if (this.config.useLocalStorage && this.localStorage) {
      this.localStorage.set(this.config.refreshTokenKey, token);
    }
  }

  /**
   * Get access token with priority order
   */
  getAccessToken(): string | null {
    // Priority: cookies (secure) > localStorage > memory
    if (this.config.useCookies) {
      const token = Cookies.get(this.config.accessTokenKey);
      if (token) return token;
    }
    if (this.config.useLocalStorage && this.localStorage) {
      const token = this.localStorage.get(this.config.accessTokenKey);
      if (token) return token;
    }
    if (this.config.useMemory) {
      return memoryStore.get(this.config.accessTokenKey);
    }
    return null;
  }

  /**
   * Get refresh token with priority order
   */
  getRefreshToken(): string | null {
    if (this.config.useCookies) {
      const token = Cookies.get(this.config.refreshTokenKey);
      if (token) return token;
    }
    if (this.config.useLocalStorage && this.localStorage) {
      const token = this.localStorage.get(this.config.refreshTokenKey);
      if (token) return token;
    }
    if (this.config.useMemory) {
      return memoryStore.get(this.config.refreshTokenKey);
    }
    return null;
  }

  /**
   * Get token expiry from access token (without verification)
   */
  getAccessTokenExpiry(): number | null {
    const token = this.getAccessToken();
    if (!token) return null;
    
    try {
      const payload = token.split('.')[1];
      if (!payload) return null;
      const decoded = JSON.parse(atob(payload));
      return decoded.exp || null;
    } catch {
      return null;
    }
  }

  /**
   * Check if token needs refresh (expiring soon)
   */
  isTokenExpiringSoon(): boolean {
    const expiry = this.getAccessTokenExpiry();
    if (!expiry) return true;
    
    const now = Math.floor(Date.now() / 1000);
    const buffer = this.config.refreshBufferSeconds || 60;
    return expiry - now < buffer;
  }

  /**
   * Clear all tokens
   */
  clearTokens(): void {
    if (this.config.useCookies) {
      Cookies.remove(this.config.accessTokenKey, { path: '/' });
      Cookies.remove(this.config.refreshTokenKey, { path: '/' });
    }
    if (this.config.useMemory) {
      memoryStore.remove(this.config.accessTokenKey);
      memoryStore.remove(this.config.refreshTokenKey);
    }
    if (this.config.useLocalStorage && this.localStorage) {
      this.localStorage.remove(this.config.accessTokenKey);
      this.localStorage.remove(this.config.refreshTokenKey);
    }
    
    if (this.config.enableCrossTabSync) {
      emitTokenClear();
    }
  }

  /**
   * Check if tokens exist
   */
  hasTokens(): boolean {
    return this.getAccessToken() !== null && this.getRefreshToken() !== null;
  }

  /**
   * Check if access token exists
   */
  hasAccessToken(): boolean {
    return this.getAccessToken() !== null;
  }

  /**
   * Check if refresh token exists
   */
  hasRefreshToken(): boolean {
    return this.getRefreshToken() !== null;
  }

  /**
   * Update storage configuration (for runtime changes)
   */
  updateConfig(config: Partial<TokenStorageConfig>): void {
    this.config = { ...this.config, ...config };
    
    if (this.config.useLocalStorage && !this.localStorage && typeof window !== 'undefined') {
      this.localStorage = getLocalStorageWrapper(this.config.localStoragePrefix || 'vubon_');
    }
  }

  /**
   * Get current configuration (readonly)
   */
  getConfig(): Readonly<TokenStorageConfig> {
    return { ...this.config };
  }

  /**
   * Sync tokens from one storage to another (e.g., cookie to memory)
   */
  syncToMemory(): void {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();
    
    if (accessToken && refreshToken) {
      memoryStore.set(this.config.accessTokenKey, accessToken);
      memoryStore.set(this.config.refreshTokenKey, refreshToken);
    }
  }

  /**
   * Sync all storage types (keep in sync)
   */
  syncAll(): void {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();
    
    if (accessToken && refreshToken) {
      this.setTokens(accessToken, refreshToken);
    }
  }

  /**
   * Clear all storage types
   */
  clearAll(): void {
    this.clearTokens();
    memoryStore.clear();
    if (this.localStorage) {
      this.localStorage.clear();
    }
  }

  /**
   * Destroy storage (clean up listeners)
   */
  destroy(): void {
    this.crossTabListeners.forEach(cleanup => cleanup());
    this.crossTabListeners = [];
    this.isInitialized = false;
  }
}

// ==================== Singleton ====================

let tokenStorageInstance: TokenStorage | null = null;

export const createTokenStorage = (config?: Partial<TokenStorageConfig>): TokenStorage => {
  if (tokenStorageInstance) {
    tokenStorageInstance.destroy();
  }
  tokenStorageInstance = new TokenStorage(config);
  return tokenStorageInstance;
};

export const getTokenStorage = (): TokenStorage | null => {
  return tokenStorageInstance;
};

export const resetTokenStorage = (): void => {
  if (tokenStorageInstance) {
    tokenStorageInstance.destroy();
    tokenStorageInstance = null;
  }
};

// ==================== Helper Functions ====================

/**
 * Check if token storage is available (browser environment)
 */
export const isTokenStorageAvailable = (): boolean => {
  return typeof window !== 'undefined';
};

/**
 * Get default storage config for production (secure)
 */
export const getSecureTokenConfig = (): TokenStorageConfig => ({
  ...DEFAULT_TOKEN_CONFIG,
  cookieOptions: {
    ...DEFAULT_TOKEN_CONFIG.cookieOptions,
    secure: true,
    sameSite: 'strict',
  },
  useLocalStorage: false,
  useMemory: false,
  useCookies: true,
});

/**
 * Get default storage config for development
 */
export const getDevelopmentTokenConfig = (): TokenStorageConfig => ({
  ...DEFAULT_TOKEN_CONFIG,
  cookieOptions: {
    ...DEFAULT_TOKEN_CONFIG.cookieOptions,
    secure: false,
    sameSite: 'lax',
  },
  useLocalStorage: true,
  useMemory: true,
  useCookies: true,
});

/**
 * Check if token is expired
 */
export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = token.split('.')[1];
    if (!payload) return true;
    const decoded = JSON.parse(atob(payload));
    if (!decoded.exp) return false;
    return Date.now() >= decoded.exp * 1000;
  } catch {
    return true;
  }
};

// ==================== Type Exports ====================

export type { TokenStorageConfig };

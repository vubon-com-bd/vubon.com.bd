import type { TokenStorage } from './token-storage.types';

/**
 * In-memory access-token storage.
 * Default and recommended implementation.
 * XSS-safe — token never touches disk.
 */
export class MemoryTokenStorage implements TokenStorage {
  private accessToken: string | null = null;

  getAccessToken(): string | null {
    return this.accessToken;
  }

  setAccessToken(token: string | null): void {
    this.accessToken = token;
  }

  clear(): void {
    this.accessToken = null;
  }
}

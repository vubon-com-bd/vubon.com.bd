import { CookieTokenStorage } from './cookie-token-storage';
import { MemoryTokenStorage } from './memory-token-storage';
import type { TokenStorage } from './token-storage.types';

export type TokenStorageKind = 'memory' | 'cookie';

let singleton: TokenStorage | null = null;

export function createTokenStorage(kind: TokenStorageKind = 'memory'): TokenStorage {
  if (singleton) return singleton;
  singleton = kind === 'cookie' ? new CookieTokenStorage() : new MemoryTokenStorage();
  return singleton;
}

/** Default shared instance (memory-based). */
export const tokenStorage: TokenStorage = createTokenStorage('memory');

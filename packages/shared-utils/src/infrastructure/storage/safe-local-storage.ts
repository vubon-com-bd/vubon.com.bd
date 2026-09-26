/**
 * SSR-safe localStorage wrapper with JSON serialization
 * @module shared-utils/infrastructure/storage
 */
import { isStorageAvailable } from './is-storage-available';

function getStorage(): Storage | null {
  if (!isStorageAvailable('localStorage')) return null;
  return globalThis.localStorage;
}

export function getLocalStorage<T = unknown>(key: string): T | null {
  const storage = getStorage();
  if (!storage) return null;

  try {
    const raw = storage.getItem(key);
    if (raw === null) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function setLocalStorage<T>(key: string, value: T): boolean {
  const storage = getStorage();
  if (!storage) return false;

  try {
    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    // Quota exceeded or JSON stringify failed
    return false;
  }
}

export function removeLocalStorage(key: string): boolean {
  const storage = getStorage();
  if (!storage) return false;

  try {
    storage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export function clearLocalStorage(): boolean {
  const storage = getStorage();
  if (!storage) return false;

  try {
    storage.clear();
    return true;
  } catch {
    return false;
  }
}

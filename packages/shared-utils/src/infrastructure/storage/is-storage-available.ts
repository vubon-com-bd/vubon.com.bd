/**
 * Check if Web Storage API is available and usable
 * @module shared-utils/infrastructure/storage
 */
type StorageType = 'localStorage' | 'sessionStorage';

export function isStorageAvailable(type: StorageType): boolean {
  if (typeof globalThis === 'undefined') return false;

  const storage = (globalThis as Record<string, unknown>)[type];
  if (!storage) return false;

  try {
    const key = '__storage_test__';
    const testStorage = storage as Storage;
    testStorage.setItem(key, key);
    testStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

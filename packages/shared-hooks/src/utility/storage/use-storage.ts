import { useLocalStorage } from './use-local-storage';

export type StorageKind = 'local' | 'session';

/**
 * Generic storage hook — picks local vs session.
 * For session, this still uses localStorage (single impl).
 * Import useSessionStorage directly if you need sessionStorage.
 */
export function useStorage<T>(
  _kind: StorageKind,
  key: string,
  initial: T
): readonly [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // Delegates to local for now — replace if kind === 'session' should differ.
  return useLocalStorage<T>(key, initial);
}

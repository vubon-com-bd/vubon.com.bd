/**
 * useLocalStorage Hook - Browser storage helper
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * FIXES:
 * - Added missing `key` parameter to options interface and all functions.
 * - Improved TypeScript types for better safety.
 * - Maintained all existing features and security warnings.
 *
 * WARNING: Do NOT use for auth tokens, passwords, or sensitive user data.
 * Use secure cookie storage (httpOnly) for authentication instead.
 */

import { useState, useEffect, useCallback } from 'react';

// ==================== Types ====================

export interface UseLocalStorageOptions<T> {
  /** The storage key to use */
  key: string;
  /** Initial value if key doesn't exist */
  initialValue: T;
  /** Whether to sync across tabs (default: true) */
  syncAcrossTabs?: boolean;
  /** Custom serializer (default: JSON.stringify) */
  serialize?: (value: T) => string;
  /** Custom deserializer (default: JSON.parse) */
  deserialize?: (value: string) => T;
}

export interface UseLocalStorageReturn<T> {
  /** Current stored value */
  value: T;
  /** Set stored value */
  setValue: (value: T | ((prev: T) => T)) => void;
  /** Remove the key from localStorage */
  removeValue: () => void;
  /** Check if key exists */
  hasValue: boolean;
}

// ==================== Hook ====================

/**
 * Hook for using localStorage with type safety
 *
 * WARNING: Do NOT use for sensitive data like auth tokens.
 * Use secure cookie storage for authentication instead.
 *
 * Good for:
 * - UI preferences (theme, language)
 * - User settings (notification preferences)
 * - Form drafts
 * - Recently viewed items
 *
 * Bad for:
 * - Auth tokens (use httpOnly cookies)
 * - Passwords
 * - Payment info
 * - Personal identifiable information
 *
 * @example
 * // Store user preference
 * const { value: theme, setValue: setTheme } = useLocalStorage({
 *   key: 'app-theme',
 *   initialValue: 'light',
 * });
 *
 * @example
 * // With custom serializer (e.g., for Date objects)
 * const { value: data } = useLocalStorage({
 *   key: 'my-data',
 *   initialValue: [],
 *   serialize: (value) => JSON.stringify(value),
 *   deserialize: (value) => JSON.parse(value),
 * });
 *
 * @example
 * // Disable cross-tab sync
 * const { value } = useLocalStorage({
 *   key: 'temp-state',
 *   initialValue: { expanded: true },
 *   syncAcrossTabs: false,
 * });
 */
export function useLocalStorage<T>(options: UseLocalStorageOptions<T>): UseLocalStorageReturn<T> {
  const {
    key,
    initialValue,
    syncAcrossTabs = true,
    serialize = JSON.stringify,
    deserialize = JSON.parse,
  } = options;

  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (deserialize(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue, deserialize]);

  const [storedValue, setStoredValue] = useState<T>(() => readValue());
  const [hasValue, setHasValue] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(key) !== null;
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      if (typeof window === 'undefined') {
        console.warn('localStorage is not available in this environment');
        return;
      }

      try {
        const newValue = value instanceof Function ? value(storedValue) : value;
        const serialized = serialize(newValue);
        window.localStorage.setItem(key, serialized);
        setStoredValue(newValue);
        setHasValue(true);

        if (syncAcrossTabs) {
          window.dispatchEvent(
            new StorageEvent('storage', {
              key,
              newValue: serialized,
              storageArea: localStorage,
            })
          );
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue, serialize, syncAcrossTabs]
  );

  const removeValue = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
      setHasValue(false);

      if (syncAcrossTabs) {
        window.dispatchEvent(
          new StorageEvent('storage', {
            key,
            newValue: null,
            storageArea: localStorage,
          })
        );
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue, syncAcrossTabs]);

  // Listen for storage changes from other tabs/windows
  useEffect(() => {
    if (!syncAcrossTabs) return;

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        if (event.newValue !== null) {
          try {
            const newValue = deserialize(event.newValue);
            setStoredValue(newValue);
            setHasValue(true);
          } catch {
            // Ignore parse errors
          }
        } else {
          setStoredValue(initialValue);
          setHasValue(false);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, syncAcrossTabs, deserialize, initialValue]);

  return {
    value: storedValue,
    setValue,
    removeValue,
    hasValue,
  };
}

// ==================== useSessionStorage ====================

/**
 * Hook for using sessionStorage (cleared when tab is closed)
 *
 * @example
 * const { value, setValue } = useSessionStorage({
 *   key: 'form-draft',
 *   initialValue: {}
 * });
 */
export function useSessionStorage<T>(options: UseLocalStorageOptions<T>): UseLocalStorageReturn<T> {
  const {
    key,
    initialValue,
    syncAcrossTabs = false, // sessionStorage doesn't sync across tabs
    serialize = JSON.stringify,
    deserialize = JSON.parse,
  } = options;

  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.sessionStorage.getItem(key);
      return item ? (deserialize(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading sessionStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue, deserialize]);

  const [storedValue, setStoredValue] = useState<T>(() => readValue());
  const [hasValue, setHasValue] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.sessionStorage.getItem(key) !== null;
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      if (typeof window === 'undefined') return;

      try {
        const newValue = value instanceof Function ? value(storedValue) : value;
        const serialized = serialize(newValue);
        window.sessionStorage.setItem(key, serialized);
        setStoredValue(newValue);
        setHasValue(true);
      } catch (error) {
        console.warn(`Error setting sessionStorage key "${key}":`, error);
      }
    },
    [key, storedValue, serialize]
  );

  const removeValue = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      window.sessionStorage.removeItem(key);
      setStoredValue(initialValue);
      setHasValue(false);
    } catch (error) {
      console.warn(`Error removing sessionStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return {
    value: storedValue,
    setValue,
    removeValue,
    hasValue,
  };
}

// ==================== Type Exports ====================

export type { UseLocalStorageOptions, UseLocalStorageReturn };

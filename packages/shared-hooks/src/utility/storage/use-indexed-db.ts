import { useCallback, useState } from 'react';

export interface IndexedDbState<T> {
  readonly value: T | null;
  readonly loading: boolean;
  readonly error: Error | null;
  readonly save: (value: T) => Promise<void>;
  readonly remove: () => Promise<void>;
}

function openDb(dbName: string, storeName: string): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(dbName, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error('IndexedDB open failed'));
  });
}

/**
 * Simple IndexedDB key-value hook.
 * For advanced usage, integrate `idb` library.
 */
export function useIndexedDB<T>(dbName: string, storeName: string, key: string): IndexedDbState<T> {
  const [value, setValue] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const save = useCallback(
    async (next: T) => {
      setLoading(true);
      setError(null);
      try {
        const db = await openDb(dbName, storeName);
        await new Promise<void>((resolve, reject) => {
          const tx = db.transaction(storeName, 'readwrite');
          tx.objectStore(storeName).put(next, key);
          tx.oncomplete = () => resolve();
          tx.onerror = () => reject(tx.error ?? new Error('IndexedDB write failed'));
        });
        setValue(next);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    },
    [dbName, storeName, key]
  );

  const remove = useCallback(async () => {
    setLoading(true);
    try {
      const db = await openDb(dbName, storeName);
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(storeName, 'readwrite');
        tx.objectStore(storeName).delete(key);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error ?? new Error('IndexedDB delete failed'));
      });
      setValue(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [dbName, storeName, key]);

  return { value, loading, error, save, remove };
}

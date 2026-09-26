import { useCallback, useState } from 'react';

export interface ImportState<T> {
  readonly data: readonly T[];
  readonly loading: boolean;
  readonly error: Error | null;
  readonly importCsv: (file: File) => Promise<readonly T[]>;
  readonly reset: () => void;
}

function parseCsv(text: string): readonly Record<string, string>[] {
  const lines = text
    .replace(/\r\n/g, '\n')
    .split('\n')
    .filter((l) => l.length > 0);
  if (lines.length === 0) return [];
  const headers = lines[0]?.split(',') ?? [];
  return lines.slice(1).map((line) => {
    const values = line.split(',');
    const row: Record<string, string> = {};
    headers.forEach((h, i) => {
      row[h.trim()] = (values[i] ?? '').trim();
    });
    return row;
  });
}

export function useImport<T = Record<string, string>>(): ImportState<T> {
  const [data, setData] = useState<readonly T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const importCsv = useCallback(async (file: File): Promise<readonly T[]> => {
    setLoading(true);
    setError(null);
    try {
      const text = await file.text();
      const rows = parseCsv(text) as unknown as readonly T[];
      setData(rows);
      return rows;
    } catch (err) {
      const e = err instanceof Error ? err : new Error('CSV import failed');
      setError(e);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData([]);
    setError(null);
  }, []);

  return { data, loading, error, importCsv, reset };
}

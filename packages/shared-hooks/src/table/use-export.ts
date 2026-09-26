import { useCallback, useState } from 'react';

export interface ExportOptions {
  readonly filename: string;
  readonly mimeType?: string;
}

export function useExport(): {
  readonly loading: boolean;
  readonly error: Error | null;
  readonly exportCsv: (rows: readonly Record<string, unknown>[], options: ExportOptions) => void;
  readonly exportJson: (data: unknown, options: ExportOptions) => void;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const download = useCallback((content: string, options: ExportOptions) => {
    if (typeof document === 'undefined') return;
    const blob = new Blob([content], {
      type: options.mimeType ?? 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = options.filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, []);

  const exportCsv = useCallback(
    (rows: readonly Record<string, unknown>[], options: ExportOptions) => {
      setLoading(true);
      setError(null);
      try {
        if (rows.length === 0) {
          download('', { ...options, mimeType: 'text/csv;charset=utf-8' });
          return;
        }
        const headers = Object.keys(rows[0] ?? {});
        const escape = (v: unknown): string => {
          const s = v === null || v === undefined ? '' : String(v);
          return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
        };
        const lines = [
          headers.join(','),
          ...rows.map((r) => headers.map((h) => escape(r[h])).join(',')),
        ];
        download(lines.join('\n'), {
          ...options,
          mimeType: 'text/csv;charset=utf-8',
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('CSV export failed'));
      } finally {
        setLoading(false);
      }
    },
    [download]
  );

  const exportJson = useCallback(
    (data: unknown, options: ExportOptions) => {
      setLoading(true);
      setError(null);
      try {
        download(JSON.stringify(data, null, 2), {
          ...options,
          mimeType: 'application/json',
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('JSON export failed'));
      } finally {
        setLoading(false);
      }
    },
    [download]
  );

  return { loading, error, exportCsv, exportJson };
}

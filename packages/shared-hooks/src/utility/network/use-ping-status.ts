import { useEffect, useRef, useState } from 'react';

export interface PingStatus {
  readonly latencyMs: number | null;
  readonly ok: boolean;
}

/**
 * Injectable ping function.
 * Pass one built on `shared-api`'s `httpClient` — never use `fetch` directly.
 *
 * Example:
 *   import { httpClient } from '@vubon/shared-api/common';
 *   const ping = (url) => httpClient.request({ method: 'HEAD', url });
 */
export type PingFn = (url: string, signal: AbortSignal) => Promise<void>;

/**
 * Pings a URL every `intervalMs` and reports latency.
 * ⚠️ Rule-compliant: the ping implementation is injected by the caller.
 */
export function usePingStatus(
  url: string,
  pingFn: PingFn,
  intervalMs = 30_000,
  enabled = true
): PingStatus {
  const [status, setStatus] = useState<PingStatus>({ latencyMs: null, ok: true });
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    let timer: ReturnType<typeof setTimeout>;
    let controller = new AbortController();

    const ping = async (): Promise<void> => {
      controller.abort();
      controller = new AbortController();
      const start = Date.now();
      try {
        await pingFn(url, controller.signal);
        if (mounted.current) {
          setStatus({ latencyMs: Date.now() - start, ok: true });
        }
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return;
        if (mounted.current) setStatus({ latencyMs: null, ok: false });
      }
      if (mounted.current) timer = setTimeout(ping, intervalMs);
    };

    void ping();
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [url, intervalMs, enabled, pingFn]);

  return status;
}

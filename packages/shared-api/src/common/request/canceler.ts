/**
 * Create a combined abort signal from an optional external signal
 * plus an internal timeout. Returns `signal` + `cleanup`.
 */
export function createCancelableSignal(
  external?: AbortSignal,
  timeoutMs?: number
): { signal: AbortSignal; cleanup: () => void } {
  const controller = new AbortController();
  let timer: ReturnType<typeof setTimeout> | undefined;

  if (timeoutMs !== undefined) {
    timer = setTimeout(() => controller.abort(), timeoutMs);
  }

  if (external) {
    if (external.aborted) controller.abort();
    else
      external.addEventListener('abort', () => controller.abort(), {
        once: true,
      });
  }

  const cleanup = (): void => {
    if (timer !== undefined) clearTimeout(timer);
  };

  return { signal: controller.signal, cleanup };
}

/**
 * Extract the business payload from an envelope.
 * Many APIs wrap data: { data: ..., meta: ... }.
 * This handles both wrapped and unwrapped shapes.
 */
export function parseEnvelope<T>(raw: unknown): T {
  if (raw && typeof raw === 'object' && 'data' in (raw as Record<string, unknown>)) {
    return (raw as { data: T }).data;
  }
  return raw as T;
}

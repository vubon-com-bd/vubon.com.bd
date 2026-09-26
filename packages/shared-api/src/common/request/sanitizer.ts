const SENSITIVE_KEYS = new Set([
  'password',
  'passwordHash',
  'token',
  'accessToken',
  'refreshToken',
  'authorization',
  'secret',
  'apiKey',
  'cardNumber',
  'cvv',
  'ssn',
]);

/** Deep-redact sensitive fields for logging. */
export function redact<T>(value: T): T {
  return redactInternal(value) as T;
}

function redactInternal(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(redactInternal);
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = SENSITIVE_KEYS.has(k) ? '[REDACTED]' : redactInternal(v);
    }
    return out;
  }
  return value;
}

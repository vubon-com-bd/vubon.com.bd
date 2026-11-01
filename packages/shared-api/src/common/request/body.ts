/** True if the method typically carries a request body. */
export function methodHasBody(method: string): boolean {
  const m = method.toUpperCase();
  return m === 'POST' || m === 'PUT' || m === 'PATCH' || m === 'DELETE';
}

/** Ensure GET/HEAD never carries a body. */
export function stripBodyForGet(method: string, body: unknown): unknown {
  const m = method.toUpperCase();
  if (m === 'GET' || m === 'HEAD') return undefined;
  return body;
}

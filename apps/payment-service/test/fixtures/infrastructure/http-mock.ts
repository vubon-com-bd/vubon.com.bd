/**
 * HTTP Mock — global fetch replacement for gateway client tests
 * @module payment-service/test/fixtures/infrastructure
 */
import { jest } from '@jest/globals';

export interface MockFetchResponse {
  readonly ok: boolean;
  readonly status: number;
  readonly body: unknown;
}

/**
 * Create a fake Response object (only the parts our clients use).
 */
export function mockResponse(status: number, body: unknown): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: jest.fn(async () => body),
    text: jest.fn(async () => JSON.stringify(body)),
  } as unknown as Response;
}

/**
 * Install a global fetch mock that resolves with one response (or a queue of responses).
 */
export function installFetchMock(
  responses: readonly MockFetchResponse[] | MockFetchResponse,
): jest.Mock {
  const queue = Array.isArray(responses) ? [...responses] : [responses];
  const fetchMock = jest.fn(async () => {
    const r = queue.shift();
    if (!r) throw new Error('No more mocked fetch responses');
    return mockResponse(r.status, r.body);
  });
  globalThis.fetch = fetchMock as unknown as typeof fetch;
  return fetchMock;
}

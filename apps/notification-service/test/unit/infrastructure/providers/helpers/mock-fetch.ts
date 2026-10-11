/**
 * Shared fetch mock helper for provider unit tests
 * @module notification-service/test/unit/infrastructure/providers/helpers
 */
import { jest } from '@jest/globals';

export interface MockResponseInit {
  readonly status?: number;
  readonly body?: unknown;
  readonly headers?: Record<string, string>;
  readonly throwError?: Error;
  readonly delayMs?: number;
}

let originalFetch: typeof globalThis.fetch | null = null;

export function setupFetchMock(): void {
  originalFetch = globalThis.fetch;
  globalThis.fetch = jest.fn() as unknown as typeof globalThis.fetch;
}

export function teardownFetchMock(): void {
  if (originalFetch) {
    globalThis.fetch = originalFetch;
    originalFetch = null;
  }
}

export function mockFetchOnce(init: MockResponseInit): void {
  const responseInit = init;

  (globalThis.fetch as jest.Mock).mockImplementationOnce(async () => {
    if (init.delayMs) {
      await new Promise((r) => setTimeout(r, init.delayMs));
    }
    if (responseInit.throwError) {
      throw responseInit.throwError;
    }

    const bodyText =
      typeof responseInit.body === 'string'
        ? responseInit.body
        : JSON.stringify(responseInit.body ?? null);

    return new Response(bodyText, {
      status: responseInit.status ?? 200,
      headers: {
        'Content-Type': 'application/json',
        ...(responseInit.headers ?? {}),
      },
    });
  });
}

export function getFetchCalls(): readonly {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: string;
}[] {
  const mock = globalThis.fetch as unknown as jest.Mock;
  return mock.mock.calls.map((call) => {
    const [url, options] = call as [string, RequestInit | undefined];
    return {
      url,
      method: options?.method ?? 'GET',
      headers: (options?.headers as Record<string, string>) ?? {},
      body: options?.body as string | undefined,
    };
  });
}

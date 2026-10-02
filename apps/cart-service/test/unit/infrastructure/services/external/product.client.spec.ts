import { jest } from '@jest/globals';

/**
 * ProductClient — Unit Tests (fetch mocked)
 */
import { ProductClient } from '../../../../../src/module/infrastructure/services/external/product.client.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function mockFetch(status: number, body: unknown): void {
  (global as unknown as { fetch: jest.Mock }).fetch = jest.fn(() =>
    Promise.resolve({
      ok: status >= 200 && status < 300,
      status,
      json: () => Promise.resolve(body),
    } as Response),
  ) as jest.Mock;
}

describe('ProductClient', () => {
  let originalFetch: typeof fetch;

  beforeAll(() => {
    originalFetch = global.fetch;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    (global as unknown as { fetch: typeof fetch }).fetch = originalFetch;
  });

  describe('getProduct()', () => {
    it('returns product on 200', async () => {
      mockFetch(200, { id: UUID, sku: 'SKU', name: 'X', price: 100, currency: 'BDT', stock: 5, available: true });
      const client = new ProductClient();
      const r = await client.getProduct(UUID);
      expect(r?.id).toBe(UUID);
    });

    it('returns null on 404', async () => {
      mockFetch(404, {});
      const client = new ProductClient();
      const r = await client.getProduct(UUID);
      expect(r).toBeNull();
    });

    it('returns null on network error', async () => {
      (global as unknown as { fetch: jest.Mock }).fetch = jest.fn(() =>
        Promise.reject(new Error('network')),
      ) as jest.Mock;
      const client = new ProductClient();
      const r = await client.getProduct(UUID);
      expect(r).toBeNull();
    });
  });

  describe('getProducts()', () => {
    it('returns empty for empty input', async () => {
      const client = new ProductClient();
      expect(await client.getProducts([])).toEqual([]);
    });

    it('fetches multiple products', async () => {
      mockFetch(200, [{ id: UUID, sku: 'A', name: 'A', price: 100, currency: 'BDT', stock: 5, available: true }]);
      const client = new ProductClient();
      const r = await client.getProducts([UUID]);
      expect(r.length).toBe(1);
    });
  });

  describe('getStock()', () => {
    it('returns stock number', async () => {
      mockFetch(200, { stock: 42 });
      const client = new ProductClient();
      const r = await client.getStock(UUID);
      expect(r).toBe(42);
    });

    it('returns 0 on error', async () => {
      mockFetch(500, {});
      const client = new ProductClient();
      expect(await client.getStock(UUID)).toBe(0);
    });
  });
});

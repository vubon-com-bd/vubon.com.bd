import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { ProductClient } from '@infrastructure/services/external/product.client';

describe('ProductClient', () => {
  let client: ProductClient;
  let originalFetch: typeof global.fetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    client = new ProductClient();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('getById returns product', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 'prod-1', name: 'Item', price: 100 }),
    } as Response);

    const result = await client.getById('prod-1');
    expect(result?.id).toBe('prod-1');
    expect(result?.price).toBe(100);
  });

  it('getById returns null on 404', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
    } as Response);
    expect(await client.getById('missing')).toBeNull();
  });

  it('getByIds returns empty for empty input', async () => {
    const result = await client.getByIds([]);
    expect(result).toEqual([]);
  });

  it('getByIds fetches batch', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        { id: 'prod-1' },
        { id: 'prod-2' },
      ],
    } as Response);

    const result = await client.getByIds(['prod-1', 'prod-2']);
    expect(result.length).toBe(2);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/batch'),
      expect.objectContaining({ method: 'POST' }),
    );
  });

  it('getByIds returns empty on error', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('down'));
    const result = await client.getByIds(['prod-1']);
    expect(result).toEqual([]);
  });
});

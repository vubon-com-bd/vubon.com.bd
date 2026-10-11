/**
 * External HTTP clients — real HTTP test server (no module mocking)
 */
import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import { createServer, type Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { UserServiceClient } from '../../../../../src/module/infrastructure/services/external/user-service.client.js';
import { OrderServiceClient } from '../../../../../src/module/infrastructure/services/external/order-service.client.js';
import { ProductServiceClient } from '../../../../../src/module/infrastructure/services/external/product-service.client.js';
import { VendorServiceClient } from '../../../../../src/module/infrastructure/services/external/vendor-service.client.js';
import { PaymentServiceClient } from '../../../../../src/module/infrastructure/services/external/payment-service.client.js';
import { AnalyticsCollectorService } from '../../../../../src/module/infrastructure/services/external/analytics-collector.service.js';

let server: Server;
let baseUrl: string;

beforeAll(async () => {
  server = createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const url = req.url ?? '';
    if (url.endsWith('/contact') && url.includes('/users/')) {
      res.end(JSON.stringify({ id: 'u', email: 'x@y.com' }));
      return;
    }
    if (url.includes('/users/contacts')) {
      res.end(JSON.stringify({ items: [{ id: 'u', email: 'x@y.com' }] }));
      return;
    }
    if (url.endsWith('/preferences')) {
      res.end(JSON.stringify({ email: true }));
      return;
    }
    if (url.includes('/orders/')) {
      res.end(JSON.stringify({ id: 'o', orderNumber: 'ORD-1', total: 100, currency: 'BDT' }));
      return;
    }
    if (url.includes('/products/')) {
      res.end(JSON.stringify({ id: 'p', name: 'Product', price: 100 }));
      return;
    }
    if (url.includes('/vendors/')) {
      res.end(JSON.stringify({ id: 'v', displayName: 'Vendor', email: 'v@y.com' }));
      return;
    }
    if (url.includes('/payments/')) {
      res.end(JSON.stringify({ id: 'pay', orderId: 'o', status: 'captured', amount: 100 }));
      return;
    }
    res.statusCode = 404;
    res.end('{}');
  });
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', () => resolve()));
  const port = (server.address() as AddressInfo).port;
  baseUrl = `http://127.0.0.1:${port}`;
});

afterAll(() => {
  server.close();
});

beforeEach(() => {
  process.env['USER_SERVICE_URL'] = baseUrl;
  process.env['ORDER_SERVICE_URL'] = baseUrl;
  process.env['PRODUCT_SERVICE_URL'] = baseUrl;
  process.env['VENDOR_SERVICE_URL'] = baseUrl;
  process.env['PAYMENT_SERVICE_URL'] = baseUrl;
});

describe('UserServiceClient', () => {
  it('isEnabled when URL configured', () => {
    expect(new UserServiceClient().isEnabled()).toBe(true);
  });

  it('getContact success', async () => {
    const r = await new UserServiceClient().getContact('u');
    expect(r?.email).toBe('x@y.com');
  });

  it('getContact returns null on network error', async () => {
    process.env['USER_SERVICE_URL'] = 'http://127.0.0.1:1';
    const r = await new UserServiceClient().getContact('u');
    expect(r).toBeNull();
  });

  it('getManyContacts empty', async () => {
    const r = await new UserServiceClient().getManyContacts([]);
    expect(r).toEqual([]);
  });

  it('getManyContacts success', async () => {
    const r = await new UserServiceClient().getManyContacts(['u']);
    expect(r.length).toBe(1);
  });

  it('getManyContacts error → empty', async () => {
    process.env['USER_SERVICE_URL'] = 'http://127.0.0.1:1';
    const r = await new UserServiceClient().getManyContacts(['u']);
    expect(r).toEqual([]);
  });

  it('getPreferences success', async () => {
    const r = await new UserServiceClient().getPreferences('u');
    expect(r).toBeDefined();
  });

  it('disabled when env missing', async () => {
    delete process.env['USER_SERVICE_URL'];
    const c = new UserServiceClient();
    expect(c.isEnabled()).toBe(false);
    expect(await c.getContact('u')).toBeNull();
  });
});

describe('OrderServiceClient', () => {
  it('getOrder success', async () => {
    const r = await new OrderServiceClient().getOrder('o');
    expect(r?.orderNumber).toBe('ORD-1');
  });

  it('getOrder null on error', async () => {
    process.env['ORDER_SERVICE_URL'] = 'http://127.0.0.1:1';
    const r = await new OrderServiceClient().getOrder('o');
    expect(r).toBeNull();
  });

  it('getOrderSummaryForNotification success', async () => {
    const r = await new OrderServiceClient().getOrderSummaryForNotification('o');
    expect(r?.orderNumber).toBe('ORD-1');
    expect(r?.total).toBe('100 BDT');
  });

  it('getOrderSummaryForNotification null when order missing', async () => {
    process.env['ORDER_SERVICE_URL'] = 'http://127.0.0.1:1';
    const r = await new OrderServiceClient().getOrderSummaryForNotification('o');
    expect(r).toBeNull();
  });
});

describe('ProductServiceClient', () => {
  it('getProduct success', async () => {
    const r = await new ProductServiceClient().getProduct('p');
    expect(r?.name).toBe('Product');
  });

  it('getProduct error', async () => {
    process.env['PRODUCT_SERVICE_URL'] = 'http://127.0.0.1:1';
    const r = await new ProductServiceClient().getProduct('p');
    expect(r).toBeNull();
  });
});

describe('VendorServiceClient', () => {
  it('getContact success', async () => {
    const r = await new VendorServiceClient().getContact('v');
    expect(r?.displayName).toBe('Vendor');
  });

  it('getContact error', async () => {
    process.env['VENDOR_SERVICE_URL'] = 'http://127.0.0.1:1';
    const r = await new VendorServiceClient().getContact('v');
    expect(r).toBeNull();
  });
});

describe('PaymentServiceClient', () => {
  it('getPayment success', async () => {
    const r = await new PaymentServiceClient().getPayment('pay');
    expect(r?.status).toBe('captured');
  });

  it('getPayment error', async () => {
    process.env['PAYMENT_SERVICE_URL'] = 'http://127.0.0.1:1';
    const r = await new PaymentServiceClient().getPayment('pay');
    expect(r).toBeNull();
  });
});

describe('AnalyticsCollectorService', () => {
  it('track does not throw', async () => {
    await expect(new AnalyticsCollectorService().track('order.created', { k: 'v' })).resolves.toBeUndefined();
  });
  it('track without properties', async () => {
    await expect(new AnalyticsCollectorService().track('order.created')).resolves.toBeUndefined();
  });
  it('identify does not throw', async () => {
    await expect(new AnalyticsCollectorService().identify('u', { plan: 'pro' })).resolves.toBeUndefined();
  });
  it('identify without traits', async () => {
    await expect(new AnalyticsCollectorService().identify('u')).resolves.toBeUndefined();
  });
});

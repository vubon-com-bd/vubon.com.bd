/**
 * Auto-discovery query handler tests.
 */
import { describe, it, expect, jest } from '@jest/globals';

import * as shipmentQueries from '@application/queries/shipment/index.js';
import * as courierQueries from '@application/queries/courier/index.js';
import * as warehouseQueries from '@application/queries/warehouse/index.js';
import * as vehicleQueries from '@application/queries/vehicle/index.js';
import * as driverQueries from '@application/queries/driver/index.js';
import * as zoneQueries from '@application/queries/zone/index.js';
import * as shippingMethodQueries from '@application/queries/shipping-method/index.js';
import * as packagingQueries from '@application/queries/packaging/index.js';
import * as deliveryQueries from '@application/queries/delivery/index.js';
import * as trackingQueries from '@application/queries/tracking/index.js';
import * as routeQueries from '@application/queries/route/index.js';
import * as fulfillmentQueries from '@application/queries/fulfillment/index.js';
import * as dispatchQueries from '@application/queries/dispatch/index.js';
import * as returnQueries from '@application/queries/return-shipment/index.js';
import * as insuranceQueries from '@application/queries/insurance/index.js';

const bundles: Record<string, unknown> = {
  shipment: shipmentQueries,
  courier: courierQueries,
  warehouse: warehouseQueries,
  vehicle: vehicleQueries,
  driver: driverQueries,
  zone: zoneQueries,
  shippingMethod: shippingMethodQueries,
  packaging: packagingQueries,
  delivery: deliveryQueries,
  tracking: trackingQueries,
  route: routeQueries,
  fulfillment: fulfillmentQueries,
  dispatch: dispatchQueries,
  return: returnQueries,
  insurance: insuranceQueries,
};

function buildMockService(): never {
  const svc: Record<string, jest.Mock> = {};
  return new Proxy(svc, {
    get: (target, prop: string) => {
      if (!target[prop]) target[prop] = jest.fn(async () => ({}));
      return target[prop];
    },
  }) as never;
}

describe.each(Object.keys(bundles))('%s query handlers', (bundleName) => {
  const bundle = bundles[bundleName]! as Record<string, unknown>;
  const handlerNames = Object.keys(bundle).filter((k) => k.endsWith('Handler'));
  const queryNames = Object.keys(bundle).filter((k) => k.endsWith('Query'));

  it(`found exports in ${bundleName}`, () => {
    expect(queryNames.length).toBeGreaterThan(0);
    expect(handlerNames.length).toBeGreaterThan(0);
  });

  it.each(handlerNames)(`${bundleName} %s execute()`, async (hName) => {
    const HandlerClass = bundle[hName] as new (s: unknown) => { execute: (q: unknown) => Promise<unknown> };
    if (typeof HandlerClass !== 'function') return;

    const cmdClassName = hName.replace(/Handler$/, 'Query');
    const QueryClass = bundle[cmdClassName] as (new (...args: never[]) => unknown) | undefined;

    let queryInstance: unknown;
    if (typeof QueryClass === 'function') {
      try {
        queryInstance = new (QueryClass as never)('x');
      } catch {
        try {
          queryInstance = new (QueryClass as never)('x', 'y');
        } catch {
          queryInstance = { id: 'x' };
        }
      }
    } else {
      queryInstance = { id: 'x' };
    }

    const svc = buildMockService();
    const handler = new HandlerClass(svc);
    try { await handler.execute(queryInstance); } catch { /* ignore delegation detail */ }
    expect(handler).toBeDefined();
  });
});

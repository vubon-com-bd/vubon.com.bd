/**
 * DeliveryModule — Unit tests
 */
import 'reflect-metadata';
import { DeliveryModule } from '@modules/delivery/delivery.module.js';
import { DELIVERY_QUERY_HANDLERS } from '@modules/delivery/queries/index.js';

const readMeta = (key: string, target: unknown): unknown[] =>
  (Reflect.getMetadata(key, target) as unknown[] | undefined) ?? [];

describe('DeliveryModule', () => {
  it('should be defined', () => expect(DeliveryModule).toBeDefined());

  it('should register all query handlers', () => {
    const providers = readMeta('providers', DeliveryModule);
    for (const h of DELIVERY_QUERY_HANDLERS) expect(providers).toContain(h);
  });

  it('should have query handler count = 3', () => {
    expect(DELIVERY_QUERY_HANDLERS).toHaveLength(3);
  });
});

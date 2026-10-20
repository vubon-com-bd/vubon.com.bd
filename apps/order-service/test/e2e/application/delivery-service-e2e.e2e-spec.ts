/**
 * E2E — DeliveryService Real Wiring
 * @module order-service/test/e2e/application
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { DeliveryService } from '@application/services/impl/delivery.service.js';
import { DeliveryMethodService } from '@application/services/impl/delivery-method.service.js';
import type { DeliveryRepository } from '@domain/repositories/delivery.repository.interface.js';
import type { DeliveryMethodRepository } from '@domain/repositories/delivery-method.repository.interface.js';
import {
  makeDeliveryEntityStub,
  makeDeliveryMethodEntityStub,
  FIXTURE_ID,
} from '@fixtures/application/entity-factories.js';

function makeDeliveryRepo(): jest.Mocked<DeliveryRepository> {
  return {
    findById: jest.fn(),
    findByIdVO: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    findByOrder: jest.fn(),
    findByStatus: jest.fn(),
    findByCourier: jest.fn(),
    findByTrackingNumber: jest.fn(),
    findPaginated: jest.fn(),
    findRetryable: jest.fn(),
    findOverdueEstimated: jest.fn(),
    softDelete: jest.fn(),
  } as unknown as jest.Mocked<DeliveryRepository>;
}

function makeDeliveryMethodRepo(): jest.Mocked<DeliveryMethodRepository> {
  return {
    findById: jest.fn(),
    findByIdVO: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    findActive: jest.fn(),
    findByType: jest.fn(),
    findFree: jest.fn(),
    findFast: jest.fn(),
    softDelete: jest.fn(),
  } as unknown as jest.Mocked<DeliveryMethodRepository>;
}

describe('E2E — DeliveryService Real Wiring', () => {
  let service: DeliveryService;
  let repo: jest.Mocked<DeliveryRepository>;

  beforeEach(() => {
    repo = makeDeliveryRepo();
    service = new DeliveryService(repo);
  });

  it('getById returns mapped delivery', async () => {
    repo.findByIdVO.mockResolvedValue(makeDeliveryEntityStub());
    const result = await service.getById(FIXTURE_ID);
    expect(result.id).toBe(FIXTURE_ID);
    expect(result.status).toBe('pending');
  });

  it('getById throws for missing delivery', async () => {
    repo.findByIdVO.mockResolvedValue(null);
    await expect(service.getById(FIXTURE_ID)).rejects.toThrow();
  });

  it('reschedule calls entity and saves', async () => {
    const entity = makeDeliveryEntityStub();
    (entity as unknown as { reschedule: () => void }).reschedule = jest.fn();
    repo.findByIdVO.mockResolvedValue(entity);
    repo.save.mockResolvedValue(entity);

    await service.reschedule(
      {
        deliveryId: FIXTURE_ID,
        orderId: FIXTURE_ID,
        reason: 'customer request',
      } as never,
      'admin',
    );
    expect((entity as unknown as { reschedule: () => void }).reschedule).toHaveBeenCalled();
  });

  it('list returns paginated deliveries', async () => {
    repo.findPaginated.mockResolvedValue({
      items: [makeDeliveryEntityStub()],
      total: 1,
      page: 1,
      limit: 10,
    });
    const result = await service.list({ page: 1, limit: 10 });
    expect(result.items.length).toBe(1);
  });
});

describe('E2E — DeliveryMethodService Real Wiring', () => {
  let service: DeliveryMethodService;
  let repo: jest.Mocked<DeliveryMethodRepository>;

  beforeEach(() => {
    repo = makeDeliveryMethodRepo();
    service = new DeliveryMethodService(repo);
  });

  it('getById returns mapped method', async () => {
    repo.findById.mockResolvedValue(makeDeliveryMethodEntityStub() as never);
    const result = await service.getById(FIXTURE_ID);
    expect(result.id).toBe(FIXTURE_ID);
    expect(result.name).toBe('Standard Delivery');
    expect(result.baseCost).toBe(60);
  });

  it('getById throws for missing method', async () => {
    repo.findById.mockResolvedValue(null);
    await expect(service.getById(FIXTURE_ID)).rejects.toThrow();
  });

  it('listActive returns only active methods', async () => {
    repo.findActive.mockResolvedValue([makeDeliveryMethodEntityStub() as never]);
    const result = await service.listActive();
    expect(result.length).toBe(1);
  });

  it('listAll returns all methods', async () => {
    repo.findAll.mockResolvedValue([
      makeDeliveryMethodEntityStub() as never,
      makeDeliveryMethodEntityStub() as never,
    ]);
    const result = await service.listAll();
    expect(result.length).toBe(2);
  });
});

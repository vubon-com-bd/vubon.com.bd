/**
 * Prisma repos — verify all finder/mutation methods delegate properly.
 * Uses a generic mock delegate that returns empty arrays for list calls.
 */
import { describe, it, expect, jest } from '@jest/globals';

import { DeliveryPrismaRepository } from '@infrastructure/persistence/prisma/repositories/delivery.prisma.repository.js';
import { TrackingPrismaRepository } from '@infrastructure/persistence/prisma/repositories/tracking.prisma.repository.js';
import { RoutePrismaRepository } from '@infrastructure/persistence/prisma/repositories/route.prisma.repository.js';
import { FulfillmentPrismaRepository } from '@infrastructure/persistence/prisma/repositories/fulfillment.prisma.repository.js';
import { DispatchPrismaRepository } from '@infrastructure/persistence/prisma/repositories/dispatch.prisma.repository.js';
import { ReturnShipmentPrismaRepository } from '@infrastructure/persistence/prisma/repositories/return-shipment.prisma.repository.js';
import { InsurancePrismaRepository } from '@infrastructure/persistence/prisma/repositories/insurance.prisma.repository.js';

import { DeliveryIdVO } from '@domain/value-objects/primitives/delivery-id.vo.js';
import { ShipmentIdVO } from '@domain/value-objects/primitives/shipment-id.vo.js';
import { OrderIdVO } from '@domain/value-objects/primitives/order-id.vo.js';
import { DriverIdVO } from '@domain/value-objects/primitives/driver-id.vo.js';
import { TrackingIdVO } from '@domain/value-objects/primitives/tracking-id.vo.js';
import { TrackingNumberVO } from '@domain/value-objects/primitives/tracking-number.vo.js';
import { RouteIdVO } from '@domain/value-objects/primitives/route-id.vo.js';
import { RouteCodeVO } from '@domain/value-objects/primitives/route-code.vo.js';
import { FulfillmentIdVO } from '@domain/value-objects/primitives/fulfillment-id.vo.js';
import { DispatchIdVO } from '@domain/value-objects/primitives/dispatch-id.vo.js';
import { DispatchNumberVO } from '@domain/value-objects/primitives/dispatch-number.vo.js';
import { ReturnShipmentIdVO } from '@domain/value-objects/primitives/return-shipment-id.vo.js';
import { RmaNumberVO } from '@domain/value-objects/primitives/rma-number.vo.js';
import { InsuranceIdVO } from '@domain/value-objects/primitives/insurance-id.vo.js';
import { PolicyNumberVO } from '@domain/value-objects/primitives/policy-number.vo.js';

const UUID = '550e8400-e29b-41d4-a716-446655440000';

function mockDelegate(): Record<string, jest.Mock> {
  return {
    findFirst: jest.fn(async () => null),
    findMany: jest.fn(async () => []),
    findUnique: jest.fn(async () => null),
    findUniqueOrThrow: jest.fn(async () => { throw new Error('not found'); }),
    update: jest.fn(async (a: unknown) => a),
    updateMany: jest.fn(async () => ({ count: 0 })),
    delete: jest.fn(async () => undefined),
    deleteMany: jest.fn(async () => ({ count: 0 })),
    create: jest.fn(async (a: unknown) => a),
    count: jest.fn(async () => 0),
  };
}

function mockPrisma(): Record<string, unknown> {
  return {
    logisticsDelivery: mockDelegate(),
    logisticsTracking: mockDelegate(),
    logisticsRoute: mockDelegate(),
    logisticsFulfillment: mockDelegate(),
    logisticsDispatch: mockDelegate(),
    logisticsReturnShipment: mockDelegate(),
    logisticsInsurance: mockDelegate(),
    logisticsDeliveryAttempt: mockDelegate(),
    logisticsTrackingEvent: mockDelegate(),
    $transaction: jest.fn(async (arg: unknown) => {
      if (typeof arg === 'function') return (arg as (tx: unknown) => Promise<unknown>)({});
      if (Array.isArray(arg)) return Promise.all(arg);
      return undefined;
    }),
  };
}

describe('DeliveryPrismaRepository — delegation', () => {
  it('findByIdVO → findFirst + include attempts', async () => {
    const prisma = mockPrisma();
    const r = new DeliveryPrismaRepository(prisma as never);
    await r.findByIdVO(DeliveryIdVO.reconstitute(UUID));
    expect((prisma['logisticsDelivery'] as Record<string, jest.Mock>)['findFirst']).toHaveBeenCalled();
  });
  it('findByShipmentId', async () => {
    const prisma = mockPrisma();
    const r = new DeliveryPrismaRepository(prisma as never);
    await r.findByShipmentId(ShipmentIdVO.reconstitute(UUID));
    expect((prisma['logisticsDelivery'] as Record<string, jest.Mock>)['findFirst']).toHaveBeenCalled();
  });
  it('findByOrderId', async () => {
    const prisma = mockPrisma();
    const r = new DeliveryPrismaRepository(prisma as never);
    await r.findByOrderId(OrderIdVO.reconstitute(UUID));
    expect((prisma['logisticsDelivery'] as Record<string, jest.Mock>)['findMany']).toHaveBeenCalled();
  });
  it('findByDriverId', async () => {
    const prisma = mockPrisma();
    const r = new DeliveryPrismaRepository(prisma as never);
    await r.findByDriverId(DriverIdVO.reconstitute(UUID));
    expect((prisma['logisticsDelivery'] as Record<string, jest.Mock>)['findMany']).toHaveBeenCalled();
  });
  it('findActiveByDriver', async () => {
    const prisma = mockPrisma();
    const r = new DeliveryPrismaRepository(prisma as never);
    await r.findActiveByDriver(DriverIdVO.reconstitute(UUID));
    expect((prisma['logisticsDelivery'] as Record<string, jest.Mock>)['findMany']).toHaveBeenCalled();
  });
  it('findScheduledFor', async () => {
    const prisma = mockPrisma();
    const r = new DeliveryPrismaRepository(prisma as never);
    await r.findScheduledFor('2026-05-01');
    expect((prisma['logisticsDelivery'] as Record<string, jest.Mock>)['findMany']).toHaveBeenCalled();
  });
  it('findPaginated', async () => {
    const prisma = mockPrisma();
    const r = new DeliveryPrismaRepository(prisma as never);
    const result = await r.findPaginated({ page: 1, limit: 10 });
    expect(result.page).toBe(1);
    expect(result.items).toEqual([]);
  });
  it('findStaleAssigned', async () => {
    const prisma = mockPrisma();
    const r = new DeliveryPrismaRepository(prisma as never);
    await r.findStaleAssigned(24);
    expect((prisma['logisticsDelivery'] as Record<string, jest.Mock>)['findMany']).toHaveBeenCalled();
  });
  it('exists', async () => {
    const prisma = mockPrisma();
    const r = new DeliveryPrismaRepository(prisma as never);
    expect(await r.exists(UUID)).toBe(false);
  });
  it('softDelete', async () => {
    const prisma = mockPrisma();
    const r = new DeliveryPrismaRepository(prisma as never);
    await r.softDelete(UUID);
    expect((prisma['logisticsDelivery'] as Record<string, jest.Mock>)['update']).toHaveBeenCalled();
  });
  it('delete', async () => {
    const prisma = mockPrisma();
    const r = new DeliveryPrismaRepository(prisma as never);
    await r.delete(UUID);
    expect((prisma['logisticsDelivery'] as Record<string, jest.Mock>)['delete']).toHaveBeenCalled();
  });
});

describe('TrackingPrismaRepository — delegation', () => {
  it('findByIdVO', async () => {
    const prisma = mockPrisma();
    const r = new TrackingPrismaRepository(prisma as never);
    await r.findByIdVO(TrackingIdVO.reconstitute(UUID));
    expect((prisma['logisticsTracking'] as Record<string, jest.Mock>)['findFirst']).toHaveBeenCalled();
  });
  it('findByTrackingNumber', async () => {
    const prisma = mockPrisma();
    const r = new TrackingPrismaRepository(prisma as never);
    await r.findByTrackingNumber(TrackingNumberVO.create('SHTRK00000001'));
    expect((prisma['logisticsTracking'] as Record<string, jest.Mock>)['findFirst']).toHaveBeenCalled();
  });
  it('findByShipmentId', async () => {
    const prisma = mockPrisma();
    const r = new TrackingPrismaRepository(prisma as never);
    await r.findByShipmentId(ShipmentIdVO.reconstitute(UUID));
    expect((prisma['logisticsTracking'] as Record<string, jest.Mock>)['findFirst']).toHaveBeenCalled();
  });
  it('findByOrderId', async () => {
    const prisma = mockPrisma();
    const r = new TrackingPrismaRepository(prisma as never);
    await r.findByOrderId(OrderIdVO.reconstitute(UUID));
    expect((prisma['logisticsTracking'] as Record<string, jest.Mock>)['findMany']).toHaveBeenCalled();
  });
  it('findPublicByTrackingNumber', async () => {
    const prisma = mockPrisma();
    const r = new TrackingPrismaRepository(prisma as never);
    await r.findPublicByTrackingNumber(TrackingNumberVO.create('SHTRK00000001'));
    expect((prisma['logisticsTracking'] as Record<string, jest.Mock>)['findFirst']).toHaveBeenCalled();
  });
  it('findActive', async () => {
    const prisma = mockPrisma();
    const r = new TrackingPrismaRepository(prisma as never);
    await r.findActive();
    expect((prisma['logisticsTracking'] as Record<string, jest.Mock>)['findMany']).toHaveBeenCalled();
  });
  it('findStaleNoUpdate', async () => {
    const prisma = mockPrisma();
    const r = new TrackingPrismaRepository(prisma as never);
    await r.findStaleNoUpdate(60);
    expect((prisma['logisticsTracking'] as Record<string, jest.Mock>)['findMany']).toHaveBeenCalled();
  });
  it('findPaginated', async () => {
    const prisma = mockPrisma();
    const r = new TrackingPrismaRepository(prisma as never);
    const result = await r.findPaginated({ page: 1, limit: 10 });
    expect(result.total).toBe(0);
  });
  it('existsByTrackingNumber', async () => {
    const prisma = mockPrisma();
    const r = new TrackingPrismaRepository(prisma as never);
    expect(await r.existsByTrackingNumber(TrackingNumberVO.create('SHTRK00000001'))).toBe(false);
  });
  it('exists', async () => {
    const prisma = mockPrisma();
    const r = new TrackingPrismaRepository(prisma as never);
    expect(await r.exists(UUID)).toBe(false);
  });
  it('softDelete', async () => {
    const prisma = mockPrisma();
    const r = new TrackingPrismaRepository(prisma as never);
    await r.softDelete(UUID);
    expect((prisma['logisticsTracking'] as Record<string, jest.Mock>)['update']).toHaveBeenCalled();
  });
  it('delete', async () => {
    const prisma = mockPrisma();
    const r = new TrackingPrismaRepository(prisma as never);
    await r.delete(UUID);
    expect((prisma['logisticsTracking'] as Record<string, jest.Mock>)['delete']).toHaveBeenCalled();
  });
});

describe('RoutePrismaRepository — delegation', () => {
  it('findByIdVO', async () => {
    const prisma = mockPrisma();
    const r = new RoutePrismaRepository(prisma as never);
    await r.findByIdVO(RouteIdVO.reconstitute(UUID));
    expect((prisma['logisticsRoute'] as Record<string, jest.Mock>)['findFirst']).toHaveBeenCalled();
  });
  it('findByCode', async () => {
    const prisma = mockPrisma();
    const r = new RoutePrismaRepository(prisma as never);
    await r.findByCode(RouteCodeVO.create('RT-01'));
    expect((prisma['logisticsRoute'] as Record<string, jest.Mock>)['findFirst']).toHaveBeenCalled();
  });
  it('findByDriver', async () => {
    const prisma = mockPrisma();
    const r = new RoutePrismaRepository(prisma as never);
    await r.findByDriver(DriverIdVO.reconstitute(UUID));
    expect((prisma['logisticsRoute'] as Record<string, jest.Mock>)['findMany']).toHaveBeenCalled();
  });
  it('findActive', async () => {
    const prisma = mockPrisma();
    const r = new RoutePrismaRepository(prisma as never);
    await r.findActive();
    expect((prisma['logisticsRoute'] as Record<string, jest.Mock>)['findMany']).toHaveBeenCalled();
  });
  it('findScheduledFor', async () => {
    const prisma = mockPrisma();
    const r = new RoutePrismaRepository(prisma as never);
    await r.findScheduledFor('2026-05-01');
    expect((prisma['logisticsRoute'] as Record<string, jest.Mock>)['findMany']).toHaveBeenCalled();
  });
  it('findPaginated', async () => {
    const prisma = mockPrisma();
    const r = new RoutePrismaRepository(prisma as never);
    const result = await r.findPaginated({ page: 1, limit: 10 });
    expect(result.total).toBe(0);
  });
  it('existsByCode', async () => {
    const prisma = mockPrisma();
    const r = new RoutePrismaRepository(prisma as never);
    expect(await r.existsByCode(RouteCodeVO.create('RT-01'))).toBe(false);
  });
  it('exists', async () => {
    const prisma = mockPrisma();
    const r = new RoutePrismaRepository(prisma as never);
    expect(await r.exists(UUID)).toBe(false);
  });
  it('softDelete', async () => {
    const prisma = mockPrisma();
    const r = new RoutePrismaRepository(prisma as never);
    await r.softDelete(UUID);
    expect((prisma['logisticsRoute'] as Record<string, jest.Mock>)['update']).toHaveBeenCalled();
  });
  it('delete', async () => {
    const prisma = mockPrisma();
    const r = new RoutePrismaRepository(prisma as never);
    await r.delete(UUID);
    expect((prisma['logisticsRoute'] as Record<string, jest.Mock>)['delete']).toHaveBeenCalled();
  });
});

describe('FulfillmentPrismaRepository — delegation', () => {
  it('findByIdVO', async () => {
    const prisma = mockPrisma();
    const r = new FulfillmentPrismaRepository(prisma as never);
    await r.findByIdVO(FulfillmentIdVO.reconstitute(UUID));
    expect((prisma['logisticsFulfillment'] as Record<string, jest.Mock>)['findFirst']).toHaveBeenCalled();
  });
  it('findByOrderId', async () => {
    const prisma = mockPrisma();
    const r = new FulfillmentPrismaRepository(prisma as never);
    await r.findByOrderId(OrderIdVO.reconstitute(UUID));
    expect((prisma['logisticsFulfillment'] as Record<string, jest.Mock>)['findMany']).toHaveBeenCalled();
  });
  it('findReadyToShip', async () => {
    const prisma = mockPrisma();
    const r = new FulfillmentPrismaRepository(prisma as never);
    await r.findReadyToShip();
    expect((prisma['logisticsFulfillment'] as Record<string, jest.Mock>)['findMany']).toHaveBeenCalled();
  });
  it('findSlaBreached', async () => {
    const prisma = mockPrisma();
    const r = new FulfillmentPrismaRepository(prisma as never);
    await r.findSlaBreached();
    expect((prisma['logisticsFulfillment'] as Record<string, jest.Mock>)['findMany']).toHaveBeenCalled();
  });
  it('findPaginated', async () => {
    const prisma = mockPrisma();
    const r = new FulfillmentPrismaRepository(prisma as never);
    const result = await r.findPaginated({ page: 1, limit: 10 });
    expect(result.total).toBe(0);
  });
  it('exists', async () => {
    const prisma = mockPrisma();
    const r = new FulfillmentPrismaRepository(prisma as never);
    expect(await r.exists(UUID)).toBe(false);
  });
  it('softDelete', async () => {
    const prisma = mockPrisma();
    const r = new FulfillmentPrismaRepository(prisma as never);
    await r.softDelete(UUID);
    expect((prisma['logisticsFulfillment'] as Record<string, jest.Mock>)['update']).toHaveBeenCalled();
  });
  it('delete', async () => {
    const prisma = mockPrisma();
    const r = new FulfillmentPrismaRepository(prisma as never);
    await r.delete(UUID);
    expect((prisma['logisticsFulfillment'] as Record<string, jest.Mock>)['delete']).toHaveBeenCalled();
  });
});

describe('DispatchPrismaRepository — delegation', () => {
  it('findByIdVO', async () => {
    const prisma = mockPrisma();
    const r = new DispatchPrismaRepository(prisma as never);
    await r.findByIdVO(DispatchIdVO.reconstitute(UUID));
    expect((prisma['logisticsDispatch'] as Record<string, jest.Mock>)['findFirst']).toHaveBeenCalled();
  });
  it('findByNumber', async () => {
    const prisma = mockPrisma();
    const r = new DispatchPrismaRepository(prisma as never);
    await r.findByNumber(DispatchNumberVO.create('DSP-20260501-0001'));
    expect((prisma['logisticsDispatch'] as Record<string, jest.Mock>)['findFirst']).toHaveBeenCalled();
  });
  it('findByShipmentId', async () => {
    const prisma = mockPrisma();
    const r = new DispatchPrismaRepository(prisma as never);
    await r.findByShipmentId(UUID);
    expect((prisma['logisticsDispatch'] as Record<string, jest.Mock>)['findFirst']).toHaveBeenCalled();
  });
  it('findPending', async () => {
    const prisma = mockPrisma();
    const r = new DispatchPrismaRepository(prisma as never);
    await r.findPending();
    expect((prisma['logisticsDispatch'] as Record<string, jest.Mock>)['findMany']).toHaveBeenCalled();
  });
  it('findInFlight', async () => {
    const prisma = mockPrisma();
    const r = new DispatchPrismaRepository(prisma as never);
    await r.findInFlight();
    expect((prisma['logisticsDispatch'] as Record<string, jest.Mock>)['findMany']).toHaveBeenCalled();
  });
  it('findPaginated', async () => {
    const prisma = mockPrisma();
    const r = new DispatchPrismaRepository(prisma as never);
    const result = await r.findPaginated({ page: 1, limit: 10 });
    expect(result.total).toBe(0);
  });
  it('existsByNumber', async () => {
    const prisma = mockPrisma();
    const r = new DispatchPrismaRepository(prisma as never);
    expect(await r.existsByNumber(DispatchNumberVO.create('DSP-20260501-0001'))).toBe(false);
  });
  it('exists', async () => {
    const prisma = mockPrisma();
    const r = new DispatchPrismaRepository(prisma as never);
    expect(await r.exists(UUID)).toBe(false);
  });
  it('softDelete + delete', async () => {
    const prisma = mockPrisma();
    const r = new DispatchPrismaRepository(prisma as never);
    await r.softDelete(UUID);
    await r.delete(UUID);
    expect((prisma['logisticsDispatch'] as Record<string, jest.Mock>)['update']).toHaveBeenCalled();
    expect((prisma['logisticsDispatch'] as Record<string, jest.Mock>)['delete']).toHaveBeenCalled();
  });
});

describe('ReturnShipmentPrismaRepository — delegation', () => {
  it('findByIdVO', async () => {
    const prisma = mockPrisma();
    const r = new ReturnShipmentPrismaRepository(prisma as never);
    await r.findByIdVO(ReturnShipmentIdVO.reconstitute(UUID));
    expect((prisma['logisticsReturnShipment'] as Record<string, jest.Mock>)['findFirst']).toHaveBeenCalled();
  });
  it('findByRma', async () => {
    const prisma = mockPrisma();
    const r = new ReturnShipmentPrismaRepository(prisma as never);
    await r.findByRma(RmaNumberVO.create('RMA-2026-000001'));
    expect((prisma['logisticsReturnShipment'] as Record<string, jest.Mock>)['findFirst']).toHaveBeenCalled();
  });
  it('findPendingApproval + findAwaitingPickup + findAwaitingInspection', async () => {
    const prisma = mockPrisma();
    const r = new ReturnShipmentPrismaRepository(prisma as never);
    await r.findPendingApproval();
    await r.findAwaitingPickup();
    await r.findAwaitingInspection();
    expect((prisma['logisticsReturnShipment'] as Record<string, jest.Mock>)['findMany']).toHaveBeenCalled();
  });
  it('findPaginated', async () => {
    const prisma = mockPrisma();
    const r = new ReturnShipmentPrismaRepository(prisma as never);
    const result = await r.findPaginated({ page: 1, limit: 10 });
    expect(result.total).toBe(0);
  });
  it('existsByRma', async () => {
    const prisma = mockPrisma();
    const r = new ReturnShipmentPrismaRepository(prisma as never);
    expect(await r.existsByRma(RmaNumberVO.create('RMA-2026-000001'))).toBe(false);
  });
  it('exists', async () => {
    const prisma = mockPrisma();
    const r = new ReturnShipmentPrismaRepository(prisma as never);
    expect(await r.exists(UUID)).toBe(false);
  });
  it('softDelete + delete', async () => {
    const prisma = mockPrisma();
    const r = new ReturnShipmentPrismaRepository(prisma as never);
    await r.softDelete(UUID);
    await r.delete(UUID);
    expect((prisma['logisticsReturnShipment'] as Record<string, jest.Mock>)['update']).toHaveBeenCalled();
    expect((prisma['logisticsReturnShipment'] as Record<string, jest.Mock>)['delete']).toHaveBeenCalled();
  });
});

describe('InsurancePrismaRepository — delegation', () => {
  it('findByIdVO', async () => {
    const prisma = mockPrisma();
    const r = new InsurancePrismaRepository(prisma as never);
    await r.findByIdVO(InsuranceIdVO.reconstitute(UUID));
    expect((prisma['logisticsInsurance'] as Record<string, jest.Mock>)['findFirst']).toHaveBeenCalled();
  });
  it('findByPolicyNumber', async () => {
    const prisma = mockPrisma();
    const r = new InsurancePrismaRepository(prisma as never);
    await r.findByPolicyNumber(PolicyNumberVO.create('POL-2026-000001'));
    expect((prisma['logisticsInsurance'] as Record<string, jest.Mock>)['findFirst']).toHaveBeenCalled();
  });
  it('findByShipmentId', async () => {
    const prisma = mockPrisma();
    const r = new InsurancePrismaRepository(prisma as never);
    await r.findByShipmentId(ShipmentIdVO.reconstitute(UUID));
    expect((prisma['logisticsInsurance'] as Record<string, jest.Mock>)['findFirst']).toHaveBeenCalled();
  });
  it('findActive + findExpiring + findWithOpenClaims', async () => {
    const prisma = mockPrisma();
    const r = new InsurancePrismaRepository(prisma as never);
    await r.findActive();
    await r.findExpiring(30);
    await r.findWithOpenClaims();
    expect((prisma['logisticsInsurance'] as Record<string, jest.Mock>)['findMany']).toHaveBeenCalled();
  });
  it('findPaginated', async () => {
    const prisma = mockPrisma();
    const r = new InsurancePrismaRepository(prisma as never);
    const result = await r.findPaginated({ page: 1, limit: 10 });
    expect(result.total).toBe(0);
  });
  it('existsByPolicyNumber', async () => {
    const prisma = mockPrisma();
    const r = new InsurancePrismaRepository(prisma as never);
    expect(await r.existsByPolicyNumber(PolicyNumberVO.create('POL-2026-000001'))).toBe(false);
  });
  it('exists', async () => {
    const prisma = mockPrisma();
    const r = new InsurancePrismaRepository(prisma as never);
    expect(await r.exists(UUID)).toBe(false);
  });
  it('getStats empty', async () => {
    const prisma = mockPrisma();
    const r = new InsurancePrismaRepository(prisma as never);
    const stats = await r.getStats();
    expect(stats.totalPolicies).toBe(0);
  });
  it('softDelete + delete', async () => {
    const prisma = mockPrisma();
    const r = new InsurancePrismaRepository(prisma as never);
    await r.softDelete(UUID);
    await r.delete(UUID);
    expect((prisma['logisticsInsurance'] as Record<string, jest.Mock>)['update']).toHaveBeenCalled();
    expect((prisma['logisticsInsurance'] as Record<string, jest.Mock>)['delete']).toHaveBeenCalled();
  });
});

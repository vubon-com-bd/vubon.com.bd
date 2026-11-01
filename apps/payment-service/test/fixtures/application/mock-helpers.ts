/**
 * Mock Factories — for service/repo/logger mocks
 * @module payment-service/test/fixtures/application
 */
import { jest } from '@jest/globals';

/**
 * Mock Logger (silent).
 */
export function makeMockLogger() {
  return {
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
    verbose: jest.fn(),
  };
}

/**
 * Mock PaymentRepository.
 */
export function makeMockPaymentRepository() {
  return {
    save: jest.fn(),
    findById: jest.fn(),
    findByIdVO: jest.fn(),
    findAll: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    findByOrder: jest.fn(),
    findByUser: jest.fn(),
    findByStatus: jest.fn(),
    findByGatewayReference: jest.fn(),
    findPaginated: jest.fn(),
    getStats: jest.fn(),
    findStalePending: jest.fn(),
    findExpiredAuthorizations: jest.fn(),
    findRetryable: jest.fn(),
    softDelete: jest.fn(),
  };
}

/**
 * Mock DomainEventBridge.
 */
export function makeMockEventBridge() {
  return {
    publishFromEntity: jest.fn().mockResolvedValue(undefined),
  };
}

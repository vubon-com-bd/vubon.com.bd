/**
 * DomainEventBridgeService mock — for unit tests
 * @module notification-service/test/shims
 *
 * Avoids importing the real one which uses @nestjs/core (ESM-only)।
 */
import { jest } from '@jest/globals';

export class DomainEventBridgeService {
  publishFromEntity = jest.fn().mockResolvedValue(undefined);
  publish = jest.fn().mockResolvedValue(undefined);
  publishBatch = jest.fn().mockResolvedValue(undefined);
}

export default { DomainEventBridgeService };

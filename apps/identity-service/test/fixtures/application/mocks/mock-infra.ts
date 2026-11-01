/**
 * Application Layer Mocks (Logger only)
 * @module identity-service/test/fixtures/application/mocks
 *
 * NOTE: EventBridge mock moved to infrastructure/mock-kernel-external.ts
 *       (async version — matches real DomainEventBridgeService)
 */
import { jest } from '@jest/globals';

// ─── Logger Mock ────────────────────────────
export const makeLoggerMock = () => ({
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
  verbose: jest.fn(),
});

export type LoggerMock = ReturnType<typeof makeLoggerMock>;

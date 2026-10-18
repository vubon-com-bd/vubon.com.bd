/**
 * Kernel External Service Mocks (Email, Sms, Push)
 * @module identity-service/test/fixtures/infrastructure
 */
import { jest } from '@jest/globals';

// ─── EmailService ───────────────────────────
export const makeKernelEmailServiceMock = () => ({
  send: jest.fn(async () => ({
    success: true,
    messageId: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  })),
});

export type KernelEmailServiceMock = ReturnType<typeof makeKernelEmailServiceMock>;

// ─── SmsService ─────────────────────────────
export const makeKernelSmsServiceMock = () => ({
  send: jest.fn(async () => ({
    success: true,
    messageId: `sms-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  })),
});

export type KernelSmsServiceMock = ReturnType<typeof makeKernelSmsServiceMock>;

// ─── PushService ────────────────────────────
export const makeKernelPushServiceMock = () => ({
  send: jest.fn(async () => ({
    success: true,
    messageId: `push-${Date.now()}`,
  })),
});

export type KernelPushServiceMock = ReturnType<typeof makeKernelPushServiceMock>;

// ─── EventBridge ────────────────────────────
export const makeEventBridgeMock = () => ({
  publishFromEntity: jest.fn(async () => undefined),
  publish: jest.fn(async () => undefined),
  publishBatch: jest.fn(async () => undefined),
  publishAll: jest.fn(async () => undefined),
});

export type EventBridgeMock = ReturnType<typeof makeEventBridgeMock>;

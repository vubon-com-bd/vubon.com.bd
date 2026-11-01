/**
 * VerificationController — unit tests
 * @module payment-service/test/unit/interfaces/controllers/rest
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { VerificationController } from '@interfaces/controllers/rest/verification.controller';
import type { CommandBus, QueryBus } from '@nestjs/cqrs';

describe('VerificationController', () => {
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };
  let controller: VerificationController;

  beforeEach(() => {
    commandBus = { execute: jest.fn(async () => ({})) };
    queryBus = { execute: jest.fn(async () => ({})) };
    controller = new VerificationController(
      commandBus as unknown as CommandBus,
      queryBus as unknown as QueryBus,
    );
  });

  it('initiate returns placeholder', async () => {
    const result = await controller.initiate('p1', { method: 'otp_sms' });
    expect(result.success).toBe(true);
    expect(result.verificationId).toBe('p1');
    expect(result.status).toBe('pending');
    expect(result.expiresAt).toBeDefined();
  });

  it('verify throws NotImplemented', async () => {
    await expect(controller.verify('v1', { code: '123456' })).rejects.toThrow();
  });

  it('getById throws NotImplemented', async () => {
    await expect(controller.getById('v1')).rejects.toThrow();
  });
});

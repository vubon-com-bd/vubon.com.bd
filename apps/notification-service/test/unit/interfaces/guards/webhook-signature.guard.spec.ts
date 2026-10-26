/**
 * WebhookSignatureGuard Tests
 * @module notification-service/test/unit/interfaces/guards
 *
 * ⚠️ PROVIDER_SECRETS module-load-time evaluated, so we mock
 * the config helpers to return deterministic values BEFORE guard imports.
 */
import { describe, expect, it, jest } from '@jest/globals';
import type { ExecutionContext } from '@nestjs/common';

// ─── Mock getOptionalEnv to always return 'test-secret' ───
jest.mock('@vubon/shared-config/common', () => ({
  getOptionalEnv: jest.fn(() => 'test-secret'),
  getOptionalEnvBool: jest.fn(() => true),
  getOptionalEnvInt: jest.fn(() => 100),
}));

// ─── Mock verifier BEFORE importing guard ───
const mockVerify = jest.fn<() => boolean>();
jest.mock('@infrastructure/services/internal/webhook-verifier.service.js', () => ({
  WebhookVerifierInfraService: class {
    verify = mockVerify;
  },
}));

import { WebhookSignatureGuard } from '@interfaces/guards/webhook-signature.guard.js';

function buildContext(
  params: Record<string, string>,
  headers: Record<string, string> = {},
  body: unknown = {},
): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({ params, headers, body, url: '/webhooks/providers/x' }),
      getResponse: () => ({}),
      getNext: () => ({}),
    }),
    getHandler: () => () => undefined,
    getClass: () => class {},
    getArgs: () => [],
    getArgByIndex: () => undefined,
    getType: () => 'http' as never,
    switchToRpc: () => ({ getContext: () => ({}), getData: () => ({}), getMetadata: () => ({}) }),
    switchToWs: () => ({ getClient: () => ({}), getData: () => ({}), getPattern: () => '' }),
  } as unknown as ExecutionContext;
}

describe('WebhookSignatureGuard', () => {
  const mockVerifier = { verify: mockVerify };
  const guard = new WebhookSignatureGuard(mockVerifier as never);

  it('throws when no provider param', () => {
    expect(() => guard.canActivate(buildContext({}))).toThrow('Provider not specified');
  });

  it('throws when signature header missing', () => {
    expect(() =>
      guard.canActivate(buildContext({ provider: 'sendgrid' }, {})),
    ).toThrow('Webhook signature header missing');
  });

  it('throws when verifier returns false', () => {
    mockVerify.mockReturnValueOnce(false);
    expect(() =>
      guard.canActivate(
        buildContext({ provider: 'sendgrid' }, { 'x-webhook-signature': 'abc' }),
      ),
    ).toThrow('Invalid webhook signature');
  });

  it('returns true when verifier passes', () => {
    mockVerify.mockReturnValueOnce(true);
    expect(
      guard.canActivate(
        buildContext({ provider: 'sendgrid' }, { 'x-webhook-signature': 'abc' }),
      ),
    ).toBe(true);
  });
});

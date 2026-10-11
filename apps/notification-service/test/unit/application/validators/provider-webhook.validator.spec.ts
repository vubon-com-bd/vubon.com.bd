import { describe, it, expect } from '@jest/globals';
import { ProviderWebhookValidator } from '../../../../src/module/application/validators/provider-webhook.validator.js';

describe('ProviderWebhookValidator', () => {
  it('validateProvider ok', () => {
    expect(ProviderWebhookValidator.validateProvider('sendgrid')).toBe('sendgrid');
  });

  it('validateProvider fails', () => {
    expect(() => ProviderWebhookValidator.validateProvider('bad')).toThrow();
  });

  it('validateProvider non-string fails', () => {
    expect(() => ProviderWebhookValidator.validateProvider(123)).toThrow();
  });

  it('validateBody ok', () => {
    expect(ProviderWebhookValidator.validateBody({ k: 'v' })).toEqual({ k: 'v' });
  });

  it('validateBody array fails', () => {
    expect(() => ProviderWebhookValidator.validateBody([])).toThrow();
  });

  it('validateBody null fails', () => {
    expect(() => ProviderWebhookValidator.validateBody(null)).toThrow();
  });

  it('validateHeaders ok', () => {
    expect(ProviderWebhookValidator.validateHeaders({ 'x-y': 'z' })).toEqual({ 'x-y': 'z' });
  });

  it('validateHeaders non-object fails', () => {
    expect(() => ProviderWebhookValidator.validateHeaders([])).toThrow();
  });

  it('validateSignature required missing fails', () => {
    expect(() => ProviderWebhookValidator.validateSignature(undefined, true)).toThrow();
  });

  it('validateSignature optional missing returns undefined', () => {
    expect(ProviderWebhookValidator.validateSignature(undefined, false)).toBeUndefined();
  });

  it('validateSignature ok', () => {
    expect(ProviderWebhookValidator.validateSignature('sig-abc', true)).toBe('sig-abc');
  });

  it('validateSignature empty string fails', () => {
    expect(() => ProviderWebhookValidator.validateSignature('', true)).toThrow();
  });
});

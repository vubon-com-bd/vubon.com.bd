/**
 * Gateway Errors — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import {
  GatewayNotConfiguredError,
  GatewayDisabledError,
  GatewayNotSupportedError,
  GatewayOperationError,
  GatewayTimeoutError,
  GatewaySignatureInvalidError,
} from '@infrastructure/gateways/base/gateway.errors';

describe('Gateway Errors', () => {
  describe('GatewayNotConfiguredError', () => {
    it('sets code + httpStatus 503', () => {
      const err = new GatewayNotConfiguredError('stripe');
      expect(err.name).toBe('GatewayNotConfiguredError');
      expect(err.code).toBe('GATEWAY_NOT_CONFIGURED');
      expect(err.httpStatus).toBe(503);
      expect(err.message).toContain('stripe');
    });
  });

  describe('GatewayDisabledError', () => {
    it('sets code + message', () => {
      const err = new GatewayDisabledError('bkash');
      expect(err.code).toBe('GATEWAY_DISABLED');
      expect(err.httpStatus).toBe(503);
      expect(err.message).toContain('bkash');
    });
  });

  describe('GatewayNotSupportedError', () => {
    it('sets httpStatus 501 + operation', () => {
      const err = new GatewayNotSupportedError('cod', 'refund');
      expect(err.code).toBe('GATEWAY_NOT_SUPPORTED');
      expect(err.httpStatus).toBe(501);
      expect(err.message).toContain('cod');
      expect(err.message).toContain('refund');
    });
  });

  describe('GatewayOperationError', () => {
    it('sets httpStatus 502 + rawResponse', () => {
      const err = new GatewayOperationError('nagad', 'verify', 'bad signature', { raw: true });
      expect(err.code).toBe('GATEWAY_OPERATION_FAILED');
      expect(err.httpStatus).toBe(502);
      expect(err.message).toContain('nagad');
      expect(err.message).toContain('verify');
      expect(err.message).toContain('bad signature');
      expect(err.rawResponse).toEqual({ raw: true });
    });
  });

  describe('GatewayTimeoutError', () => {
    it('sets httpStatus 504 + timeoutMs', () => {
      const err = new GatewayTimeoutError('stripe', 'initiate', 30000);
      expect(err.code).toBe('GATEWAY_TIMEOUT');
      expect(err.httpStatus).toBe(504);
      expect(err.message).toContain('30000');
    });
  });

  describe('GatewaySignatureInvalidError', () => {
    it('sets httpStatus 401', () => {
      const err = new GatewaySignatureInvalidError('paypal');
      expect(err.code).toBe('GATEWAY_SIGNATURE_INVALID');
      expect(err.httpStatus).toBe(401);
    });
  });
});

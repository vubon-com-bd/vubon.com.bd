/**
 * GatewayReferenceVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { GatewayReferenceVO } from '@domain/primitives/gateway-reference.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS } from '@fixtures/ids.fixture';

describe('GatewayReferenceVO', () => {
  describe('create()', () => {
    it('creates valid reference', () => {
      expect(GatewayReferenceVO.create(TEST_IDS.GATEWAY_REF).value).toBe(TEST_IDS.GATEWAY_REF);
    });
    it('accepts dots/colons/dashes', () => {
      expect(GatewayReferenceVO.create('ch_test.ref:123-abc').value).toBe('ch_test.ref:123-abc');
    });
    it('trims whitespace', () => {
      expect(GatewayReferenceVO.create('  ref123  ').value).toBe('ref123');
    });
    it('throws on empty', () => {
      expect(() => GatewayReferenceVO.create('')).toThrow(ValidationError);
    });
    it('throws on > 128 chars', () => {
      expect(() => GatewayReferenceVO.create('a'.repeat(129))).toThrow(ValidationError);
    });
    it('throws on invalid chars', () => {
      expect(() => GatewayReferenceVO.create('ref with space')).toThrow(ValidationError);
      expect(() => GatewayReferenceVO.create('ref@bad')).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      expect(GatewayReferenceVO.reconstitute('x').value).toBe('x');
    });
  });
});

import { describe, it, expect } from '@jest/globals';
import { PaymentIdVO } from '../../../../src/module/domain/value-objects/primitives/payment-id.vo.js';
import { makeUuid } from '../../../helpers/test-factories.js';

describe('PaymentIdVO', () => {
  it('create valid', () => expect(PaymentIdVO.create(makeUuid()).value).toBeDefined());
  it('rejects empty', () => expect(() => PaymentIdVO.create('')).toThrow());
  it('rejects non-UUID', () => expect(() => PaymentIdVO.create('x')).toThrow());
  it('reconstitute', () => expect(PaymentIdVO.reconstitute('any').value).toBe('any'));
});

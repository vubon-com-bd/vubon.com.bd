import { describe, it, expect } from '@jest/globals';
import { OrderIdVO } from '../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { FIXED_ORDER_ID } from '../../../helpers/test-factories.js';

describe('OrderIdVO', () => {
  it('create valid', () => expect(OrderIdVO.create(FIXED_ORDER_ID).value).toBe(FIXED_ORDER_ID));
  it('rejects empty', () => expect(() => OrderIdVO.create('')).toThrow());
  it('rejects non-UUID', () => expect(() => OrderIdVO.create('x')).toThrow());
  it('reconstitute', () => expect(OrderIdVO.reconstitute('any').value).toBe('any'));
});

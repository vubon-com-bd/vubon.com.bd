/**
 * ID VO reconstitute() edge cases
 * @module order-service/test/unit/domain/value-objects/primitives
 *
 * Covers the untested `reconstitute('')` line (line 26) in all ID VOs.
 */
import { describe, it, expect } from '@jest/globals';
import { FulfillmentIdVO } from '@domain/primitives/fulfillment-id.vo.js';
import { HistoryIdVO } from '@domain/primitives/history-id.vo.js';
import { ReturnIdVO } from '@domain/primitives/return-id.vo.js';
import { TrackingIdVO } from '@domain/primitives/tracking-id.vo.js';

describe('ID VO reconstitute() empty string', () => {
  it('FulfillmentIdVO.reconstitute("") returns instance', () => {
    const vo = FulfillmentIdVO.reconstitute('');
    expect(vo.value).toBe('');
  });

  it('HistoryIdVO.reconstitute("") returns instance', () => {
    const vo = HistoryIdVO.reconstitute('');
    expect(vo.value).toBe('');
  });

  it('ReturnIdVO.reconstitute("") returns instance', () => {
    const vo = ReturnIdVO.reconstitute('');
    expect(vo.value).toBe('');
  });

  it('TrackingIdVO.reconstitute("") returns instance', () => {
    const vo = TrackingIdVO.reconstitute('');
    expect(vo.value).toBe('');
  });
});

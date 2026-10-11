import { describe, it, expect } from '@jest/globals';
import { BroadcastIdVO } from '../../../../src/module/domain/value-objects/primitives/broadcast-id.vo.js';
import { makeUuid } from '../../../helpers/test-factories.js';

describe('BroadcastIdVO', () => {
  it('create valid', () => expect(BroadcastIdVO.create(makeUuid()).value).toBeDefined());
  it('rejects empty', () => expect(() => BroadcastIdVO.create('')).toThrow());
  it('rejects bad', () => expect(() => BroadcastIdVO.create('x')).toThrow());
  it('reconstitute', () => expect(BroadcastIdVO.reconstitute('any').value).toBe('any'));
});

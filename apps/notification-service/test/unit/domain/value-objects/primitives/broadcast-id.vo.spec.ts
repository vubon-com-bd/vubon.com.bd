import { BroadcastIdVO } from '@domain/primitives/broadcast-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

describe('BroadcastIdVO', () => {
  it('accepts valid UUID', () => {
    expect(BroadcastIdVO.create(IDS.broadcastId).value).toBe(IDS.broadcastId);
  });
  it('rejects empty', () => {
    expect(() => BroadcastIdVO.create('')).toThrow(ValidationError);
  });
  it('rejects bad format', () => {
    expect(() => BroadcastIdVO.create('xyz')).toThrow(ValidationError);
  });
});

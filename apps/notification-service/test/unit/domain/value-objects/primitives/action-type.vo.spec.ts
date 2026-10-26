import { ActionTypeVO } from '@domain/primitives/action-type.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('ActionTypeVO', () => {
  it('accepts valid', () => {
    expect(ActionTypeVO.create('accept').value).toBe('accept');
  });
  it('normalizes lowercase', () => {
    expect(ActionTypeVO.create('ACCEPT').value).toBe('accept');
  });
  it('rejects invalid', () => {
    expect(() => ActionTypeVO.create('bogus')).toThrow(ValidationError);
  });
  it('isDestructive for delete/unsubscribe/reject', () => {
    expect(ActionTypeVO.create('delete').isDestructive()).toBe(true);
    expect(ActionTypeVO.create('unsubscribe').isDestructive()).toBe(true);
    expect(ActionTypeVO.create('reject').isDestructive()).toBe(true);
    expect(ActionTypeVO.create('accept').isDestructive()).toBe(false);
  });
  it('isEngagement for open/click/view/accept', () => {
    expect(ActionTypeVO.create('open').isEngagement()).toBe(true);
    expect(ActionTypeVO.create('click').isEngagement()).toBe(true);
    expect(ActionTypeVO.create('accept').isEngagement()).toBe(true);
    expect(ActionTypeVO.create('delete').isEngagement()).toBe(false);
  });
});

import { NotificationActionVO } from '@domain/composites/notification-action.vo.js';
import { ActionIdVO } from '@domain/primitives/action-id.vo.js';
import { ActionTypeVO } from '@domain/primitives/action-type.vo.js';
import { ActionUrlVO } from '@domain/primitives/action-url.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const makeProps = (overrides: any = {}) => ({
  id: ActionIdVO.create('btn-accept'),
  type: ActionTypeVO.create('accept'),
  label: 'Accept',
  ...overrides,
});

describe('NotificationActionVO', () => {
  describe('create()', () => {
    it('creates valid action', () => {
      const vo = NotificationActionVO.create(makeProps());
      expect(vo.label).toBe('Accept');
    });

    it('rejects empty label', () => {
      expect(() => NotificationActionVO.create(makeProps({ label: '' }))).toThrow(ValidationError);
    });

    it('rejects whitespace-only label', () => {
      expect(() => NotificationActionVO.create(makeProps({ label: '   ' }))).toThrow(ValidationError);
    });

    it('rejects too-long label (>50)', () => {
      expect(() => NotificationActionVO.create(makeProps({ label: 'a'.repeat(51) }))).toThrow(ValidationError);
    });

    it('accepts optional url', () => {
      const vo = NotificationActionVO.create(
        makeProps({ url: ActionUrlVO.create('https://example.com') }),
      );
      expect(vo.hasUrl()).toBe(true);
    });

    it('accepts payload', () => {
      const vo = NotificationActionVO.create(makeProps({ payload: { k: 'v' } }));
      expect(vo.payload).toEqual({ k: 'v' });
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      const vo = NotificationActionVO.reconstitute(makeProps());
      expect(vo.id).toBeDefined();
    });
  });

  describe('predicates + getters', () => {
    it('isDestructive for delete', () => {
      const vo = NotificationActionVO.create(
        makeProps({ type: ActionTypeVO.create('delete') }),
      );
      expect(vo.isDestructive()).toBe(true);
    });

    it('isEngagement for click', () => {
      const vo = NotificationActionVO.create(
        makeProps({ type: ActionTypeVO.create('click') }),
      );
      expect(vo.isEngagement()).toBe(true);
    });

    it('hasUrl false when missing', () => {
      expect(NotificationActionVO.create(makeProps()).hasUrl()).toBe(false);
    });

    it('payload undefined when not provided', () => {
      expect(NotificationActionVO.create(makeProps()).payload).toBeUndefined();
    });
  });
});

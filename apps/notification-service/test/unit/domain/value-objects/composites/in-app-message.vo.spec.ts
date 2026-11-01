import { InAppMessageVO } from '@domain/composites/in-app-message.vo.js';
import { NotificationActionVO } from '@domain/composites/notification-action.vo.js';
import { ActionIdVO } from '@domain/primitives/action-id.vo.js';
import { ActionTypeVO } from '@domain/primitives/action-type.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const action = () =>
  NotificationActionVO.create({
    id: ActionIdVO.create('a1'),
    type: ActionTypeVO.create('dismiss'),
    label: 'Dismiss',
  });

const makeProps = (overrides: any = {}) => ({
  type: 'toast' as const,
  title: 'Welcome',
  body: 'Welcome back!',
  autoDismiss: true,
  ...overrides,
});

describe('InAppMessageVO', () => {
  describe('create()', () => {
    it('creates valid in-app message', () => {
      const vo = InAppMessageVO.create(makeProps());
      expect(vo.title).toBe('Welcome');
    });

    it('rejects invalid type', () => {
      expect(() => InAppMessageVO.create(makeProps({ type: 'bogus' }))).toThrow(ValidationError);
    });

    it('rejects invalid position', () => {
      expect(() => InAppMessageVO.create(makeProps({ position: 'bogus' }))).toThrow(ValidationError);
    });

    it('accepts valid position', () => {
      const vo = InAppMessageVO.create(makeProps({ position: 'top_center' }));
      expect(vo.position).toBe('top_center');
    });

    it('rejects empty title', () => {
      expect(() => InAppMessageVO.create(makeProps({ title: '' }))).toThrow(ValidationError);
    });

    it('rejects too-long title (>100)', () => {
      expect(() => InAppMessageVO.create(makeProps({ title: 'a'.repeat(101) }))).toThrow(ValidationError);
    });

    it('rejects empty body', () => {
      expect(() => InAppMessageVO.create(makeProps({ body: '' }))).toThrow(ValidationError);
    });

    it('rejects too-long body (>500)', () => {
      expect(() => InAppMessageVO.create(makeProps({ body: 'a'.repeat(501) }))).toThrow(ValidationError);
    });

    it('rejects >2 actions', () => {
      expect(() =>
        InAppMessageVO.create(makeProps({ actions: [action(), action(), action()] })),
      ).toThrow(ValidationError);
    });

    it('rejects displayDuration out of range', () => {
      expect(() =>
        InAppMessageVO.create(makeProps({ displayDurationSeconds: 61 })),
      ).toThrow(ValidationError);
    });

    it('rejects autoDismiss=false with duration', () => {
      expect(() =>
        InAppMessageVO.create(makeProps({ autoDismiss: false, displayDurationSeconds: 5 })),
      ).toThrow(ValidationError);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      const vo = InAppMessageVO.reconstitute(makeProps());
      expect(vo.title).toBe('Welcome');
    });
  });

  describe('predicates', () => {
    it('isModal for modal type', () => {
      expect(InAppMessageVO.reconstitute(makeProps({ type: 'modal' })).isModal()).toBe(true);
    });

    it('isToast for toast type', () => {
      expect(InAppMessageVO.reconstitute(makeProps()).isToast()).toBe(true);
    });

    it('isBanner for banner type', () => {
      expect(InAppMessageVO.reconstitute(makeProps({ type: 'banner' })).isBanner()).toBe(true);
    });

    it('hasActions false when none', () => {
      expect(InAppMessageVO.reconstitute(makeProps()).hasActions()).toBe(false);
    });

    it('hasActions true when actions exist', () => {
      const vo = InAppMessageVO.reconstitute(makeProps({ actions: [action()] }));
      expect(vo.hasActions()).toBe(true);
      expect(vo.actionCount).toBe(1);
    });

    it('effectiveDuration uses default when undefined', () => {
      const vo = InAppMessageVO.reconstitute(makeProps());
      expect(vo.effectiveDuration).toBe(5); // default from IN_APP.DISPLAY_DURATION_SECONDS
    });

    it('effectiveDuration uses provided value', () => {
      const vo = InAppMessageVO.reconstitute(makeProps({ displayDurationSeconds: 10 }));
      expect(vo.effectiveDuration).toBe(10);
    });
  });

  describe('getters', () => {
    const vo = InAppMessageVO.reconstitute(makeProps());
    it('exposes all fields', () => {
      expect(vo.type).toBe('toast');
      expect(vo.position).toBeUndefined();
      expect(vo.title).toBe('Welcome');
      expect(vo.body).toBe('Welcome back!');
      expect(vo.imageUrl).toBeUndefined();
      expect(vo.iconUrl).toBeUndefined();
      expect(vo.actions).toBeUndefined();
      expect(vo.displayDurationSeconds).toBeUndefined();
      expect(vo.autoDismiss).toBe(true);
    });
  });
});

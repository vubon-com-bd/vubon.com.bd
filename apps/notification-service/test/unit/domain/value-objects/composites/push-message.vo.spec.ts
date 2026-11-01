import { PushMessageVO } from '@domain/composites/push-message.vo.js';
import { NotificationActionVO } from '@domain/composites/notification-action.vo.js';
import { NotificationPriorityVO } from '@domain/primitives/notification-priority.vo.js';
import { ActionIdVO } from '@domain/primitives/action-id.vo.js';
import { ActionTypeVO } from '@domain/primitives/action-type.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const action = () =>
  NotificationActionVO.create({
    id: ActionIdVO.create('a1'),
    type: ActionTypeVO.create('open'),
    label: 'Open',
  });

const makeProps = (overrides: any = {}) => ({
  title: 'New message',
  body: 'You have a new message',
  priority: NotificationPriorityVO.normal(),
  silent: false,
  ...overrides,
});

describe('PushMessageVO', () => {
  describe('create()', () => {
    it('creates valid push', () => {
      const vo = PushMessageVO.create(makeProps());
      expect(vo.title).toBe('New message');
    });

    it('rejects empty title', () => {
      expect(() => PushMessageVO.create(makeProps({ title: '' }))).toThrow(ValidationError);
    });

    it('rejects too-long title (>65)', () => {
      expect(() => PushMessageVO.create(makeProps({ title: 'a'.repeat(66) }))).toThrow(ValidationError);
    });

    it('rejects empty body', () => {
      expect(() => PushMessageVO.create(makeProps({ body: '' }))).toThrow(ValidationError);
    });

    it('rejects too-long body (>240)', () => {
      expect(() => PushMessageVO.create(makeProps({ body: 'a'.repeat(241) }))).toThrow(ValidationError);
    });

    it('rejects >3 actions', () => {
      expect(() =>
        PushMessageVO.create(makeProps({ actions: [action(), action(), action(), action()] })),
      ).toThrow(ValidationError);
    });

    it('rejects silent with actions', () => {
      expect(() =>
        PushMessageVO.create(makeProps({ silent: true, actions: [action()] })),
      ).toThrow(ValidationError);
    });

    it('rejects data >4KB', () => {
      expect(() =>
        PushMessageVO.create(makeProps({ data: { k: 'a'.repeat(5000) } })),
      ).toThrow(ValidationError);
    });

    it('accepts imageUrl + iconUrl', () => {
      const vo = PushMessageVO.create(
        makeProps({ imageUrl: 'https://x.com/i.png', iconUrl: 'https://x.com/i.ico' }),
      );
      expect(vo.hasImage()).toBe(true);
      expect(vo.iconUrl).toBe('https://x.com/i.ico');
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      const vo = PushMessageVO.reconstitute(makeProps());
      expect(vo.title).toBe('New message');
    });
  });

  describe('predicates', () => {
    it('hasImage false when no image', () => {
      expect(PushMessageVO.reconstitute(makeProps()).hasImage()).toBe(false);
    });

    it('hasActions true when actions exist', () => {
      const vo = PushMessageVO.reconstitute(makeProps({ actions: [action()] }));
      expect(vo.hasActions()).toBe(true);
      expect(vo.actionCount).toBe(1);
    });

    it('hasActions false when none', () => {
      expect(PushMessageVO.reconstitute(makeProps()).hasActions()).toBe(false);
    });
  });

  describe('getters', () => {
    const vo = PushMessageVO.reconstitute(makeProps());
    it('exposes all fields', () => {
      expect(vo.title).toBe('New message');
      expect(vo.body).toBe('You have a new message');
      expect(vo.imageUrl).toBeUndefined();
      expect(vo.iconUrl).toBeUndefined();
      expect(vo.data).toBeUndefined();
      expect(vo.actions).toBeUndefined();
      expect(vo.priority).toBeDefined();
      expect(vo.silent).toBe(false);
    });
  });
});

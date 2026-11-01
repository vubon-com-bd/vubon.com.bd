import { NotificationContentVO } from '@domain/composites/notification-content.vo.js';
import { NotificationSubjectVO } from '@domain/primitives/notification-subject.vo.js';
import { NotificationBodyVO } from '@domain/primitives/notification-body.vo.js';
import { NotificationDataVO } from '@domain/primitives/notification-data.vo.js';
import { ActionUrlVO } from '@domain/primitives/action-url.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const makeProps = (overrides: any = {}) => ({
  subject: NotificationSubjectVO.create('Subject'),
  body: NotificationBodyVO.create('Body content'),
  data: NotificationDataVO.create({}),
  ...overrides,
});

describe('NotificationContentVO', () => {
  describe('create()', () => {
    it('creates valid content', () => {
      const vo = NotificationContentVO.create(makeProps());
      expect(vo.subject.value).toBe('Subject');
      expect(vo.body.value).toBe('Body content');
    });

    it('accepts optional imageUrl', () => {
      const vo = NotificationContentVO.create(
        makeProps({ imageUrl: ActionUrlVO.create('https://example.com/img.png') }),
      );
      expect(vo.hasImage()).toBe(true);
    });

    it('accepts optional actionUrl', () => {
      const vo = NotificationContentVO.create(
        makeProps({ actionUrl: ActionUrlVO.create('https://example.com') }),
      );
      expect(vo.hasAction()).toBe(true);
    });

    it('accepts iconUrl', () => {
      const vo = NotificationContentVO.create(
        makeProps({ iconUrl: ActionUrlVO.create('https://example.com/icon.png') }),
      );
      expect(vo.iconUrl).toBeDefined();
    });

    it('rejects empty body (via reconstitute bypass + re-validate)', () => {
      // body.isEmpty is base VO check
      expect(() =>
        NotificationContentVO.create(
          makeProps({ body: NotificationBodyVO.reconstitute('') }),
        ),
      ).toThrow(ValidationError);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      const vo = NotificationContentVO.reconstitute(makeProps());
      expect(vo.subject.value).toBe('Subject');
    });
  });

  describe('getters + predicates', () => {
    const vo = NotificationContentVO.create(makeProps());

    it('hasImage false when missing', () => {
      expect(vo.hasImage()).toBe(false);
    });

    it('hasAction false when missing', () => {
      expect(vo.hasAction()).toBe(false);
    });

    it('imageUrl undefined when missing', () => {
      expect(vo.imageUrl).toBeUndefined();
    });

    it('iconUrl undefined when missing', () => {
      expect(vo.iconUrl).toBeUndefined();
    });

    it('actionUrl undefined when missing', () => {
      expect(vo.actionUrl).toBeUndefined();
    });

    it('plainTextPreview truncates long body', () => {
      const longBody = NotificationBodyVO.create('a'.repeat(200));
      const longVo = NotificationContentVO.create(makeProps({ body: longBody }));
      expect(longVo.plainTextPreview.length).toBeLessThanOrEqual(100);
    });

    it('plainTextPreview collapses whitespace', () => {
      const body = NotificationBodyVO.create('a    b\n\nc');
      const preview = NotificationContentVO.create(makeProps({ body })).plainTextPreview;
      expect(preview).toBe('a b c');
    });

    it('data getter', () => {
      const voWithData = NotificationContentVO.create(
        makeProps({ data: NotificationDataVO.create({ k: 'v' }) }),
      );
      expect(voWithData.data.value).toEqual({ k: 'v' });
    });
  });
});

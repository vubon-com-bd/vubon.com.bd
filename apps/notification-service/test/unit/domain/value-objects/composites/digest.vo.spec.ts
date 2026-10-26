import { DigestVO } from '@domain/composites/digest.vo.js';
import { DigestIdVO } from '@domain/primitives/digest-id.vo.js';
import { DigestStatusVO } from '@domain/primitives/digest-status.vo.js';
import { DigestTypeVO } from '@domain/primitives/digest-type.vo.js';
import { DigestPeriodVO } from '@domain/primitives/digest-period.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';

const makeProps = (overrides: any = {}) => ({
  id: DigestIdVO.create(IDS.digestId),
  userId: UserIdVO.create(IDS.userId),
  status: DigestStatusVO.pending(),
  type: DigestTypeVO.create('summary'),
  period: DigestPeriodVO.create({
    frequency: 'daily',
    periodStart: DATES.dayAgo,
    periodEnd: DATES.now,
  }),
  categories: ['order'],
  sendHour: 9,
  timezone: 'UTC',
  itemCount: 5,
  ...overrides,
});

describe('DigestVO', () => {
  describe('create()', () => {
    it('creates valid digest', () => {
      const vo = DigestVO.create(makeProps());
      expect(vo.itemCount).toBe(5);
    });

    it('rejects invalid sendHour <0', () => {
      expect(() => DigestVO.create(makeProps({ sendHour: -1 }))).toThrow(ValidationError);
    });

    it('rejects invalid sendHour >23', () => {
      expect(() => DigestVO.create(makeProps({ sendHour: 24 }))).toThrow(ValidationError);
    });

    it('rejects non-integer sendHour', () => {
      expect(() => DigestVO.create(makeProps({ sendHour: 9.5 }))).toThrow(ValidationError);
    });

    it('rejects itemCount > max (50)', () => {
      expect(() => DigestVO.create(makeProps({ itemCount: 51 }))).toThrow(ValidationError);
    });

    it('rejects itemCount>0 with no categories', () => {
      expect(() =>
        DigestVO.create(makeProps({ categories: [], itemCount: 5 })),
      ).toThrow(ValidationError);
    });

    it('rejects ready without generatedAt', () => {
      expect(() =>
        DigestVO.create(makeProps({ status: DigestStatusVO.ready() })),
      ).toThrow(ValidationError);
    });

    it('rejects sent without sentAt', () => {
      expect(() =>
        DigestVO.create(makeProps({ status: DigestStatusVO.sent() })),
      ).toThrow(ValidationError);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      const vo = DigestVO.reconstitute(makeProps());
      expect(vo.id).toBeDefined();
    });
  });

  describe('status predicates', () => {
    it.each([
      ['pending', 'isPending'],
      ['generating', 'isGenerating'],
      ['ready', 'isReady'],
      ['sent', 'isSent'],
      ['failed', 'isFailed'],
      ['cancelled', 'isCancelled'],
    ] as const)('%s → %s', (status, pred) => {
      const vo = DigestVO.reconstitute(
        makeProps({ status: DigestStatusVO.create(status) }),
      );
      expect((vo[pred] as () => boolean)()).toBe(true);
    });
  });

  describe('isEmpty / canBeSent', () => {
    it('isEmpty when itemCount 0', () => {
      const vo = DigestVO.reconstitute(makeProps({ itemCount: 0 }));
      expect(vo.isEmpty).toBe(true);
    });

    it('canBeSent when ready + items', () => {
      const vo = DigestVO.reconstitute(
        makeProps({ status: DigestStatusVO.ready(), itemCount: 5 }),
      );
      expect(vo.canBeSent).toBe(true);
    });

    it('canBeSent false when empty', () => {
      const vo = DigestVO.reconstitute(
        makeProps({ status: DigestStatusVO.ready(), itemCount: 0 }),
      );
      expect(vo.canBeSent).toBe(false);
    });
  });

  describe('hasCategory', () => {
    const vo = DigestVO.reconstitute(makeProps());
    it('true for existing', () => {
      expect(vo.hasCategory('order')).toBe(true);
    });
    it('false for missing', () => {
      expect(vo.hasCategory('marketing')).toBe(false);
    });
  });

  describe('withStatus / withItemCount / withGeneratedAt', () => {
    const base = DigestVO.reconstitute(makeProps());

    it('withStatus returns new VO', () => {
      const updated = base.withStatus(DigestStatusVO.generating());
      expect(updated.isGenerating()).toBe(true);
    });

    it('withItemCount updates', () => {
      const updated = base.withItemCount(3);
      expect(updated.itemCount).toBe(3);
    });

    it('withGeneratedAt updates', () => {
      const updated = base.withGeneratedAt(DATES.now);
      expect(updated.generatedAt).toBe(DATES.now);
    });
  });

  describe('getters', () => {
    const vo = DigestVO.reconstitute(makeProps());
    it('exposes all fields', () => {
      expect(vo.id).toBeDefined();
      expect(vo.userId).toBeDefined();
      expect(vo.status).toBeDefined();
      expect(vo.type).toBeDefined();
      expect(vo.period).toBeDefined();
      expect(vo.categories).toEqual(['order']);
      expect(vo.sendHour).toBe(9);
      expect(vo.timezone).toBe('UTC');
      expect(vo.itemCount).toBe(5);
      expect(vo.generatedAt).toBeUndefined();
      expect(vo.sentAt).toBeUndefined();
      expect(vo.lastDeliveredAt).toBeUndefined();
    });
  });
});

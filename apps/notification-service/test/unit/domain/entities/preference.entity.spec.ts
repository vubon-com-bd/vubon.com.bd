import { PreferenceEntity } from '@domain/entities/preference.entity.js';
import { PreferenceVO } from '@domain/composites/preference.vo.js';
import { PreferenceIdVO } from '@domain/primitives/preference-id.vo.js';
import { PreferenceTypeVO } from '@domain/primitives/preference-type.vo.js';
import { PreferenceOptionVO } from '@domain/primitives/preference-option.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW = new Date().toISOString();

const opt = (channel: string, enabled = true, category?: string) =>
  PreferenceOptionVO.create({ channel: channel as any, enabled, category });

const makeVO = (overrides: any = {}) =>
  PreferenceVO.create({
    id: PreferenceIdVO.create(IDS.preferenceId),
    userId: UserIdVO.create(IDS.userId),
    type: PreferenceTypeVO.create('channel_specific'),
    options: [opt('email', true), opt('sms', false), opt('push', true)],
    quietHoursEnabled: false,
    timezone: 'UTC',
    locale: 'en',
    locked: false,
    ...overrides,
  });

describe('PreferenceEntity (Aggregate Root)', () => {
  describe('create()', () => {
    it('creates with event', () => {
      const entity = PreferenceEntity.create({
        id: PreferenceIdVO.create(IDS.preferenceId),
        vo: makeVO(),
        now: NOW,
      });
      expect(entity.id).toBe(IDS.preferenceId);
      expect(entity.domainEvents.length).toBe(1);
    });
  });

  describe('reconstitute()', () => {
    it('rebuilds from state', () => {
      const entity = PreferenceEntity.reconstitute({
        id: IDS.preferenceId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO() },
      });
      expect(entity.id).toBe(IDS.preferenceId);
    });
  });

  describe('isChannelEnabled / isCategoryEnabled', () => {
    it('delegates to VO', () => {
      const entity = PreferenceEntity.reconstitute({
        id: IDS.preferenceId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO() },
      });
      expect(entity.isChannelEnabled('email')).toBe(true);
      expect(entity.isChannelEnabled('sms')).toBe(false);
      expect(entity.isCategoryEnabled('email', 'order')).toBe(true);
    });
  });

  describe('isInQuietHours', () => {
    it('delegates to VO', () => {
      const entity = PreferenceEntity.reconstitute({
        id: IDS.preferenceId,
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          vo: makeVO({ quietHoursEnabled: true, quietHoursStart: 22, quietHoursEnd: 8 }),
        },
      });
      expect(entity.isInQuietHours(23)).toBe(true);
      expect(entity.isInQuietHours(10)).toBe(false);
    });
  });

  describe('optOut()', () => {
    it('disables existing channel', () => {
      const entity = PreferenceEntity.reconstitute({
        id: IDS.preferenceId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO() },
      });
      entity.optOut('email', undefined, NOW);
      expect(entity.isChannelEnabled('email')).toBe(false);
    });

    it('rejects optOut on missing channel', () => {
      const entity = PreferenceEntity.reconstitute({
        id: IDS.preferenceId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO() },
      });
      expect(() => entity.optOut('webhook', undefined, NOW)).toThrow(BusinessRuleError);
    });

    it('rejects optOut when locked', () => {
      const entity = PreferenceEntity.reconstitute({
        id: IDS.preferenceId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO({ locked: true }) },
      });
      expect(() => entity.optOut('email', undefined, NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('optIn()', () => {
    it('enables existing channel', () => {
      const entity = PreferenceEntity.reconstitute({
        id: IDS.preferenceId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO() },
      });
      entity.optIn('sms', undefined, NOW);
      expect(entity.isChannelEnabled('sms')).toBe(true);
    });

    it('rejects optIn when locked', () => {
      const entity = PreferenceEntity.reconstitute({
        id: IDS.preferenceId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO({ locked: true }) },
      });
      expect(() => entity.optIn('sms', undefined, NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('changeQuietHours()', () => {
    it('updates quiet hours', () => {
      const entity = PreferenceEntity.reconstitute({
        id: IDS.preferenceId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO() },
      });
      entity.changeQuietHours(true, 22, 8, NOW);
      expect(entity.isInQuietHours(23)).toBe(true);
    });

    it('rejects changeQuietHours when locked', () => {
      const entity = PreferenceEntity.reconstitute({
        id: IDS.preferenceId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO({ locked: true }) },
      });
      expect(() => entity.changeQuietHours(true, 22, 8, NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('lock()', () => {
    it('locks preference + emits event', () => {
      const entity = PreferenceEntity.reconstitute({
        id: IDS.preferenceId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO() },
      });
      entity.lock('admin action', NOW);
      expect(entity.locked).toBe(true);
    });

    it('no-op if already locked', () => {
      const entity = PreferenceEntity.reconstitute({
        id: IDS.preferenceId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO({ locked: true }) },
      });
      const eventsBefore = entity.domainEvents.length;
      entity.lock('again', NOW);
      expect(entity.domainEvents.length).toBe(eventsBefore);
    });
  });

  describe('getters', () => {
    it('exposes all fields', () => {
      const entity = PreferenceEntity.reconstitute({
        id: IDS.preferenceId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO() },
      });
      expect(entity.id).toBe(IDS.preferenceId);
      expect(entity.preferenceId.value).toBe(IDS.preferenceId);
      expect(entity.vo).toBeDefined();
      expect(entity.userId.value).toBe(IDS.userId);
      expect(entity.locked).toBe(false);
    });
  });
});

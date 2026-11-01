import { PreferenceMatrixEntity } from '@domain/entities/preference-matrix.entity.js';
import { PreferenceMatrixVO } from '@domain/composites/preference-matrix.vo.js';
import { PreferenceOptionVO } from '@domain/primitives/preference-option.vo.js';
import { PreferenceIdVO } from '@domain/primitives/preference-id.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW = new Date().toISOString();

const opt = (channel: string, enabled = true) =>
  PreferenceOptionVO.create({ channel: channel as any, enabled });

const matrix = () =>
  PreferenceMatrixVO.create({
    userId: UserIdVO.create(IDS.userId),
    options: [opt('email', true), opt('sms', false)],
    quietHoursEnabled: false,
    timezone: 'UTC',
    locale: 'en',
  });

describe('PreferenceMatrixEntity (child)', () => {
  describe('create()', () => {
    it('creates matrix entity', () => {
      const entity = PreferenceMatrixEntity.create({
        id: 'pm-1',
        preferenceId: PreferenceIdVO.create(IDS.preferenceId),
        matrix: matrix(),
        now: NOW,
      });
      expect(entity.id).toBe('pm-1');
    });
  });

  describe('reconstitute()', () => {
    it('restores from DB', () => {
      const entity = PreferenceMatrixEntity.reconstitute({
        id: 'pm-1',
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          preferenceId: PreferenceIdVO.create(IDS.preferenceId),
          matrix: matrix(),
        },
      });
      expect(entity.id).toBe('pm-1');
    });
  });

  describe('getters', () => {
    it('exposes fields', () => {
      const entity = PreferenceMatrixEntity.create({
        id: 'pm-1',
        preferenceId: PreferenceIdVO.create(IDS.preferenceId),
        matrix: matrix(),
        now: NOW,
      });
      expect(entity.preferenceId.value).toBe(IDS.preferenceId);
      expect(entity.matrix).toBeDefined();
    });
  });
});

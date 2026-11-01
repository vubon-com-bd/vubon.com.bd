import { BroadcastAudienceVO } from '@domain/primitives/broadcast-audience.vo.js';
import { InvalidBroadcastAudienceError } from '@domain/errors/broadcast.errors.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

describe('BroadcastAudienceVO', () => {
  describe('create()', () => {
    it('accepts ALL target with no userIds', () => {
      const vo = BroadcastAudienceVO.create({ target: 'all' });
      expect(vo.target).toBe('all');
      expect(vo.isCustom()).toBe(false);
    });

    it('accepts CUSTOM with userIds', () => {
      const vo = BroadcastAudienceVO.create({
        target: 'custom',
        userIds: [IDS.userId, IDS.userId2],
      });
      expect(vo.userIds?.length).toBe(2);
      expect(vo.isCustom()).toBe(true);
    });

    it('accepts CUSTOM with segmentId', () => {
      const vo = BroadcastAudienceVO.create({
        target: 'custom',
        segmentId: 'seg-1',
      });
      expect(vo.segmentId).toBe('seg-1');
    });

    it('rejects CUSTOM without userIds or segmentId', () => {
      expect(() =>
        BroadcastAudienceVO.create({ target: 'custom' }),
      ).toThrow(ValidationError);
    });

    it('rejects invalid target', () => {
      expect(() =>
        BroadcastAudienceVO.create({ target: 'garbage' as any }),
      ).toThrow(InvalidBroadcastAudienceError);
    });
  });

  describe('estimatedSize()', () => {
    it('returns userIds length', () => {
      const vo = BroadcastAudienceVO.create({
        target: 'custom',
        userIds: [IDS.userId, IDS.userId2],
      });
      expect(vo.estimatedSize()).toBe(2);
    });

    it('returns 0 if no userIds', () => {
      const vo = BroadcastAudienceVO.create({ target: 'all' });
      expect(vo.estimatedSize()).toBe(0);
    });
  });
});

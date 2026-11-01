import { DigestBuilderService } from '@domain/services/digest-builder.service.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW = new Date().toISOString();

const item = (id: string, priority = 'normal', cat = 'order') => ({
  notificationId: id,
  category: cat,
  priority,
  title: `Title ${id}`,
  body: `Body for ${id}`,
  occurredAt: NOW,
});

describe('DigestBuilderService', () => {
  describe('build()', () => {
    it('builds digest from items', () => {
      const result = DigestBuilderService.build({
        items: [item(IDS.notificationId), item(IDS.notificationId2)],
      });
      expect(result.items.length).toBe(2);
    });

    it('sorts by priority descending', () => {
      const result = DigestBuilderService.build({
        items: [
          item(IDS.notificationId, 'low'),
          item(IDS.notificationId2, 'critical'),
          item(IDS.notificationId3, 'normal'),
        ],
      });
      expect(result.items[0]!.priority.value).toBe('critical');
    });

    it('groups by category', () => {
      const result = DigestBuilderService.build({
        items: [
          item(IDS.notificationId, 'normal', 'order'),
          item(IDS.notificationId2, 'normal', 'payment'),
          item(IDS.notificationId3, 'normal', 'order'),
        ],
        groupByCategory: true,
      });
      expect(result.groups['order']?.length).toBe(2);
      expect(result.groups['payment']?.length).toBe(1);
    });

    it('filters unread only', () => {
      const result = DigestBuilderService.build({
        items: [item(IDS.notificationId), item(IDS.notificationId2)],
        unreadOnly: true,
        isReadMap: { [IDS.notificationId]: true },
      });
      expect(result.items.length).toBe(1);
    });

    it('respects maxItems', () => {
      const result = DigestBuilderService.build({
        items: [
          item(IDS.notificationId),
          item(IDS.notificationId2),
          item(IDS.notificationId3),
        ],
        maxItems: 2,
      });
      expect(result.items.length).toBe(2);
    });

    it('returns empty for no items', () => {
      const result = DigestBuilderService.build({ items: [] });
      expect(result.items).toEqual([]);
    });

    it('throws on invalid input', () => {
      expect(() =>
        DigestBuilderService.build({ items: 'not-array' as any }),
      ).toThrow(BusinessRuleError);
    });
  });
});

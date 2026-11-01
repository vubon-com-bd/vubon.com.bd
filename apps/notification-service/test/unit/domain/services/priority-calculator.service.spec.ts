import { PriorityCalculatorService } from '@domain/services/priority-calculator.service.js';
import { NotificationPriorityVO } from '@domain/primitives/notification-priority.vo.js';
import { NotificationCategoryVO } from '@domain/primitives/notification-category.vo.js';
import { NotificationChannelVO } from '@domain/primitives/notification-channel.vo.js';

describe('PriorityCalculatorService', () => {
  describe('calculate()', () => {
    it('computes score for normal priority', () => {
      const result = PriorityCalculatorService.calculate({
        priority: NotificationPriorityVO.normal(),
        category: NotificationCategoryVO.create('order'),
        channel: NotificationChannelVO.email(),
      });
      expect(result.score).toBeGreaterThan(0);
      expect(result.weight).toBe(3);
    });

    it('critical security scores higher than normal order', () => {
      const critical = PriorityCalculatorService.calculate({
        priority: NotificationPriorityVO.critical(),
        category: NotificationCategoryVO.create('security'),
        channel: NotificationChannelVO.push(),
      });
      const normal = PriorityCalculatorService.calculate({
        priority: NotificationPriorityVO.normal(),
        category: NotificationCategoryVO.create('marketing'),
        channel: NotificationChannelVO.email(),
      });
      expect(critical.score).toBeGreaterThan(normal.score);
    });

    it('applies age decay for old notifications', () => {
      const fresh = PriorityCalculatorService.calculate({
        priority: NotificationPriorityVO.normal(),
        category: NotificationCategoryVO.create('order'),
        channel: NotificationChannelVO.email(),
        createdAt: new Date().toISOString(),
      });
      const old = PriorityCalculatorService.calculate({
        priority: NotificationPriorityVO.normal(),
        category: NotificationCategoryVO.create('order'),
        channel: NotificationChannelVO.email(),
        createdAt: new Date(Date.now() - 7 * 86_400_000).toISOString(),
      });
      expect(old.score).toBeLessThanOrEqual(fresh.score);
    });

    it('includes reasons for urgent', () => {
      const result = PriorityCalculatorService.calculate({
        priority: NotificationPriorityVO.critical(),
        category: NotificationCategoryVO.create('security'),
        channel: NotificationChannelVO.sms(),
      });
      expect(result.reasons.length).toBeGreaterThan(0);
    });

    it('caps score at 100', () => {
      const result = PriorityCalculatorService.calculate({
        priority: NotificationPriorityVO.critical(),
        category: NotificationCategoryVO.create('security'),
        channel: NotificationChannelVO.sms(),
      });
      expect(result.score).toBeLessThanOrEqual(100);
    });
  });

  describe('suggestPriority()', () => {
    it('suggests critical for score >= 80', () => {
      expect(PriorityCalculatorService.suggestPriority(85).value).toBe('critical');
    });

    it('suggests high for score 60-79', () => {
      expect(PriorityCalculatorService.suggestPriority(65).value).toBe('high');
    });

    it('suggests normal for score 40-59', () => {
      expect(PriorityCalculatorService.suggestPriority(50).value).toBe('normal');
    });

    it('suggests low for score 20-39', () => {
      expect(PriorityCalculatorService.suggestPriority(25).value).toBe('low');
    });

    it('suggests silent for score < 20', () => {
      expect(PriorityCalculatorService.suggestPriority(5).value).toBe('silent');
    });
  });
});

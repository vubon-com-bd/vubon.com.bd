import { NotificationPriorityVO } from '../value-objects/primitives/notification-priority.vo';
import { NOTIFICATION_PRIORITY_WEIGHT } from '@vubon/shared-constants/platform/notification';

export interface PriorityInput {
  readonly type: string;
  readonly category: string;
}

export class PriorityCalculatorService {
  calculate(input: PriorityInput): NotificationPriorityVO {
    if (input.category === 'security') {
      return NotificationPriorityVO.create('critical');
    }
    if (input.type === 'transactional' || input.category === 'payment') {
      return NotificationPriorityVO.create('high');
    }
    if (input.category === 'marketing') {
      return NotificationPriorityVO.create('low');
    }
    return NotificationPriorityVO.create('normal');
  }

  weight(priority: NotificationPriorityVO): number {
    return (
      NOTIFICATION_PRIORITY_WEIGHT[
        priority.value as keyof typeof NOTIFICATION_PRIORITY_WEIGHT
      ] ?? 3
    );
  }
}

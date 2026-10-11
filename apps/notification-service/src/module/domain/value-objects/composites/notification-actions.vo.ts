/**
 * NotificationActionsVO — collection of actions (max 5)
 * @module notification-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { NotificationActionEntryVO } from './notification-action-entry.vo.js';

const MAX_ACTIONS = 5;

export type NotificationActionsValue = readonly NotificationActionEntryVO[];

export class NotificationActionsVO extends BaseVO<NotificationActionsValue> {
  private constructor(value: NotificationActionsValue) {
    super(value);
  }

  static create(actions: readonly NotificationActionEntryVO[]): NotificationActionsVO {
    if (!Array.isArray(actions)) {
      throw new ValidationError('Actions must be an array', 'actions');
    }
    if (actions.length > MAX_ACTIONS) {
      throw new ValidationError(`Cannot exceed ${MAX_ACTIONS} actions`, 'actions');
    }
    const labels = new Set<string>();
    for (const a of actions) {
      if (labels.has(a.label)) {
        throw new ValidationError(`Duplicate action label: ${a.label}`, 'actions');
      }
      labels.add(a.label);
    }
    return new NotificationActionsVO(Object.freeze([...actions]));
  }

  static empty(): NotificationActionsVO {
    return new NotificationActionsVO(Object.freeze([]));
  }

  static reconstitute(actions: NotificationActionsValue): NotificationActionsVO {
    return new NotificationActionsVO(actions);
  }

  get count(): number { return this.value.length; }
  get actions(): readonly NotificationActionEntryVO[] { return this.value; }

  isEmpty(): boolean { return this.value.length === 0; }

  primaryAction(): NotificationActionEntryVO | undefined {
    return this.value.find((a) => a.type.isPrimary());
  }

  hasDangerAction(): boolean {
    return this.value.some((a) => a.type.isDanger());
  }
}

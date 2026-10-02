/**
 * RemoveAttributeCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class RemoveAttributeCommand extends BaseCommand {
  readonly type = 'attribute.remove';
  constructor(
    public readonly attributeId: string,
    public readonly actorId: string,
  ) { super(); }
}

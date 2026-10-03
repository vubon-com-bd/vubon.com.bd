/**
 * UpdateVisibilityCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ProfileVisibilitySchemaType } from '@vubon/shared-schemas/user';

export class UpdateVisibilityCommand extends BaseCommand {
  readonly type = 'profile.visibility.update';

  constructor(
    public readonly userId: string,
    public readonly visibility: ProfileVisibilitySchemaType
  ) {
    super();
  }
}

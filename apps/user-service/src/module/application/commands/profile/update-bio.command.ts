/**
 * UpdateBioCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class UpdateBioCommand extends BaseCommand {
  readonly type = 'profile.bio.update';

  constructor(
    public readonly userId: string,
    public readonly bio: string
  ) {
    super();
  }
}

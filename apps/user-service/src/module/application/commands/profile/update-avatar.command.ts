/**
 * UpdateAvatarCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class UpdateAvatarCommand extends BaseCommand {
  readonly type = 'profile.avatar.update';

  constructor(
    public readonly userId: string,
    public readonly avatarUrl: string,
    public readonly fileSizeMB?: number,
    public readonly mimeType?: string
  ) {
    super();
  }
}

import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class AttachFileCommand extends BaseCommand {
  readonly type = 'support.message.attach-file';

  constructor(
    public readonly messageId: string,
    public readonly url: string,
    public readonly type_: 'image' | 'video' | 'audio' | 'document' | 'archive' | 'other',
    public readonly size: number,
  ) {
    super();
  }
}

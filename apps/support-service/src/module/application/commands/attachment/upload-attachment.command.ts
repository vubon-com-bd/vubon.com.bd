import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UploadAttachmentCommand extends BaseCommand {
  readonly type = 'support.attachment.upload';

  constructor(
    public readonly url: string,
    public readonly type_: 'image' | 'video' | 'audio' | 'document' | 'archive' | 'other',
    public readonly size: number,
    public readonly ticketId?: string,
    public readonly messageId?: string,
  ) {
    super();
  }
}

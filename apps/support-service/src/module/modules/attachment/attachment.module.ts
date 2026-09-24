import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AttachmentController } from '../../interfaces/controllers/rest/attachment.controller';
import { UploadAttachmentHandler } from '../../application/commands/attachment/upload-attachment.handler';
import { AttachmentService } from '../../application/services/impl/attachment.service';

@Module({
  imports: [CqrsModule],
  controllers: [AttachmentController],
  providers: [UploadAttachmentHandler, AttachmentService],
  exports: [AttachmentService],
})
export class AttachmentModule {}

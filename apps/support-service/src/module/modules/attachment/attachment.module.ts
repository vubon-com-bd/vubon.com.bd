/**
 * AttachmentModule
 * @module support-service/modules/attachment
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

@Module({ imports: [CqrsModule] })
export class AttachmentModule {}

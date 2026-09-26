/**
 * TicketAttachmentModule
 * @module support-service/modules/ticket-attachment
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

@Module({ imports: [CqrsModule] })
export class TicketAttachmentModule {}

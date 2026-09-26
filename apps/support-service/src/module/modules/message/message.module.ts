/**
 * MessageModule — generic message context
 * @module support-service/modules/message
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

@Module({ imports: [CqrsModule] })
export class MessageModule {}

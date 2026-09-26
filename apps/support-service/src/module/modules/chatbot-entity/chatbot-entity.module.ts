/**
 * ChatbotEntityModule
 * @module support-service/modules/chatbot-entity
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

@Module({ imports: [CqrsModule] })
export class ChatbotEntityModule {}

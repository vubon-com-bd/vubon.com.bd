/**
 * ChatbotIntentModule
 * @module support-service/modules/chatbot-intent
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

@Module({ imports: [CqrsModule] })
export class ChatbotIntentModule {}

/**
 * support-service root module
 * @module support-service/app.module
 *
 * Rule: KernelCommonModule aggregator (Prisma, Redis, Queue, CQRS, Guards,
 *       Interceptors, Filters, Pipes, Config) + Infrastructure + Feature modules
 */
import { Module } from '@nestjs/common';

// Kernel aggregator — imports everything kernel-level
import { KernelCommonModule } from '@vubon/shared-kernel/modules/common';

// Infrastructure (own)
import { SupportInfrastructureModule } from './module/infrastructure/infrastructure.module';

// App-level common
import { SharedServicesModule } from './module/modules/common';

// Feature modules
import {
  TicketModule,
  TicketMessageModule,
  TicketAttachmentModule,
  TicketEscalationModule,
  TicketSatisfactionModule,
  ConversationModule,
  MessageModule,
  AttachmentModule,
  FaqModule,
  KnowledgeBaseModule,
  FeedbackModule,
  ComplaintModule,
  SurveyModule,
  LiveChatModule,
  ChatbotModule,
  ChatbotIntentModule,
  ChatbotEntityModule,
  AgentModule,
  TeamModule,
  SlaModule,
  RuleModule,
  AutomationModule,
  TemplateModule,
  WebSocketModule,
} from './module/modules';

@Module({
  imports: [
    // Kernel — Prisma, Redis, Queue, CQRS, Guards, Interceptors, Filters, Pipes, Config
    KernelCommonModule,

    // Infrastructure (own — global)
    SupportInfrastructureModule,

    // App-level shared services
    SharedServicesModule,

    // Feature modules
    TicketModule,
    TicketMessageModule,
    TicketAttachmentModule,
    TicketEscalationModule,
    TicketSatisfactionModule,
    ConversationModule,
    MessageModule,
    AttachmentModule,
    FaqModule,
    KnowledgeBaseModule,
    FeedbackModule,
    ComplaintModule,
    SurveyModule,
    LiveChatModule,
    ChatbotModule,
    ChatbotIntentModule,
    ChatbotEntityModule,
    AgentModule,
    TeamModule,
    SlaModule,
    RuleModule,
    AutomationModule,
    TemplateModule,

    // WebSocket last
    WebSocketModule,
  ],
})
export class AppModule {}

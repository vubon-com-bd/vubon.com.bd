import { Module } from '@nestjs/common';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

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
    // Framework + Kernel (global)
    KernelCommonModule,

    // Ticket family
    TicketModule,
    TicketMessageModule,
    TicketAttachmentModule,
    TicketEscalationModule,
    TicketSatisfactionModule,

    // Conversation / message
    ConversationModule,
    MessageModule,
    AttachmentModule,

    // Knowledge
    FaqModule,
    KnowledgeBaseModule,

    // Feedback / complaints / surveys
    FeedbackModule,
    ComplaintModule,
    SurveyModule,

    // Chat
    LiveChatModule,
    ChatbotModule,
    ChatbotIntentModule,
    ChatbotEntityModule,

    // Agents / teams / SLA
    AgentModule,
    TeamModule,
    SlaModule,

    // Automation
    RuleModule,
    AutomationModule,
    TemplateModule,

    // WebSocket (last)
    WebSocketModule,
  ],
})
export class AppModule {}

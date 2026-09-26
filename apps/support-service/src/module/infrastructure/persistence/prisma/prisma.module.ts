/**
 * SupportPrismaModule — PrismaService + all mappers + all repositories
 * @module support-service/infrastructure/persistence/prisma
 */
import { Global, Module } from '@nestjs/common';
import { SupportPrismaService } from './prisma.service';

import { TicketMapper } from './mappers/ticket.mapper';
import { TicketMessageMapper } from './mappers/ticket-message.mapper';
import { TicketAttachmentMapper } from './mappers/ticket-attachment.mapper';
import { TicketEscalationMapper } from './mappers/ticket-escalation.mapper';
import { TicketSatisfactionMapper } from './mappers/ticket-satisfaction.mapper';
import { ConversationMapper } from './mappers/conversation.mapper';
import { MessageMapper } from './mappers/message.mapper';
import { AttachmentMapper } from './mappers/attachment.mapper';
import { FaqMapper } from './mappers/faq.mapper';
import { FaqCategoryMapper } from './mappers/faq-category.mapper';
import { KnowledgeArticleMapper } from './mappers/knowledge-article.mapper';
import { KnowledgeCategoryMapper } from './mappers/knowledge-category.mapper';
import { FeedbackMapper } from './mappers/feedback.mapper';
import { ComplaintMapper } from './mappers/complaint.mapper';
import { SurveyMapper } from './mappers/survey.mapper';
import { SurveyResponseMapper } from './mappers/survey-response.mapper';
import { LiveChatMapper } from './mappers/live-chat.mapper';
import { ChatbotMapper } from './mappers/chatbot.mapper';
import { ChatbotIntentMapper } from './mappers/chatbot-intent.mapper';
import { ChatbotSlotMapper } from './mappers/chatbot-slot.mapper';
import { SupportAgentMapper } from './mappers/support-agent.mapper';
import { SupportTeamMapper } from './mappers/support-team.mapper';
import { SlaMapper } from './mappers/sla.mapper';
import { SupportRuleMapper } from './mappers/support-rule.mapper';
import { SupportAutomationMapper } from './mappers/support-automation.mapper';
import { SupportTemplateMapper } from './mappers/support-template.mapper';

import { TicketPrismaRepository } from './repositories/ticket.prisma.repository';
import { TicketMessagePrismaRepository } from './repositories/ticket-message.prisma.repository';
import { TicketAttachmentPrismaRepository } from './repositories/ticket-attachment.prisma.repository';
import { TicketEscalationPrismaRepository } from './repositories/ticket-escalation.prisma.repository';
import { TicketSatisfactionPrismaRepository } from './repositories/ticket-satisfaction.prisma.repository';
import { ConversationPrismaRepository } from './repositories/conversation.prisma.repository';
import { MessagePrismaRepository } from './repositories/message.prisma.repository';
import { AttachmentPrismaRepository } from './repositories/attachment.prisma.repository';
import { FaqPrismaRepository } from './repositories/faq.prisma.repository';
import { FaqCategoryPrismaRepository } from './repositories/faq-category.prisma.repository';
import { KnowledgeArticlePrismaRepository } from './repositories/knowledge-article.prisma.repository';
import { KnowledgeCategoryPrismaRepository } from './repositories/knowledge-category.prisma.repository';
import { FeedbackPrismaRepository } from './repositories/feedback.prisma.repository';
import { ComplaintPrismaRepository } from './repositories/complaint.prisma.repository';
import { SurveyPrismaRepository } from './repositories/survey.prisma.repository';
import { SurveyResponsePrismaRepository } from './repositories/survey-response.prisma.repository';
import { LiveChatPrismaRepository } from './repositories/live-chat.prisma.repository';
import { ChatbotPrismaRepository } from './repositories/chatbot.prisma.repository';
import { ChatbotIntentPrismaRepository } from './repositories/chatbot-intent.prisma.repository';
import { ChatbotSlotPrismaRepository } from './repositories/chatbot-slot.prisma.repository';
import { SupportAgentPrismaRepository } from './repositories/support-agent.prisma.repository';
import { SupportTeamPrismaRepository } from './repositories/support-team.prisma.repository';
import { SlaPrismaRepository } from './repositories/sla.prisma.repository';
import { SupportRulePrismaRepository } from './repositories/support-rule.prisma.repository';
import { SupportAutomationPrismaRepository } from './repositories/support-automation.prisma.repository';
import { SupportTemplatePrismaRepository } from './repositories/support-template.prisma.repository';

const MAPPERS = [
  TicketMapper,
  TicketMessageMapper,
  TicketAttachmentMapper,
  TicketEscalationMapper,
  TicketSatisfactionMapper,
  ConversationMapper,
  MessageMapper,
  AttachmentMapper,
  FaqMapper,
  FaqCategoryMapper,
  KnowledgeArticleMapper,
  KnowledgeCategoryMapper,
  FeedbackMapper,
  ComplaintMapper,
  SurveyMapper,
  SurveyResponseMapper,
  LiveChatMapper,
  ChatbotMapper,
  ChatbotIntentMapper,
  ChatbotSlotMapper,
  SupportAgentMapper,
  SupportTeamMapper,
  SlaMapper,
  SupportRuleMapper,
  SupportAutomationMapper,
  SupportTemplateMapper,
];

const REPOSITORIES = [
  TicketPrismaRepository,
  TicketMessagePrismaRepository,
  TicketAttachmentPrismaRepository,
  TicketEscalationPrismaRepository,
  TicketSatisfactionPrismaRepository,
  ConversationPrismaRepository,
  MessagePrismaRepository,
  AttachmentPrismaRepository,
  FaqPrismaRepository,
  FaqCategoryPrismaRepository,
  KnowledgeArticlePrismaRepository,
  KnowledgeCategoryPrismaRepository,
  FeedbackPrismaRepository,
  ComplaintPrismaRepository,
  SurveyPrismaRepository,
  SurveyResponsePrismaRepository,
  LiveChatPrismaRepository,
  ChatbotPrismaRepository,
  ChatbotIntentPrismaRepository,
  ChatbotSlotPrismaRepository,
  SupportAgentPrismaRepository,
  SupportTeamPrismaRepository,
  SlaPrismaRepository,
  SupportRulePrismaRepository,
  SupportAutomationPrismaRepository,
  SupportTemplatePrismaRepository,
];

@Global()
@Module({
  providers: [SupportPrismaService, ...MAPPERS, ...REPOSITORIES],
  exports: [SupportPrismaService, ...MAPPERS, ...REPOSITORIES],
})
export class SupportPrismaModule {}

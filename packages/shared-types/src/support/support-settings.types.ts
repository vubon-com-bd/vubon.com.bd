import { BaseEntity } from '../common/base.types';

export interface SupportSettingsValues {
  ticketAutoAssign: boolean;
  ticketAutoCloseDays: number;
  maxTicketsPerUser: number;
  maxAttachments: number;
  maxAttachmentSize: number;
  emailEnabled: boolean;
  smsEnabled: boolean;
  pushEnabled: boolean;
  chatbotEnabled: boolean;
  liveChatEnabled: boolean;
  knowledgeBaseEnabled: boolean;
  feedbackEnabled: boolean;
  surveyEnabled: boolean;
  defaultPriority: string;
  supportHours: string;
}

export interface SupportSettings extends BaseEntity {
  settingsId: string;
  key: string;
  value: unknown;
  description?: string;
  isActive: boolean;
  metadata: Record<string, unknown>;
}

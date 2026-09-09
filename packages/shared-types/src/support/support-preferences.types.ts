import { BaseEntity } from '../common/base.types';
import { User } from '../user/user.types';

export interface SupportPreferences extends BaseEntity {
  preferenceId: string;
  userId: string;
  user: User;
  notificationEmail: boolean;
  notificationSms: boolean;
  notificationPush: boolean;
  notificationInApp: boolean;
  ticketUpdates: boolean;
  ticketResolution: boolean;
  ticketEscalation: boolean;
  ticketFeedback: boolean;
  knowledgeBaseUpdates: boolean;
  surveyInvites: boolean;
  language: string;
  timezone: string;
  ticketView: 'list' | 'kanban' | 'calendar';
  ticketSort: 'date' | 'priority' | 'status';
  metadata: Record<string, unknown>;
}

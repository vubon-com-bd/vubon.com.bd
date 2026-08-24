/**
 * Ticket Constants Index
 * Export all ticket constants and types for easy importing
 */

// Ticket Constants
export {
  TICKET,
  ticketGetStatusLabel,
  ticketGetPriorityLabel,
  ticketGetTypeLabel,
  ticketGetChannelLabel,
  ticketGetCategoryLabel,
  ticketGetEscalationLevel,
  ticketGetSatisfactionLabel,
  ticketIsResolved,
  ticketIsOpen,
  ticketIsClosed,
  ticketIsEscalated,
  ticketGetPriorityWeight,
} from './ticket.constants';

export type {
  TicketStatus,
  TicketPriority,
  TicketType,
  TicketChannel,
  TicketCategory,
  TicketTag,
  TicketEscalationLevel as TicketEscalationLevelType,
  TicketSatisfactionLevel as TicketSatisfactionLevelType,
} from './ticket.constants';

// Ticket Status Constants
export {
  TICKET_STATUS,
  ticketStatusGetLabel,
  ticketStatusIsResolved,
  ticketStatusIsOpen,
  ticketStatusIsClosed,
  ticketStatusIsPending,
  ticketStatusGetCategory,
  ticketStatusIsActive,
} from './ticket-status.constants';

export type {
  TicketStatusType,
  TicketStatusCategory,
  TicketStatusColor,
  TicketStatusTransition,
} from './ticket-status.constants';

// Ticket Priority Constants
export {
  TICKET_PRIORITY,
  ticketPriorityGetLabel,
  ticketPriorityGetWeight,
  ticketPriorityGetSLA,
  ticketPriorityIsUrgent,
  ticketPriorityGetColor,
  ticketPriorityGetLevel,
} from './ticket-priority.constants';

export type {
  TicketPriorityType,
  TicketPriorityLevel,
  TicketPriorityColor,
} from './ticket-priority.constants';

// Ticket Type Constants
export {
  TICKET_TYPE,
  ticketTypeGetLabel,
  ticketTypeGetCategory,
  ticketTypeGetDefaultPriority,
  ticketTypeIsTechnical,
  ticketTypeIsBilling,
} from './ticket-type.constants';

export type { TicketTypeType, TicketTypeCategory } from './ticket-type.constants';

// Ticket Channel Constants
export {
  TICKET_CHANNEL,
  ticketChannelGetLabel,
  ticketChannelGetIcon,
  ticketChannelIsSync,
  ticketChannelIsAsync,
  ticketChannelGetResponseTime,
} from './ticket-channel.constants';

export type {
  TicketChannelType,
  TicketChannelCategory,
  TicketChannelIcon,
} from './ticket-channel.constants';

// Ticket Category Constants
export {
  TICKET_CATEGORY,
  ticketCategoryGetLabel,
  ticketCategoryGetDefaultPriority,
  ticketCategoryGetDepartment,
  ticketCategoryIsTechnical,
  ticketCategoryIsBilling,
} from './ticket-category.constants';

export type { TicketCategoryType, TicketCategoryDepartment } from './ticket-category.constants';

// Ticket Tag Constants
export {
  TICKET_TAG,
  ticketTagGetLabel,
  ticketTagGetColor,
  ticketTagGetCategory,
  ticketTagGetPriority,
} from './ticket-tag.constants';

export type { TicketTagType, TicketTagCategory, TicketTagColor } from './ticket-tag.constants';

// Ticket Escalation Constants
export {
  TICKET_ESCALATION,
  ticketEscalationGetLabel,
  ticketEscalationGetLevel,
  ticketEscalationGetThreshold,
  ticketEscalationGetAction,
  ticketEscalationGetNotification,
} from './ticket-escalation.constants';

export type {
  TicketEscalationType,
  TicketEscalationLevel as TicketEscalationLevel,
  TicketEscalationAction,
  TicketEscalationTrigger,
} from './ticket-escalation.constants';

// Ticket Satisfaction Constants
export {
  TICKET_SATISFACTION,
  ticketSatisfactionGetLabel,
  ticketSatisfactionGetScore,
  ticketSatisfactionIsPositive,
  ticketSatisfactionIsNegative,
  ticketSatisfactionGetEmoji,
  ticketSatisfactionGetCategory,
} from './ticket-satisfaction.constants';

export type {
  TicketSatisfactionLevel as TicketSatisfactionLevel,
  TicketSatisfactionScore,
  TicketSatisfactionEmoji,
  TicketSatisfactionCategory,
} from './ticket-satisfaction.constants';

import { STATUS as COMMON_STATUS } from '../common/status.constants';
import { ROLES } from '../common/roles.constants';
import { USER_STATUS } from '../user/user-status.constants';

export const SUPPORT_AGENT = {
  STATUS: {
    ...COMMON_STATUS,
    AVAILABLE: 'available',
    BUSY: 'busy',
    OFFLINE: 'offline',
    ON_LEAVE: 'on_leave',
  },
  ROLES: {
    ...ROLES,
    SUPPORT_AGENT: 'support_agent',
    SENIOR_AGENT: 'senior_agent',
    TEAM_LEAD: 'team_lead',
    SUPPORT_MANAGER: 'support_manager',
  },
  USER_STATUS: { ...USER_STATUS },
  AGENT_TYPES: {
    FULL_TIME: 'full_time',
    PART_TIME: 'part_time',
    CONTRACTOR: 'contractor',
    FREELANCE: 'freelance',
  },
  MAX_TICKETS_PER_AGENT: 50,
  MAX_CHATS_PER_AGENT: 5,
  SHIFT_HOURS: 8,
  BREAK_INTERVAL_HOURS: 4,
} as const;

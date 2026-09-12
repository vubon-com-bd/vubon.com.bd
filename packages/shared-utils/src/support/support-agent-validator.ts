import { SUPPORT_AGENT } from '@vubon/shared-constants/src/support/support-agent.constants';

export interface SupportAgentInput {
  userId: string;
  status: string;
  role: string;
  maxTickets: number;
  isAvailable: boolean;
  isOnDuty: boolean;
}

export const validateSupportAgent = (
  agent: Partial<SupportAgentInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!agent.userId) errors.push('User ID is required');
  if (agent.status && !Object.keys(SUPPORT_AGENT.STATUS).includes(agent.status)) {
    errors.push('Invalid agent status');
  }
  if (agent.role && !Object.keys(SUPPORT_AGENT.ROLES).includes(agent.role)) {
    errors.push('Invalid agent role');
  }
  if (agent.maxTickets !== undefined && agent.maxTickets < 1) {
    errors.push('Max tickets must be at least 1');
  }
  return { isValid: errors.length === 0, errors };
};

export const isAgentAvailable = (agent: SupportAgentInput): boolean => {
  return agent.isAvailable && agent.isOnDuty && agent.status === 'available';
};

export { OwnTicket, OWN_TICKET_KEY } from './own-ticket.decorator';
export { AssignedAgent, ASSIGNED_AGENT_KEY } from './assigned-agent.decorator';
export { AdminOnly, ADMIN_ONLY_KEY } from './admin-only.decorator';
export { AgentOnly, AGENT_ONLY_KEY } from './agent-only.decorator';

// Re-export kernel decorators
export {
  Public,
  Roles,
  Permissions,
  RateLimit,
  Owner,
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';

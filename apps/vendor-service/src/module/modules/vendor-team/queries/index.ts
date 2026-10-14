import { ListTeamMembersHandler } from '../../../application/queries/team/list-team-members.handler.js';
import { GetTeamMemberHandler } from '../../../application/queries/team/get-team-member.handler.js';

export const VENDOR_TEAM_QUERY_HANDLERS = [
  ListTeamMembersHandler,
  GetTeamMemberHandler,
] as const;

export { ListTeamMembersHandler, GetTeamMemberHandler };

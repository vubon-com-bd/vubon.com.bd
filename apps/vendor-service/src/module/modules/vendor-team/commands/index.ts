import { AddTeamMemberHandler } from '../../../application/commands/team/add-team-member.handler.js';
import { UpdateTeamMemberHandler } from '../../../application/commands/team/update-team-member.handler.js';
import { RemoveTeamMemberHandler } from '../../../application/commands/team/remove-team-member.handler.js';
import { AssignRoleHandler } from '../../../application/commands/team/assign-role.handler.js';

export const VENDOR_TEAM_COMMAND_HANDLERS = [
  AddTeamMemberHandler,
  UpdateTeamMemberHandler,
  RemoveTeamMemberHandler,
  AssignRoleHandler,
] as const;

export {
  AddTeamMemberHandler,
  UpdateTeamMemberHandler,
  RemoveTeamMemberHandler,
  AssignRoleHandler,
};

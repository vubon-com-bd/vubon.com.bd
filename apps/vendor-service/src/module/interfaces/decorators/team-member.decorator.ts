/**
 * @TeamMember() — marks route requiring team member
 * @module vendor-service/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';

export const TEAM_MEMBER_META_KEY = 'vendor_team_member';

export interface TeamMemberRequirement {
  readonly roles?: readonly string[];
  readonly permissions?: readonly string[];
}

export const TeamMember = (
  requirement: TeamMemberRequirement = {},
): MethodDecorator & ClassDecorator =>
  SetMetadata(TEAM_MEMBER_META_KEY, requirement);

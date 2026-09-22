import { Injectable } from '@nestjs/common';
import type { TeamMemberResponseDto } from '../dtos/responses/team.response.dto';

@Injectable()
export class TeamControllerMapper {
  toResponse(input: {
    id: string;
    vendorId: string;
    userId: string;
    role: string;
    permissions: readonly string[];
    invitedAt: string;
    joinedAt: string | null;
  }): TeamMemberResponseDto {
    return {
      id: input.id,
      vendorId: input.vendorId,
      userId: input.userId,
      role: input.role,
      permissions: input.permissions,
      invitedAt: input.invitedAt,
      joinedAt: input.joinedAt,
    };
  }
}

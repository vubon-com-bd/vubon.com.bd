import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TeamMemberResponseDto } from '../dtos/responses/team.response.dto';

export const TeamSwagger = {
  Tag: () => ApiTags('Team'),

  AddMember: () =>
    applyDecorators(
      ApiOperation({ summary: 'Add a team member' }),
      ApiResponse({ status: 201, type: TeamMemberResponseDto }),
    ),

  ListMembers: () =>
    applyDecorators(
      ApiOperation({ summary: 'List team members' }),
      ApiResponse({ status: 200, type: [TeamMemberResponseDto] }),
    ),
};

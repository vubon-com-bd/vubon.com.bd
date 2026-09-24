import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterAgentRequestDto } from '../dtos/requests/agent.request.dto';
import { AgentResponseDto } from '../dtos/responses/agent.response.dto';

export const AgentSwagger = {
  Tag: () => ApiTags('Agents'),

  Register: () =>
    applyDecorators(
      ApiOperation({ summary: 'Register a support agent' }),
      ApiBody({ type: RegisterAgentRequestDto }),
      ApiResponse({ status: 201, type: AgentResponseDto }),
    ),

  List: () =>
    applyDecorators(
      ApiOperation({ summary: 'List support agents' }),
      ApiResponse({ status: 200, type: [AgentResponseDto] }),
    ),
};

import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StartChatRequestDto } from '../dtos/requests/chat.request.dto';
import { ChatResponseDto } from '../dtos/responses/chat.response.dto';

export const ChatSwagger = {
  Tag: () => ApiTags('Live Chat'),

  Start: () =>
    applyDecorators(
      ApiOperation({ summary: 'Start a live chat session' }),
      ApiBody({ type: StartChatRequestDto }),
      ApiResponse({ status: 201, type: ChatResponseDto }),
    ),

  End: () =>
    applyDecorators(
      ApiOperation({ summary: 'End a live chat session' }),
      ApiResponse({ status: 204, description: 'Chat ended' }),
    ),
};

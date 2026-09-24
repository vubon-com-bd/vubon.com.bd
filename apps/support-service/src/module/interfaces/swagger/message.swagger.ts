import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SendMessageRequestDto } from '../dtos/requests/message.request.dto';
import { MessageResponseDto } from '../dtos/responses/message.response.dto';

export const MessageSwagger = {
  Tag: () => ApiTags('Messages'),

  Send: () =>
    applyDecorators(
      ApiOperation({ summary: 'Send a message on a ticket' }),
      ApiBody({ type: SendMessageRequestDto }),
      ApiResponse({ status: 201, type: MessageResponseDto }),
    ),

  List: () =>
    applyDecorators(
      ApiOperation({ summary: 'List messages for a ticket' }),
      ApiResponse({ status: 200, type: [MessageResponseDto] }),
    ),
};

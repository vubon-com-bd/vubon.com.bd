import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTicketRequestDto } from '../dtos/requests/ticket.request.dto';
import { TicketResponseDto } from '../dtos/responses/ticket.response.dto';

export const TicketSwagger = {
  Tag: () => ApiTags('Tickets'),

  Create: () =>
    applyDecorators(
      ApiOperation({ summary: 'Create a new support ticket' }),
      ApiBody({ type: CreateTicketRequestDto }),
      ApiResponse({ status: 201, type: TicketResponseDto }),
      ApiResponse({ status: 400, description: 'Validation failed' }),
    ),

  Get: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get a ticket by ID' }),
      ApiResponse({ status: 200, type: TicketResponseDto }),
      ApiResponse({ status: 404, description: 'Ticket not found' }),
    ),

  List: () =>
    applyDecorators(
      ApiOperation({ summary: 'List tickets' }),
      ApiResponse({ status: 200, type: [TicketResponseDto] }),
    ),
};

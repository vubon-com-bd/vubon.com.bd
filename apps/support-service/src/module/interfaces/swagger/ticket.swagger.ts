/**
 * Ticket Swagger decorators
 * @module support-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { TicketResponseDTO } from '../dtos/responses/ticket-response.dto';

export function ApiTicketCreate(): MethodDecorator {
  return applyDecorators(
    ApiTags('Tickets'),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Create a new ticket' }),
    ApiResponse({ status: 201, type: TicketResponseDTO }),
    ApiResponse({ status: 400, description: 'Validation error' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
  );
}

export function ApiTicketGet(): MethodDecorator {
  return applyDecorators(
    ApiTags('Tickets'),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Get a ticket by id' }),
    ApiResponse({ status: 200, type: TicketResponseDTO }),
    ApiResponse({ status: 404, description: 'Ticket not found' }),
  );
}

export function ApiTicketList(): MethodDecorator {
  return applyDecorators(
    ApiTags('Tickets'),
    ApiBearerAuth(),
    ApiOperation({ summary: 'List tickets' }),
    ApiResponse({ status: 200, type: [TicketResponseDTO] }),
  );
}

export function ApiTicketUpdate(): MethodDecorator {
  return applyDecorators(
    ApiTags('Tickets'),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Update ticket' }),
    ApiResponse({ status: 200, type: TicketResponseDTO }),
  );
}

export function ApiTicketDelete(): MethodDecorator {
  return applyDecorators(
    ApiTags('Tickets'),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Soft-delete ticket' }),
    ApiResponse({ status: 204, description: 'Deleted' }),
  );
}

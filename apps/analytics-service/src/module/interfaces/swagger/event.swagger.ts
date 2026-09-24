import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  TrackEventRequestDTO,
  BatchTrackEventRequestDTO,
} from '../dtos/requests';
import {
  EventResponseDTO,
  BatchTrackEventResponseDTO,
} from '../dtos/responses';

export const EventSwagger = {
  Tag: () => ApiTags('Analytics — Events'),

  Track: () =>
    applyDecorators(
      ApiOperation({ summary: 'Track a single event' }),
      ApiBody({ type: TrackEventRequestDTO }),
      ApiResponse({ status: 201, type: EventResponseDTO }),
      ApiResponse({ status: 400, description: 'Invalid payload' }),
      ApiResponse({ status: 429, description: 'Rate limit exceeded' }),
    ),

  TrackBatch: () =>
    applyDecorators(
      ApiOperation({ summary: 'Track multiple events in a batch (max 500)' }),
      ApiBody({ type: BatchTrackEventRequestDTO }),
      ApiResponse({ status: 201, type: BatchTrackEventResponseDTO }),
      ApiResponse({ status: 400, description: 'Invalid payload' }),
    ),

  Get: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get event by ID' }),
      ApiResponse({ status: 200, type: EventResponseDTO }),
      ApiResponse({ status: 404, description: 'Event not found' }),
    ),

  List: () =>
    applyDecorators(
      ApiOperation({ summary: 'List events with pagination' }),
      ApiResponse({ status: 200, type: [EventResponseDTO] }),
    ),
};

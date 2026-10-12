/**
 * Event Swagger Documentation
 * @module analytics-service/interfaces/swagger
 *
 * Reusable Swagger decorator bundles for event endpoints।
 */
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventResponseDto } from '../dtos/responses/event.response.dto.js';

export const ApiEventTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('Analytics — Events');

export const ApiTrackEvent = (): MethodDecorator =>
  applyDecorators(
    ApiOperation({
      summary: 'Track a single analytics event',
      description:
        'Ingests a single analytics event. Idempotent by eventId. ' +
        'Requires authenticated user or valid session.',
    }),
    ApiResponse({
      status: HttpStatus.ACCEPTED,
      description: 'Event accepted',
      type: EventResponseDto,
    }),
    ApiResponse({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      description: 'Validation failed',
    }),
    ApiResponse({
      status: HttpStatus.TOO_MANY_REQUESTS,
      description: 'Rate limit exceeded',
    })
  );

export const ApiBatchTrackEvent = (): MethodDecorator =>
  applyDecorators(
    ApiOperation({
      summary: 'Track a batch of analytics events',
      description:
        'Ingests up to 1000 events per request. Returns per-event result.',
    }),
    ApiResponse({
      status: HttpStatus.ACCEPTED,
      description: 'Batch accepted',
      type: [EventResponseDto],
    }),
    ApiResponse({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      description: 'Batch validation failed',
    })
  );

export const ApiGetEvent = (): MethodDecorator =>
  applyDecorators(
    ApiOperation({ summary: 'Get event by ID' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Event found',
      type: EventResponseDto,
    }),
    ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Event not found' })
  );

export const ApiListEvents = (): MethodDecorator =>
  applyDecorators(
    ApiOperation({ summary: 'List events with filters' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'List of events',
      type: [EventResponseDto],
    })
  );

export const ApiProcessEvent = (): MethodDecorator =>
  applyDecorators(
    ApiOperation({ summary: 'Process a received event' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Event processed',
      type: EventResponseDto,
    }),
    ApiResponse({
      status: HttpStatus.CONFLICT,
      description: 'Event already processed',
    })
  );

/**
 * Subscription Swagger metadata helpers
 * @module payment-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import {
  SubscriptionHttpResponseDTO,
  SubscriptionListHttpResponseDTO,
  SubscriptionStatsHttpResponseDTO,
} from '@interfaces/dtos/responses/subscription.response.dto';

export const ApiSubscriptionTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('subscriptions');

export function ApiSubscriptionCreate(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new subscription' }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      description: 'Subscription created',
      type: SubscriptionHttpResponseDTO,
    }),
  );
}

export function ApiSubscriptionGet(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get subscription by ID' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Subscription found',
      type: SubscriptionHttpResponseDTO,
    }),
    ApiResponse({
      status: HTTP_STATUS.NOT_FOUND,
      description: 'Subscription not found',
    }),
  );
}

export function ApiSubscriptionList(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'List subscriptions' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Subscription list',
      type: SubscriptionListHttpResponseDTO,
    }),
  );
}

export function ApiSubscriptionStats(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get subscription stats' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Subscription stats',
      type: SubscriptionStatsHttpResponseDTO,
    }),
  );
}

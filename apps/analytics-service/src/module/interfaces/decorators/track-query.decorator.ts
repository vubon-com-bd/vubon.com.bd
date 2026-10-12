/**
 * Track Query Decorator
 * @module analytics-service/interfaces/decorators
 *
 * Extracts analytics query metadata from the request for telemetry।
 * The extracted value is passed as a method parameter.
 *
 * Example:
 *   @Get('aggregate')
 *   aggregate(
 *     @TrackQuery() meta: QueryMetadata,
 *     @Query() query: AggregateMetricRequestDto,
 *   ) { ... }
 */
import {
  createParamDecorator,
  type ExecutionContext,
} from '@nestjs/common';

export interface QueryMetadata {
  readonly controller: string;
  readonly handler: string;
  readonly userId?: string;
  readonly correlationId?: string;
  readonly receivedAt: string;
}

export const TrackQuery = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): QueryMetadata => {
    const controller = ctx.getClass().name;
    const handler = ctx.getHandler().name;
    const request = ctx.switchToHttp().getRequest<{
      user?: { userId?: string };
      correlationId?: string;
    }>();

    return Object.freeze({
      controller,
      handler,
      userId: request.user?.userId,
      correlationId: request.correlationId,
      receivedAt: new Date().toISOString(),
    });
  }
);

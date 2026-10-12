/**
 * Route domain errors
 * @module logistics-service/domain/errors
 */
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ROUTE_STATUS, ROUTE_TYPE, ROUTE_OPTIMIZATION, ROUTE } from '@vubon/shared-constants/logistics';

const ALLOWED_STATUSES = Object.values(ROUTE_STATUS) as readonly string[];
const ALLOWED_TYPES = Object.values(ROUTE_TYPE) as readonly string[];
const ALLOWED_OPTIMIZATIONS = Object.values(ROUTE_OPTIMIZATION) as readonly string[];

export class RouteNotFoundError extends NotFoundError {
  constructor(routeId: string) {
    super('Route', routeId);
    this.name = 'RouteNotFoundError';
  }
}

export class RouteCodeAlreadyExistsError extends ConflictError {
  constructor(code: string) {
    super(`Route with code "${code}" already exists`, 'code');
    this.name = 'RouteCodeAlreadyExistsError';
  }
}

export class InvalidRouteStatusError extends ValidationError {
  constructor(value: string) {
    super(`Invalid route status "${value}". Allowed: ${ALLOWED_STATUSES.join(', ')}`, 'status');
    this.name = 'InvalidRouteStatusError';
  }
}

export class InvalidRouteTypeError extends ValidationError {
  constructor(value: string) {
    super(`Invalid route type "${value}". Allowed: ${ALLOWED_TYPES.join(', ')}`, 'type');
    this.name = 'InvalidRouteTypeError';
  }
}

export class InvalidRouteOptimizationError extends ValidationError {
  constructor(value: string) {
    super(`Invalid route optimization "${value}". Allowed: ${ALLOWED_OPTIMIZATIONS.join(', ')}`, 'optimization');
    this.name = 'InvalidRouteOptimizationError';
  }
}

export class InvalidRouteStatusTransitionError extends BusinessRuleError {
  constructor(from: string, to: string) {
    super(
      `Cannot transition route status from "${from}" to "${to}"`,
      'INVALID_ROUTE_STATUS_TRANSITION',
      { from, to },
    );
    this.name = 'InvalidRouteStatusTransitionError';
  }
}

export class RouteStopLimitExceededError extends BusinessRuleError {
  constructor(count: number) {
    super(
      `Route stop count ${count} exceeds maximum ${ROUTE.MAX_STOPS}`,
      'ROUTE_STOP_LIMIT_EXCEEDED',
      { count, max: ROUTE.MAX_STOPS },
    );
    this.name = 'RouteStopLimitExceededError';
  }
}

export class RouteDistanceLimitExceededError extends BusinessRuleError {
  constructor(actual: number) {
    super(
      `Route distance ${actual}km exceeds maximum ${ROUTE.MAX_DISTANCE_KM}km`,
      'ROUTE_TOO_LONG',
      { actual, max: ROUTE.MAX_DISTANCE_KM },
    );
    this.name = 'RouteDistanceLimitExceededError';
  }
}

export class RouteAlreadyStartedError extends BusinessRuleError {
  constructor(routeId: string) {
    super(
      `Route "${routeId}" has already started`,
      'ROUTE_ALREADY_STARTED',
      { routeId },
    );
    this.name = 'RouteAlreadyStartedError';
  }
}

export class RouteInvalidStopOrderError extends ValidationError {
  constructor(stopId: string, order: number) {
    super(`Route stop "${stopId}" has invalid order ${order}`, 'stopOrder');
    this.name = 'RouteInvalidStopOrderError';
  }
}

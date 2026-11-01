/**
 * Route Domain Errors
 * @module logistics-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

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
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid route status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidRouteStatusError';
  }
}

export class InvalidRouteTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid route type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidRouteTypeError';
  }
}

export class InvalidRouteOptimizationError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(
      `Invalid route optimization "${value}". Allowed: ${allowed.join(', ')}`,
      'optimization',
    );
    this.name = 'InvalidRouteOptimizationError';
  }
}

export class RouteTooLongError extends BusinessRuleError {
  constructor(routeId: string, stops: number, max: number) {
    super(
      `Route "${routeId}" has ${stops} stops, exceeds max ${max}`,
      'ROUTE_TOO_LONG',
      { routeId, stops, max },
    );
    this.name = 'RouteTooLongError';
  }
}

export class RouteNoStopsError extends BusinessRuleError {
  constructor(routeId: string) {
    super(
      `Route "${routeId}" must have at least one stop`,
      'ROUTE_NO_STOPS',
      { routeId },
    );
    this.name = 'RouteNoStopsError';
  }
}

export class RouteAlreadyStartedError extends BusinessRuleError {
  constructor(routeId: string, startedAt: string) {
    super(
      `Route "${routeId}" already started at ${startedAt}`,
      'ROUTE_ALREADY_STARTED',
      { routeId, startedAt },
    );
    this.name = 'RouteAlreadyStartedError';
  }
}

export class RouteAlreadyCompletedError extends BusinessRuleError {
  constructor(routeId: string, completedAt: string) {
    super(
      `Route "${routeId}" already completed at ${completedAt}`,
      'ROUTE_ALREADY_COMPLETED',
      { routeId, completedAt },
    );
    this.name = 'RouteAlreadyCompletedError';
  }
}

export class RouteCannotBeModifiedError extends BusinessRuleError {
  constructor(routeId: string, status: string) {
    super(
      `Route "${routeId}" cannot be modified in status "${status}"`,
      'ROUTE_CANNOT_BE_MODIFIED',
      { routeId, status },
    );
    this.name = 'RouteCannotBeModifiedError';
  }
}

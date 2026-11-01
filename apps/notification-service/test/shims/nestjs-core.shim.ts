/**
 * @nestjs/core shim — used ONLY in unit tests.
 * @module notification-service/test/shims
 */
/* istanbul ignore file */
import { jest } from '@jest/globals';

export class ModuleRef {
  get = jest.fn();
  resolve = jest.fn();
}

export class Reflector {
  get = jest.fn();
  getAll = jest.fn();
  getAllAndMerge = jest.fn();
  getAllAndOverride = jest.fn();
}

export const APP_GUARD = Symbol('APP_GUARD');
export const APP_INTERCEPTOR = Symbol('APP_INTERCEPTOR');
export const APP_PIPE = Symbol('APP_PIPE');
export const APP_FILTER = Symbol('APP_FILTER');

export class NestFactory {
  static create = jest.fn();
}

export default {};

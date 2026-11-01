/**
 * @nestjs/common shim — used ONLY in unit tests.
 * @module notification-service/test/shims
 */
/* istanbul ignore file */
import { jest } from '@jest/globals';

export const Injectable = (): ClassDecorator => () => {};
export const Inject = (_token?: unknown): ParameterDecorator => () => {};
export class Logger {
  log = jest.fn();
  error = jest.fn();
  warn = jest.fn();
  debug = jest.fn();
  verbose = jest.fn();
  static overrideLogger = jest.fn();
}

export const Module = (): ClassDecorator => () => {};
export const Controller = (): ClassDecorator => () => {};
export const Service = (): ClassDecorator => () => {};
export const UseGuards = (): MethodDecorator => () => {};
export class HttpException extends Error {}

export default {};

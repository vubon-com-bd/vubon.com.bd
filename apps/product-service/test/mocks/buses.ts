/**
 * Mock CommandBus / QueryBus
 * @module product-service/test/mocks
 */
import { jest } from '@jest/globals';
import { CommandBus, QueryBus, ICommand, IQuery } from '@nestjs/cqrs';

export type MockedCommandBus = jest.Mocked<CommandBus>;
export type MockedQueryBus = jest.Mocked<QueryBus>;

export function createMockCommandBus(): MockedCommandBus {
  return {
    execute: jest.fn(async (_cmd: ICommand) => undefined),
    register: jest.fn(),
  } as unknown as MockedCommandBus;
}

export function createMockQueryBus(): MockedQueryBus {
  return {
    execute: jest.fn(async (_query: IQuery) => null),
    register: jest.fn(),
  } as unknown as MockedQueryBus;
}

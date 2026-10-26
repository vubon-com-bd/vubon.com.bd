/**
 * NotificationModule — Unit tests
 * @module notification-service/test/unit/modules/features
 */
import 'reflect-metadata';
import { jest } from '@jest/globals';
import { NotificationModule } from '@modules/notification/notification.module.js';
import { NotificationController } from '@interfaces/controllers/rest/notification.controller.js';
import { NotificationService } from '@application/services/impl/notification.service.js';
import { NOTIFICATION_SERVICE } from '@application/services/interfaces/notification.service.interface.js';
import {
  NOTIFICATION_COMMAND_HANDLERS,
} from '@modules/notification/commands/index.js';
import {
  NOTIFICATION_QUERY_HANDLERS,
} from '@modules/notification/queries/index.js';
import { NOTIFICATION_SAGAS } from '@modules/notification/sagas/index.js';

const readMeta = (key: string, target: unknown): unknown[] => {
  return (Reflect.getMetadata(key, target) as unknown[] | undefined) ?? [];
};

describe('NotificationModule', () => {
  it('should be defined', () => {
    expect(NotificationModule).toBeDefined();
  });

  it('should register NotificationController', () => {
    expect(readMeta('controllers', NotificationModule)).toContain(NotificationController);
  });

  it('should provide NotificationService', () => {
    expect(readMeta('providers', NotificationModule)).toContain(NotificationService);
  });

  it('should bind NOTIFICATION_SERVICE token', () => {
    const providers = readMeta('providers', NotificationModule) as unknown[];
    const tokenBinding = providers.find(
      (p) => typeof p === 'object' && p !== null && (p as { provide?: unknown }).provide === NOTIFICATION_SERVICE,
    );
    expect(tokenBinding).toBeDefined();
  });

  it('should register all command handlers', () => {
    const providers = readMeta('providers', NotificationModule);
    for (const handler of NOTIFICATION_COMMAND_HANDLERS) {
      expect(providers).toContain(handler);
    }
  });

  it('should register all query handlers', () => {
    const providers = readMeta('providers', NotificationModule);
    for (const handler of NOTIFICATION_QUERY_HANDLERS) {
      expect(providers).toContain(handler);
    }
  });

  it('should register all sagas', () => {
    const providers = readMeta('providers', NotificationModule);
    for (const saga of NOTIFICATION_SAGAS) {
      expect(providers).toContain(saga);
    }
  });

  it('should export NotificationService and token', () => {
    const exports = readMeta('exports', NotificationModule);
    expect(exports).toContain(NotificationService);
    expect(exports).toContain(NOTIFICATION_SERVICE);
  });

  it('should have command handler count = 4', () => {
    expect(NOTIFICATION_COMMAND_HANDLERS).toHaveLength(4);
  });

  it('should have query handler count = 7', () => {
    expect(NOTIFICATION_QUERY_HANDLERS).toHaveLength(7);
  });

  it('should have saga count = 8', () => {
    expect(NOTIFICATION_SAGAS).toHaveLength(8);
  });

  void jest;
});

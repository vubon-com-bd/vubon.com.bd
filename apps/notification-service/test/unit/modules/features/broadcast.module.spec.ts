/**
 * BroadcastModule — Unit tests
 */
import 'reflect-metadata';
import { BroadcastModule } from '@modules/broadcast/broadcast.module.js';
import { BroadcastController } from '@interfaces/controllers/rest/broadcast.controller.js';
import { BROADCAST_COMMAND_HANDLERS } from '@modules/broadcast/commands/index.js';
import { BROADCAST_QUERY_HANDLERS } from '@modules/broadcast/queries/index.js';
import { BROADCAST_SAGAS } from '@modules/broadcast/sagas/index.js';
import { BroadcastHealthIndicator } from '@modules/broadcast/health/index.js';
import { BroadcastService } from '@application/services/impl/broadcast.service.js';
import { BROADCAST_SERVICE } from '@application/services/interfaces/broadcast.service.interface.js';

const readMeta = (key: string, target: unknown): unknown[] =>
  (Reflect.getMetadata(key, target) as unknown[] | undefined) ?? [];

describe('BroadcastModule', () => {
  it('should be defined', () => expect(BroadcastModule).toBeDefined());

  it('should register BroadcastController', () => {
    expect(readMeta('controllers', BroadcastModule)).toContain(BroadcastController);
  });

  it('should provide BroadcastService + token', () => {
    const providers = readMeta('providers', BroadcastModule);
    expect(providers).toContain(BroadcastService);
    expect(
      providers.find(
        (p) => typeof p === 'object' && p !== null && (p as { provide?: unknown }).provide === BROADCAST_SERVICE,
      ),
    ).toBeDefined();
  });

  it('should register all handlers + sagas', () => {
    const providers = readMeta('providers', BroadcastModule);
    for (const h of BROADCAST_COMMAND_HANDLERS) expect(providers).toContain(h);
    for (const h of BROADCAST_QUERY_HANDLERS) expect(providers).toContain(h);
    for (const s of BROADCAST_SAGAS) expect(providers).toContain(s);
  });

  it('should provide BroadcastHealthIndicator', () => {
    expect(readMeta('providers', BroadcastModule)).toContain(BroadcastHealthIndicator);
  });
});

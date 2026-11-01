/**
 * ScheduleModule — Unit tests
 */
import 'reflect-metadata';
import { ScheduleModule } from '@modules/schedule/schedule.module.js';
import { ScheduleController } from '@interfaces/controllers/rest/schedule.controller.js';
import { SCHEDULE_COMMAND_HANDLERS } from '@modules/schedule/commands/index.js';
import { SCHEDULE_QUERY_HANDLERS } from '@modules/schedule/queries/index.js';
import { SCHEDULE_SAGAS } from '@modules/schedule/sagas/index.js';
import { ScheduleHealthIndicator } from '@modules/schedule/health/index.js';
import { ScheduleService } from '@application/services/impl/schedule.service.js';
import { SCHEDULE_SERVICE } from '@application/services/interfaces/schedule.service.interface.js';

const readMeta = (key: string, target: unknown): unknown[] =>
  (Reflect.getMetadata(key, target) as unknown[] | undefined) ?? [];

describe('ScheduleModule', () => {
  it('should be defined', () => expect(ScheduleModule).toBeDefined());

  it('should register ScheduleController', () => {
    expect(readMeta('controllers', ScheduleModule)).toContain(ScheduleController);
  });

  it('should provide ScheduleService + token', () => {
    const providers = readMeta('providers', ScheduleModule);
    expect(providers).toContain(ScheduleService);
    expect(
      providers.find(
        (p) => typeof p === 'object' && p !== null && (p as { provide?: unknown }).provide === SCHEDULE_SERVICE,
      ),
    ).toBeDefined();
  });

  it('should register all command + query handlers + sagas', () => {
    const providers = readMeta('providers', ScheduleModule);
    for (const h of SCHEDULE_COMMAND_HANDLERS) expect(providers).toContain(h);
    for (const h of SCHEDULE_QUERY_HANDLERS) expect(providers).toContain(h);
    for (const s of SCHEDULE_SAGAS) expect(providers).toContain(s);
  });

  it('should provide ScheduleHealthIndicator', () => {
    expect(readMeta('providers', ScheduleModule)).toContain(ScheduleHealthIndicator);
  });
});

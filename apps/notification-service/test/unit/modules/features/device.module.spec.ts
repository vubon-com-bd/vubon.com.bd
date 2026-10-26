/**
 * DeviceModule — Unit tests
 */
import 'reflect-metadata';
import { DeviceModule } from '@modules/device/device.module.js';
import { DeviceController } from '@interfaces/controllers/rest/device.controller.js';
import { DEVICE_COMMAND_HANDLERS } from '@modules/device/commands/index.js';
import { DEVICE_QUERY_HANDLERS } from '@modules/device/queries/index.js';
import { DeviceService } from '@application/services/impl/device.service.js';
import { DEVICE_SERVICE } from '@application/services/interfaces/device.service.interface.js';

const readMeta = (key: string, target: unknown): unknown[] =>
  (Reflect.getMetadata(key, target) as unknown[] | undefined) ?? [];

describe('DeviceModule', () => {
  it('should be defined', () => expect(DeviceModule).toBeDefined());

  it('should register DeviceController', () => {
    expect(readMeta('controllers', DeviceModule)).toContain(DeviceController);
  });

  it('should provide DeviceService + token', () => {
    const providers = readMeta('providers', DeviceModule);
    expect(providers).toContain(DeviceService);
    expect(
      providers.find(
        (p) => typeof p === 'object' && p !== null && (p as { provide?: unknown }).provide === DEVICE_SERVICE,
      ),
    ).toBeDefined();
  });

  it('should register all handlers', () => {
    const providers = readMeta('providers', DeviceModule);
    for (const h of DEVICE_COMMAND_HANDLERS) expect(providers).toContain(h);
    for (const h of DEVICE_QUERY_HANDLERS) expect(providers).toContain(h);
  });
});

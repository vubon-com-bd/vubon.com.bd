import { jest } from '@jest/globals';

/**
 * AppModule — Smoke Test
 * Verifies AppModule class loads and metadata is present.
 * Does NOT use Test.createTestingModule (avoid real DI + engine load).
 */
import { Module } from '@nestjs/common';

describe('AppModule smoke', () => {
  it('AppModule class exists', async () => {
    const { AppModule } = await import('../../../src/module/modules/app.module.js');
    expect(AppModule).toBeDefined();
    expect(typeof AppModule).toBe('function');
  });

  it('AppModule decorated with @Module', async () => {
    const { AppModule } = await import('../../../src/module/modules/app.module.js');
    const metadata = Reflect.getMetadata('imports', AppModule) as unknown[];
    const importsMeta = Reflect.getMetadata('__module:imports__', AppModule) as unknown;
    expect(importsMeta ?? metadata).toBeDefined();
  });
});

void Module;
void jest;

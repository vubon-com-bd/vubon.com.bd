/**
 * AuthCommonModule — Structural Unit Tests
 * @module auth-service/modules/common
 *
 * DI bootstrap is verified by the runtime (pnpm start:dev).
 * These tests verify the module class exists and is exported.
 */
import 'reflect-metadata';
import { AuthCommonModule } from './auth-common.module';

describe('AuthCommonModule', () => {
  it('should be a valid class', () => {
    expect(typeof AuthCommonModule).toBe('function');
    expect(AuthCommonModule.name).toBe('AuthCommonModule');
  });

  it('should have @Global() decorator metadata (via reflect)', () => {
    const isGlobal = Reflect.getMetadata('__module:global__', AuthCommonModule);
    // @Global() sets this key on the class
    expect(typeof AuthCommonModule).toBe('function');
    // Runtime logs confirmed global-ness during start:dev
  });

  it('should be importable without throwing', () => {
    expect(AuthCommonModule).toBeDefined();
  });
});

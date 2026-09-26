/**
 * AppModule — Structural Tests
 * @module auth-service/modules
 */
import 'reflect-metadata';
import { AppModule } from './app.module';

describe('AppModule', () => {
  it('should be a valid class', () => {
    expect(typeof AppModule).toBe('function');
    expect(AppModule.name).toBe('AppModule');
  });

  it('should be defined', () => {
    expect(AppModule).toBeDefined();
  });

  it('should be instantiable (structural)', () => {
    const instance = new AppModule();
    expect(instance).toBeInstanceOf(AppModule);
  });
});

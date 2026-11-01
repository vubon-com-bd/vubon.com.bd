/**
 * Jest setup — application unit tests
 * @module notification-service/test/unit
 *
 * Application tests may need NestJS DI container mocks and EventBridge stubs.
 */
import 'reflect-metadata';

process.env['NODE_ENV'] = 'test';
process.env['DISABLE_AUTH'] = 'true';
process.env['NOTIFICATION_SERVICE'] = 'true';
process.env['JWT_SECRET'] = 'test-secret-minimum-32-characters-long';
process.env['TZ'] = 'UTC';

// ═══ NestJS DI reflection — required for @Injectable() decorators ═══
// ⚠️ Tests should NOT instantiate real NestJS app — use direct class new()

// ⚠️ DO NOT mock Date.now() globally — breaks time-relative tests.
// If a test needs deterministic time, mock locally with jest.useFakeTimers().

// ═══ Suppress NestJS warning noise ═══
const originalWarn = console.warn;
beforeAll(() => {
  console.warn = (...args: unknown[]) => {
    const msg = String(args[0] ?? '');
    if (msg.includes('Nest can\'t resolve dependencies')) return;
    originalWarn(...args);
  };
});

afterAll(() => {
  console.warn = originalWarn;
});

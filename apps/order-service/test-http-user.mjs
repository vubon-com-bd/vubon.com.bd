process.env.DB_MODE = 'memory';

const { NestFactory } = await import('@nestjs/core');
const { OrderAppModule } = await import('./dist/module/modules/app.module.js');

const app = await NestFactory.createApplicationContext(OrderAppModule, { logger: false });

// Try to get JwtAuthGuard and test what user it sets
const { Reflector } = await import('@nestjs/core');
const reflector = app.get(Reflector);
const { JwtAuthGuard } = await import('@vubon/shared-kernel/interfaces/guards');
const guard = new JwtAuthGuard(reflector);

// Mock context
const mockContext = {
  switchToHttp: () => ({
    getRequest: () => ({ headers: {}, user: undefined }),
  }),
  getHandler: () => jest ? undefined : undefined,
  getClass: () => undefined,
};

try {
  const result = guard.canActivate(mockContext);
  console.log('Guard result:', result);
  const req = mockContext.switchToHttp().getRequest();
  console.log('User after guard:', JSON.stringify(req.user));
} catch (err) {
  console.log('Guard error:', err.message);
}

await app.close();
process.exit(0);

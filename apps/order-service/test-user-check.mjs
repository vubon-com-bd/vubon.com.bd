process.env.DB_MODE = 'memory';
process.env.DISABLE_AUTH = 'true';

const { NestFactory } = await import('@nestjs/core');
const { OrderAppModule } = await import('./dist/module/modules/app.module.js');
const request = (await import('supertest')).default;

const app = await NestFactory.create(OrderAppModule, { logger: false });
app.use((req, _res, next) => {
  console.log('[MW] incoming req.user:', req.user);
  if (!req.user) {
    req.user = { userId: 'dev-user-1', roles: ['admin', 'super_admin'], permissions: ['*'] };
  }
  console.log('[MW] outgoing req.user:', JSON.stringify(req.user));
  next();
});
await app.init();

// Instrument controller by checking log
const server = app.getHttpServer();
const r = await request(server).get('/orders');
console.log('Response:', r.body);

// Check role via BaseController directly
const { BaseController } = await import('@vubon/shared-kernel/interfaces/controllers');
console.log('userHasAnyRole test:', BaseController.userHasAnyRole(
  { userId: 'dev-user-1', roles: ['admin', 'super_admin'] },
  ['admin', 'super_admin']
));

await app.close();
process.exit(0);

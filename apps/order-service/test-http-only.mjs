process.env.DB_MODE = 'memory';
process.env.DISABLE_AUTH = 'true';

const { NestFactory } = await import('@nestjs/core');
const { OrderAppModule } = await import('./dist/module/modules/app.module.js');
const request = (await import('supertest')).default;

const app = await NestFactory.create(OrderAppModule, { logger: false });
// mimic main.ts bypass
app.use((req, _res, next) => {
  if (!req.user) {
    req.user = { userId: 'dev-user-1', roles: ['admin', 'super_admin'], permissions: ['*'] };
  }
  next();
});
await app.init();
const server = app.getHttpServer();

// 1. GET before
const before = await request(server).get('/orders');
console.log('HTTP GET before:', before.body);

// 2. POST create
const create = await request(server).post('/orders').send({
  customerId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
  items: [{ productId: '7c9e6679-7425-40de-944b-e07fc1f90ae7', quantity: 1, unitPrice: 100 }],
  shippingAddress: { line1: '123 Test St', city: 'Dhaka', country: 'BD' },
});
console.log('HTTP POST result:', create.body);

// 3. GET after
const after = await request(server).get('/orders');
console.log('HTTP GET after:', after.body);

// 4. Check repo directly
const { ORDER_REPOSITORY } = await import('./dist/module/domain/repositories/order.repository.interface.js');
const repo = app.get(ORDER_REPOSITORY, { strict: false });
const all = await repo.findAll();
console.log('Repo findAll:', all.length);

await app.close();
process.exit(0);

process.env.DB_MODE = 'memory';
process.env.DISABLE_AUTH = 'true';

const { NestFactory } = await import('@nestjs/core');
const { OrderAppModule } = await import('./dist/module/modules/app.module.js');
const request = (await import('supertest')).default;

const app = await NestFactory.create(OrderAppModule, { logger: false });
app.use((req, _res, next) => {
  if (!req.user) req.user = { userId: 'dev-user-1', roles: ['admin', 'super_admin'], permissions: ['*'] };
  next();
});
await app.init();
const server = app.getHttpServer();

// Create order
await request(server).post('/orders').send({
  customerId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
  items: [{ productId: '7c9e6679-7425-40de-944b-e07fc1f90ae7', quantity: 1, unitPrice: 100 }],
  shippingAddress: { line1: '123 Test St', city: 'Dhaka', country: 'BD' },
});

// Force instantiate OrderService singleton
const { OrderService } = await import('./dist/module/application/services/impl/order.service.js');
const svc = app.get(OrderService);

// Check repo state directly BEFORE HTTP
const { ORDER_REPOSITORY } = await import('./dist/module/domain/repositories/order.repository.interface.js');
const repo = app.get(ORDER_REPOSITORY, { strict: false });
console.log('Repo findAll BEFORE HTTP GET:', (await repo.findAll()).length);

// HTTP GET
const r1 = await request(server).get('/orders');
console.log('HTTP GET items:', r1.body.items.length);
console.log('HTTP GET body:', JSON.stringify(r1.body));

// Check repo state AFTER HTTP
console.log('Repo findAll AFTER HTTP GET:', (await repo.findAll()).length);

await app.close();
process.exit(0);

process.env.DB_MODE = 'memory';
process.env.DISABLE_AUTH = 'true';

const { NestFactory } = await import('@nestjs/core');
const { OrderAppModule } = await import('./dist/module/modules/app.module.js');
const { ORDER_REPOSITORY } = await import('./dist/module/domain/repositories/order.repository.interface.js');
const request = (await import('supertest')).default;

const app = await NestFactory.create(OrderAppModule, { logger: false });
app.use((req, _res, next) => {
  if (!req.user) req.user = { userId: 'dev-user-1', roles: ['admin', 'super_admin'], permissions: ['*'] };
  next();
});
await app.init();
const server = app.getHttpServer();
const repo = app.get(ORDER_REPOSITORY, { strict: false });

console.log('=== POST #1 via HTTP ===');
const r1 = await request(server).post('/orders').send({
  customerId: 'a1b2c3d4-e5f6-4789-a012-3456789abcde',
  items: [{ productId: '7c9e6679-7425-40de-944b-e07fc1f90ae7', quantity: 1, unitPrice: 100 }],
  shippingAddress: { line1: '123 Test St', city: 'Dhaka', country: 'BD' },
});
console.log('POST #1:', r1.body.success, r1.body.orderId);

console.log('=== Repo findAll direct ===');
const after1 = await repo.findAll();
console.log('Repo count:', after1.length);
after1.forEach(o => console.log('  ', o.id, o.orderNumber.value));

console.log('=== POST #2 via HTTP ===');
const r2 = await request(server).post('/orders').send({
  customerId: '11111111-2222-4333-8444-555555555555',
  items: [{ productId: '7c9e6679-7425-40de-944b-e07fc1f90ae7', quantity: 2, unitPrice: 50 }],
  shippingAddress: { line1: '456 Other St', city: 'Dhaka', country: 'BD' },
});
console.log('POST #2:', r2.body.success, r2.body.orderId);

console.log('=== Repo findAll direct ===');
const after2 = await repo.findAll();
console.log('Repo count:', after2.length);
after2.forEach(o => console.log('  ', o.id, o.orderNumber.value));

console.log('=== GET /orders ===');
const g = await request(server).get('/orders');
console.log('GET items:', g.body.items.length);

await app.close();
process.exit(0);

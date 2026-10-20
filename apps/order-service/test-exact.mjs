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

console.log('=== GET /orders (before) ===');
const r1 = await request(server).get('/orders');
console.log('Result:', r1.body);

console.log('=== POST /orders ===');
const r2 = await request(server).post('/orders').send({
  customerId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
  items: [{ productId: '7c9e6679-7425-40de-944b-e07fc1f90ae7', quantity: 1, unitPrice: 100 }],
  shippingAddress: { line1: '123 Test St', city: 'Dhaka', country: 'BD' },
});
console.log('Result:', r2.body);

console.log('=== GET /orders (after) ===');
const r3 = await request(server).get('/orders');
console.log('Result:', r3.body);

console.log('=== GET /orders (again) ===');
const r4 = await request(server).get('/orders');
console.log('Result:', r4.body);

await app.close();
process.exit(0);

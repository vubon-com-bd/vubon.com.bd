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

const { RedisService } = await import('@vubon/shared-kernel/infrastructure/persistence/cache');
const redis = app.get(RedisService);

// Create 2 orders
await request(server).post('/orders').send({
  customerId: 'a1b2c3d4-e5f6-4789-a012-3456789abcde',
  items: [{ productId: '7c9e6679-7425-40de-944b-e07fc1f90ae7', quantity: 1, unitPrice: 100 }],
  shippingAddress: { line1: '123 Test St', city: 'Dhaka', country: 'BD' },
});
await request(server).post('/orders').send({
  customerId: '11111111-2222-4333-8444-555555555555',
  items: [{ productId: '7c9e6679-7425-40de-944b-e07fc1f90ae7', quantity: 2, unitPrice: 50 }],
  shippingAddress: { line1: '456 Other St', city: 'Dhaka', country: 'BD' },
});

// GET #1 — should be 2
const r1 = await request(server).get('/orders');
console.log('GET #1 items:', r1.body.items.length);

// Check cache
const keys1 = await redis.raw.keys('order-http-cache:*');
console.log('Cache keys after GET #1:', keys1);
for (const k of keys1) {
  const cached = await redis.raw.get(k);
  console.log('  ', k, '→', cached?.slice(0, 80));
}

// Create 3rd order
await request(server).post('/orders').send({
  customerId: '99999999-8888-4777-8666-555555555555',
  items: [{ productId: '7c9e6679-7425-40de-944b-e07fc1f90ae7', quantity: 3, unitPrice: 30 }],
  shippingAddress: { line1: '789 Third St', city: 'Dhaka', country: 'BD' },
});

// GET #2 — should be 3 (or cache 2)
const r2 = await request(server).get('/orders');
console.log('GET #2 items:', r2.body.items.length);

// Check cache again
const keys2 = await redis.raw.keys('order-http-cache:*');
console.log('Cache keys after GET #2:', keys2);

await app.close();
process.exit(0);

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
console.log('Redis connected:', await redis.isHealthy());

// Create order
await request(server).post('/orders').send({
  customerId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
  items: [{ productId: '7c9e6679-7425-40de-944b-e07fc1f90ae7', quantity: 1, unitPrice: 100 }],
  shippingAddress: { line1: '123 Test St', city: 'Dhaka', country: 'BD' },
});

// First GET — should populate cache
const r1 = await request(server).get('/orders');
console.log('GET #1 items:', r1.body.items.length);

// Check Redis keys
const keys = await redis.raw.keys('order-http-cache:*');
console.log('Redis cache keys:', keys);
for (const k of keys) {
  console.log('  ', k, '→', await redis.get(k));
}

// Second GET — should hit cache
const r2 = await request(server).get('/orders');
console.log('GET #2 items:', r2.body.items.length);

await app.close();
process.exit(0);

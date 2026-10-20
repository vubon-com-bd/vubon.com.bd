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

// Call list via service directly with same params
const { OrderService } = await import('./dist/module/application/services/impl/order.service.js');
const svc = app.get(OrderService);

const { OrderControllerMapper } = await import('./dist/module/interfaces/mappers/order.controller.mapper.js');
const options = OrderControllerMapper.toListOptions({});
console.log('Mapped options:', JSON.stringify(options));

const listResult = await svc.list(options);
console.log('svc.list items:', listResult.items.length);

const listByCust = await svc.listByCustomer('dev-user-1', options);
console.log('svc.listByCustomer(dev-user-1) items:', listByCust.items.length);

// Test HTTP GET
const httpGet = await request(server).get('/orders');
console.log('HTTP GET items:', httpGet.body.items.length);

await app.close();
process.exit(0);

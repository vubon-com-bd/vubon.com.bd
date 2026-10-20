process.env.DB_MODE = 'memory';
process.env.DISABLE_AUTH = 'true';

const { NestFactory } = await import('@nestjs/core');
const { OrderAppModule } = await import('./dist/module/modules/app.module.js');
const { ORDER_REPOSITORY } = await import('./dist/module/domain/repositories/order.repository.interface.js');

const app = await NestFactory.createApplicationContext(OrderAppModule, { logger: false });
const repo = app.get(ORDER_REPOSITORY, { strict: false });

const { OrderService } = await import('./dist/module/application/services/impl/order.service.js');
const svc = app.get(OrderService);

await svc.create({
  customerId: 'a1b2c3d4-e5f6-4789-a012-3456789abcde',
  items: [{ productId: '7c9e6679-7425-40de-944b-e07fc1f90ae7', quantity: 1, unitPrice: 100 }],
  shippingAddress: { line1: '123 Test St', city: 'Dhaka', country: 'BD' },
}, 'test-user');
await svc.create({
  customerId: '11111111-2222-4333-8444-555555555555',
  items: [{ productId: '7c9e6679-7425-40de-944b-e07fc1f90ae7', quantity: 2, unitPrice: 50 }],
  shippingAddress: { line1: '456 Other St', city: 'Dhaka', country: 'BD' },
}, 'test-user');

console.log('findAll count:', (await repo.findAll()).length);

const p1 = await repo.findPaginated({ page: 1, limit: 20, filter: {} });
console.log('findPaginated(filter:{}) → items:', p1.items.length, 'total:', p1.total);

const p2 = await repo.findPaginated({ page: 1, limit: 20, filter: { customerId: undefined, status: undefined } });
console.log('findPaginated(filter:{customerId:undefined}) → items:', p2.items.length, 'total:', p2.total);

await app.close();
process.exit(0);

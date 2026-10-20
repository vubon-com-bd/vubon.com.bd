process.env.DB_MODE = 'memory';

const { NestFactory } = await import('@nestjs/core');
const { OrderAppModule } = await import('./dist/module/modules/app.module.js');
const { ORDER_REPOSITORY } = await import('./dist/module/domain/repositories/order.repository.interface.js');

const app = await NestFactory.createApplicationContext(OrderAppModule, { logger: false });
const repo = app.get(ORDER_REPOSITORY);

// Create order with customerId = '7c9e6679-7425-40de-944b-e07fc1f90ae7'
const { OrderService } = await import('./dist/module/application/services/impl/order.service.js');
const svc = app.get(OrderService);
await svc.create({
  customerId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
  items: [{ productId: '7c9e6679-7425-40de-944b-e07fc1f90ae7', quantity: 1, unitPrice: 100 }],
  shippingAddress: { line1: '123 Test St', city: 'Dhaka', country: 'BD' },
}, 'test-user');

// Test listByCustomer with created customerId
const byCustomer = await svc.listByCustomer('7c9e6679-7425-40de-944b-e07fc1f90ae7', { page: 1, limit: 20 });
console.log('listByCustomer (7c9e...) items:', byCustomer.items.length);

// Test listByCustomer with dev-user-1
const byDevUser = await svc.listByCustomer('dev-user-1', { page: 1, limit: 20 });
console.log('listByCustomer (dev-user-1) items:', byDevUser.items.length);

// Test list (admin)
const listAll = await svc.list({ page: 1, limit: 20 });
console.log('list (all) items:', listAll.items.length);

await app.close();
process.exit(0);

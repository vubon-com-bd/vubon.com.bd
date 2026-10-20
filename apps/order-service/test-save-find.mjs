process.env.DB_MODE = 'memory';

const { NestFactory } = await import('@nestjs/core');
const { OrderAppModule } = await import('./dist/module/modules/app.module.js');
const { ORDER_REPOSITORY } = await import('./dist/module/domain/repositories/order.repository.interface.js');

const app = await NestFactory.createApplicationContext(OrderAppModule, { logger: false });
const repo = app.get(ORDER_REPOSITORY);

// 1. Verify findAll empty
const before = await repo.findAll();
console.log('BEFORE save — findAll:', before.length);

// 2. Verify save via service
const { OrderService } = await import('./dist/module/application/services/impl/order.service.js');
const svc = app.get(OrderService);

const created = await svc.create({
  customerId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
  items: [{ productId: '7c9e6679-7425-40de-944b-e07fc1f90ae7', quantity: 1, unitPrice: 100 }],
  shippingAddress: { line1: '123 Test St', city: 'Dhaka', country: 'BD' },
}, 'test-user');

console.log('CREATE result:', JSON.stringify(created));

// 3. Verify findAll after save
const after = await repo.findAll();
console.log('AFTER save — findAll:', after.length);

// 4. Verify findById
if (created.orderId) {
  const byId = await repo.findById(created.orderId);
  console.log('findById:', byId ? 'found' : 'null');
}

// 5. Verify findPaginated
const paginated = await repo.findPaginated({ page: 1, limit: 20 });
console.log('findPaginated items:', paginated.items.length, 'total:', paginated.total);

await app.close();
process.exit(0);

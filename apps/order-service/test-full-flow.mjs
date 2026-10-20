process.env.DB_MODE = 'memory';

const { NestFactory } = await import('@nestjs/core');
const { OrderAppModule } = await import('./dist/module/modules/app.module.js');

const app = await NestFactory.createApplicationContext(OrderAppModule, { logger: false });

const { OrderService } = await import('./dist/module/application/services/impl/order.service.js');
const svc = app.get(OrderService);

const before = await svc.list({ page: 1, limit: 20 });
console.log('BEFORE — list items:', before.items.length);

const created = await svc.create({
  customerId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
  items: [{ productId: '7c9e6679-7425-40de-944b-e07fc1f90ae7', quantity: 1, unitPrice: 100 }],
  shippingAddress: { line1: '123 Test St', city: 'Dhaka', country: 'BD' },
}, 'test-user');
console.log('CREATE:', JSON.stringify(created));

const after = await svc.list({ page: 1, limit: 20 });
console.log('AFTER — list items:', after.items.length);

const byCust = await svc.listByCustomer('7c9e6679-7425-40de-944b-e07fc1f90ae7', { page: 1, limit: 20 });
console.log('byCustomer:', byCust.items.length);

const { ORDER_REPOSITORY } = await import('./dist/module/domain/repositories/order.repository.interface.js');
const repo1 = app.get(ORDER_REPOSITORY, { strict: false });
console.log('Repo1 constructor:', repo1.constructor.name);
const all = await repo1.findAll();
console.log('Repo1 findAll:', all.length);

await app.close();
process.exit(0);

process.env.DB_MODE = 'memory';
process.env.DISABLE_AUTH = 'true';

const { NestFactory } = await import('@nestjs/core');
const { OrderAppModule } = await import('./dist/module/modules/app.module.js');

const app = await NestFactory.createApplicationContext(OrderAppModule, { logger: false });

const { OrderService } = await import('./dist/module/application/services/impl/order.service.js');
const svc = app.get(OrderService);
await svc.create({
  customerId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
  items: [{ productId: '7c9e6679-7425-40de-944b-e07fc1f90ae7', quantity: 1, unitPrice: 100 }],
  shippingAddress: { line1: '123 Test St', city: 'Dhaka', country: 'BD' },
}, 'test-user');

const { OrderController } = await import('./dist/module/interfaces/controllers/rest/order.controller.js');
const ctrl = app.get(OrderController);

const mockUser = { userId: 'dev-user-1', roles: ['admin', 'super_admin'], permissions: ['*'] };

const { BaseController } = await import('@vubon/shared-kernel/interfaces/controllers');
const hasRole = BaseController.userHasAnyRole(mockUser, ['admin', 'super_admin']);
console.log('hasAnyRole:', hasRole);

const result = await ctrl.list({}, mockUser);
console.log('Controller.list items:', result.items.length);
console.log('Result:', JSON.stringify(result));

await app.close();
process.exit(0);

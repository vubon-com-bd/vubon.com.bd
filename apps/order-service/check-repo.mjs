process.env.DB_MODE = 'memory';

const { NestFactory } = await import('@nestjs/core');
const { OrderAppModule } = await import('./dist/module/modules/app.module.js');
const { ORDER_REPOSITORY } = await import('./dist/module/domain/repositories/order.repository.interface.js');

const app = await NestFactory.createApplicationContext(OrderAppModule, { logger: false });
const repo = app.get(ORDER_REPOSITORY);
console.log('Repo constructor:', repo.constructor.name);
await app.close();
process.exit(0);

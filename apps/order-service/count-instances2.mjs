process.env.DB_MODE = 'memory';
process.env.DISABLE_AUTH = 'true';

const { NestFactory } = await import('@nestjs/core');
const { OrderAppModule } = await import('./dist/module/modules/app.module.js');
const { ORDER_REPOSITORY } = await import('./dist/module/domain/repositories/order.repository.interface.js');

const app = await NestFactory.createApplicationContext(OrderAppModule, { logger: false });

// Count distinct ORDER_REPOSITORY instances across all modules
const seen = new Set();
const modules = app.container.getModules();
modules.forEach((mod, key) => {
  try {
    const provider = mod.providers.get(ORDER_REPOSITORY);
    if (provider && provider.instance) {
      seen.add(provider.instance);
      console.log('Module:', key.metatype?.name ?? 'unknown', '→ repo instance ID:', provider.instance.__id ?? 'n/a');
    }
  } catch {}
});
console.log('\nDistinct ORDER_REPOSITORY instances:', seen.size);

// Get 2 repos from different scopes
const repo1 = app.get(ORDER_REPOSITORY, { strict: false });
const repo2 = app.get(ORDER_REPOSITORY, { strict: true });
console.log('repo1 === repo2:', repo1 === repo2);

// Save via repo1, read via repo2
const fake = { id: 'test-1', someData: 'x' };
await repo1.save(fake);
const fromRepo1 = await repo1.findAll();
const fromRepo2 = await repo2.findAll();
console.log('repo1 findAll:', fromRepo1.length);
console.log('repo2 findAll:', fromRepo2.length);

await app.close();
process.exit(0);

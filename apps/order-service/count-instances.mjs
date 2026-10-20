process.env.DB_MODE = 'memory';
process.env.DISABLE_AUTH = 'true';

const { NestFactory } = await import('@nestjs/core');
const { OrderAppModule } = await import('./dist/module/modules/app.module.js');

const app = await NestFactory.createApplicationContext(OrderAppModule, { logger: false });

// Get module container
const container = app.container;
const modules = container.getModules();

console.log('Total modules:', modules.size);
console.log('\n=== Modules with ORDER_REPOSITORY provider ===');
modules.forEach((mod, key) => {
  try {
    const providers = mod.providers;
    providers.forEach((provider, token) => {
      if (String(token).includes('ORDER_REPOSITORY') || String(token) === 'Symbol(ORDER_REPOSITORY)') {
        console.log('Module:', key.metatype?.name, '→ provider:', provider.instance?.constructor?.name);
      }
    });
  } catch (e) {}
});

await app.close();
process.exit(0);

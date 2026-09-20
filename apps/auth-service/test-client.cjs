const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient({ log: ['error', 'warn'] });
p.$queryRaw`SELECT 1 as x`
  .then((r) => { console.log('✅ Prisma Client OK:', r); process.exit(0); })
  .catch((e) => { console.error('❌ Fail:', e.message); process.exit(1); })
  .finally(() => p.$disconnect());

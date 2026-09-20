import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('🌱 Seeding...');

  const password = await bcrypt.hash('Test123!', 12);

  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      password,
      name: 'Test User',
      status: 'active',
      type: 'individual',
      role: 'user',
      emailVerified: true,
    },
  });
  console.log('✅ User:', user.email);

  const perms = [
    { name: 'user.view', action: 'view', resource: 'user' },
    { name: 'user.create', action: 'create', resource: 'user' },
    { name: 'user.update', action: 'update', resource: 'user' },
    { name: 'user.delete', action: 'delete', resource: 'user' },
    { name: 'admin.manage', action: 'manage', resource: 'admin' },
  ];
  for (const p of perms) {
    await prisma.authPermission.upsert({
      where: { name: p.name },
      update: {},
      create: {
        name: p.name,
        action: p.action,
        resource: p.resource,
        description: `${p.action} ${p.resource}`,
      },
    });
  }
  console.log('✅ Permissions');

  const roles = [
    { name: 'user', description: 'Default user role', isSystem: true },
    { name: 'admin', description: 'Administrator', isSystem: true },
  ];
  for (const r of roles) {
    await prisma.authRole.upsert({
      where: { name: r.name },
      update: {},
      create: r,
    });
  }
  console.log('✅ Roles');

  console.log('🎉 Done!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

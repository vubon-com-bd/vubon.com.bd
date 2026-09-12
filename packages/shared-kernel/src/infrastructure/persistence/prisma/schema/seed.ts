import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // eslint-disable-next-line no-console
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('Admin@123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@vubon.com.bd' },
    update: {},
    create: {
      email: 'admin@vubon.com.bd',
      password: adminPassword,
      name: 'Super Admin',
      role: 'super_admin',
      status: 'active',
      isVerified: true,
      profile: {
        create: {
          firstName: 'Super',
          lastName: 'Admin',
        },
      },
    },
  });

  // eslint-disable-next-line no-console
  console.log(`✅ Created admin user: ${admin.email} (ID: ${admin.id})`);

  // Create test user
  const userPassword = await bcrypt.hash('User@123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@vubon.com.bd' },
    update: {},
    create: {
      email: 'user@vubon.com.bd',
      password: userPassword,
      name: 'Test User',
      role: 'user',
      status: 'active',
      isVerified: true,
      profile: {
        create: {
          firstName: 'Test',
          lastName: 'User',
        },
      },
      addresses: {
        create: {
          street: '123 Test Street',
          city: 'Dhaka',
          state: 'Dhaka',
          country: 'Bangladesh',
          zipCode: '1200',
          division: 'dhaka',
          district: 'Dhaka',
          isDefault: true,
        },
      },
    },
  });

  // eslint-disable-next-line no-console
  console.log(`✅ Created test user: ${user.email} (ID: ${user.id})`);

  // eslint-disable-next-line no-console
  console.log('🌱 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

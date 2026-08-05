import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';

// .env ফাইল লোড করুন
config();

/**
 * ডেটাবেস কানেকশন চেক করে
 */
async function checkDatabase(): Promise<void> {
  // eslint-disable-next-line no-console
  console.log('🔍 ডেটাবেস কানেকশন চেক করা হচ্ছে...\n');

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error('❌ DATABASE_URL পাওয়া যায়নি! .env ফাইল চেক করুন।');
    process.exit(1);
  }

  // URL টি সঠিকভাবে ফরম্যাট করা আছে কিনা চেক করুন
  if (!databaseUrl.startsWith('postgresql://')) {
    console.error('❌ DATABASE_URL সঠিক ফরম্যাটে নেই।');
    process.exit(1);
  }

  // eslint-disable-next-line no-console
  console.log('📡 DATABASE_URL ফাউন্ড');

  try {
    // eslint-disable-next-line no-console
    console.log('⏳ ডেটাবেসে কানেক্ট করা হচ্ছে...');

    // Neon ডেটাবেস কানেক্ট করুন - fetch অপশন ছাড়া
    const sql = neon(databaseUrl);

    // সিম্পল কোয়েরি (টাইপ আর্গুমেন্ট ছাড়া)
    const result = await sql`
      SELECT 1 as connected, current_database() as database, version() as version
    `;

    // টাইপ অ্যাসার্টেশন ব্যবহার করুন
    const data = result as Array<{ connected: number; database: string; version: string }>;

    // eslint-disable-next-line no-console
    console.log('\n✅ ডেটাবেস কানেকশন সফল! 🎉');
    // eslint-disable-next-line no-console
    console.log('📊 ডেটাবেস নাম:', data[0].database);
    // eslint-disable-next-line no-console
    console.log('📦 PostgreSQL ভার্সন:', data[0].version);
    // eslint-disable-next-line no-console
    console.log('🔗 কানেকশন স্ট্যাটাস:', data[0].connected === 1 ? '✅ সংযুক্ত' : '❌ সংযুক্ত নয়');
  } catch (error: unknown) {
    console.error('\n❌ ডেটাবেস কানেকশন ফেইলড!');

    console.error('🔴 এরর বিস্তারিত:');

    if (error instanceof Error) {
      console.error('   মেসেজ:', error.message);

      if (error.message.includes('fetch failed')) {
        console.error('\n💡 সম্ভাব্য সমাধান:');

        console.error('   1. ইন্টারনেট কানেকশন চেক করুন');

        console.error('   2. Neon ডেটাবেস URL সঠিক কিনা চেক করুন');

        console.error('   3. Neon Console-এ ডেটাবেস সক্রিয় আছে কিনা দেখুন');
      }

      if (error.message.includes('SSL')) {
        console.error('\n💡 SSL সমস্যা: URL-এ ?sslmode=require যোগ করুন');
      }

      if (error.message.includes('password') || error.message.includes('authentication')) {
        console.error('\n💡 পাসওয়ার্ড সমস্যা: Neon Console থেকে নতুন পাসওয়ার্ড তৈরি করুন');
      }

      if (error.message.includes('timeout')) {
        console.error('\n💡 টাইমআউট সমস্যা: নেটওয়ার্ক স্লো, আবার চেষ্টা করুন');
      }
    }

    process.exit(1);
  }
}

checkDatabase();

import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';

// .env ফাইল লোড করুন
config();

async function checkDatabase() {
  console.log('🔍 ডেটাবেস কানেকশন চেক করা হচ্ছে...\n');

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error('❌ DATABASE_URL পাওয়া যায়নি! .env ফাইল চেক করুন।');
    process.exit(1);
  }

  console.log('📡 DATABASE_URL ফাউন্ড');

  try {
    // Neon ডেটাবেস কানেক্ট করার চেষ্টা
    console.log('⏳ ডেটাবেসে কানেক্ট করা হচ্ছে...');
    
    // প্রথমে একটি সিম্পল হেলথ চেক
    const sql = neon(databaseUrl, {
      fetch: (url, options) => {
        console.log(`🔄 Connecting to: ${url}`);
        return fetch(url, {
          ...options,
          // SSL সঠিকভাবে হ্যান্ডেল করতে
          agent: undefined,
        });
      }
    });
    
    // সিম্পল কোয়েরি
    const result = await sql`SELECT 1 as connected, current_database() as database, version() as version`;
    
    console.log('\n✅ ডেটাবেস কানেকশন সফল! 🎉');
    console.log('📊 ডেটাবেস নাম:', result[0].database);
    console.log('📦 PostgreSQL ভার্সন:', result[0].version);
    console.log('🔗 কানেকশন স্ট্যাটাস:', result[0].connected === 1 ? '✅ সংযুক্ত' : '❌ সংযুক্ত নয়');
    
  } catch (error: any) {
    console.error('\n❌ ডেটাবেস কানেকশন ফেইলড!');
    console.error('🔴 এরর বিস্তারিত:');
    console.error('   মেসেজ:', error.message);
    
    // বিশেষ এরর হ্যান্ডলিং
    if (error.message.includes('fetch failed')) {
      console.error('\n💡 সম্ভাব্য সমাধান:');
      console.error('   1. ইন্টারনেট কানেকশন চেক করুন');
      console.error('   2. Neon ডেটাবেস URL সঠিক কিনা চেক করুন');
      console.error('   3. Neon Console-এ ডেটাবেস সক্রিয় আছে কিনা দেখুন');
      console.error('   4. ফায়ারওয়াল বা প্রক্সি সেটিংস চেক করুন');
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
    
    process.exit(1);
  }
}

checkDatabase();

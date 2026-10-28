const now = new Date();
const future = new Date(now.getTime() + 20000); // 20 sec future

const body = {
  name: 'Debug Schedule ' + Date.now(),
  type: 'scheduled',              // or 'delayed', 'recurring', 'triggered'
  recurrence: 'none',              // ← REQUIRED! 
  scheduledAt: future.toISOString(),
  timezone: 'Asia/Dhaka',
  templateId: '11111111-1111-4111-8111-111111111111',
  recipientIds: ['11111111-1111-4111-8111-111111111111'],  // ← array
};

console.log('═'.repeat(60));
console.log('Creating schedule for:', future.toISOString());
console.log('Payload:', JSON.stringify(body, null, 2));
console.log('═'.repeat(60));

const res = await fetch('http://localhost:4006/schedules', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer test' },
  body: JSON.stringify(body),
});
const data = await res.json();
console.log('Response HTTP:', res.status);
console.log('Status:', data.status);
console.log('NextRunAt:', data.nextRunAt);
console.log('ID:', data.id);
console.log('');

if (!data.id) {
  console.log('❌ Create failed:', JSON.stringify(data, null, 2));
  process.exit(1);
}

// Wait for worker
console.log('Waiting 25 seconds for worker to fire...');
await new Promise(r => setTimeout(r, 25000));

// Check after
const check = await fetch(`http://localhost:4006/schedules/${data.id}`);
const after = await check.json();
console.log('');
console.log('═'.repeat(60));
console.log('AFTER 25s:');
console.log('  Status:', after.status);
console.log('  RunCount:', after.runCount);
console.log('  LastRunAt:', after.lastRunAt);
console.log('═'.repeat(60));

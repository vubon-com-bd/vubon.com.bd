const now = new Date();
const future = new Date(now.getTime() + 120000); // 2 min

const body = {
  name: 'Direct Test ' + Date.now(),
  type: 'scheduled',
  recurrence: 'none',
  scheduledAt: future.toISOString(),
  timezone: 'Asia/Dhaka',
  templateId: '11111111-1111-4111-8111-111111111111',
  recipientIds: ['11111111-1111-4111-8111-111111111111'],
};

const res = await fetch('http://localhost:4006/schedules', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer test' },
  body: JSON.stringify(body),
});
const data = await res.json();

console.log('═══ CREATE RESPONSE ═══');
console.log('HTTP:', res.status);
console.log('Full response:', JSON.stringify(data, null, 2));

// Immediately check via GET
console.log('\n═══ IMMEDIATE GET ═══');
const check = await fetch(`http://localhost:4006/schedules/${data.id}`);
const after = await check.json();
console.log('GET status:', after.status);
console.log('GET runCount:', after.runCount);
console.log('GET nextRunAt:', after.nextRunAt);

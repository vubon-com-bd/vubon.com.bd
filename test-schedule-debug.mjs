// Full schedule lifecycle test
const now = new Date();
const future = new Date(now.getTime() + 15000); // 15 sec future

const body = {
  name: 'Debug Schedule ' + Date.now(),
  type: 'scheduled',
  scheduledAt: future.toISOString(),
  timezone: 'Asia/Dhaka',
  templateId: '11111111-1111-4111-8111-111111111111',
  recipientCount: 1,
};

console.log('═'.repeat(60));
console.log('Creating schedule for:', future.toISOString());
console.log('═'.repeat(60));

const res = await fetch('http://localhost:4006/schedules', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer test' },
  body: JSON.stringify(body),
});
const data = await res.json();
console.log('Response HTTP:', res.status);
console.log('Status in response:', data.status);
console.log('NextRunAt:', data.nextRunAt);
console.log('ID:', data.id);
console.log('');

// Check immediately after creation
await new Promise(r => setTimeout(r, 500));
const check1 = await fetch(`http://localhost:4006/schedules/${data.id}`);
const after1 = await check1.json();
console.log('After 0.5s — Status:', after1.status, '| RunCount:', after1.runCount);

console.log('');
console.log('Waiting 20 seconds for worker...');

// Wait for worker to fire
await new Promise(r => setTimeout(r, 20000));

// Check after
const check2 = await fetch(`http://localhost:4006/schedules/${data.id}`);
const after2 = await check2.json();
console.log('');
console.log('After 20s — Status:', after2.status, '| RunCount:', after2.runCount);
console.log('Full state:', JSON.stringify(after2, null, 2));

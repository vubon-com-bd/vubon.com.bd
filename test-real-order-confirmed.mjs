import { readFileSync } from 'fs';
import nodemailer from 'nodemailer';

const env = {};
readFileSync(
  '/data/data/com.termux/files/home/vubon.com.bd/apps/notification-service/.env',
  'utf8'
).split('\n').forEach(line => {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
});

// ─── Import REAL compiled template ───
const templates = await import(
  '/data/data/com.termux/files/home/vubon.com.bd/apps/notification-service/dist/module/infrastructure/external/email/templates/bangla-templates.js'
);

console.log('═══════════════════════════════════════════');
console.log('  🧪 REAL TEMPLATE — Order Confirmation');
console.log('═══════════════════════════════════════════\n');

console.log('Available functions:', Object.keys(templates).filter(k => k.startsWith('render')).length);
console.log('');

// ─── Use REAL template ───
try {
  const html = templates.renderOrderConfirmationEmail({
    name: 'মোঃ জুয়েল',
    orderId: 'ORD-REAL-2026-001',
    total: 27400,
    currency: 'BDT',
    locale: 'bn',
  });

  console.log('✅ HTML generated:', html.length, 'chars');
  console.log('');
  console.log('📄 First 500 chars:');
  console.log(html.substring(0, 500));
  console.log('');

  // ─── Send via SMTP ───
  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT),
    secure: env.SMTP_SECURE === 'true',
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASSWORD },
  });

  console.log('📮 Sending...');
  const info = await transporter.sendMail({
    from: env.SMTP_FROM,
    to: env.SMTP_USER,
    subject: '🧪 REAL Template Test — Order Confirmation',
    html,
  });
  console.log('✅ SENT! Message ID:', info.messageId);
} catch (err) {
  console.error('❌ FAILED:', err.message);
  console.error(err.stack);
}

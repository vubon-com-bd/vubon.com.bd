#!/usr/bin/env node
/**
 * Real Template Test Runner
 * Usage: node scripts/test-runner.mjs <templateName> '<json-input>'
 * Example: node scripts/test-runner.mjs renderOrderConfirmationEmail '{"name":"Test","orderId":"ORD-001","total":5000,"currency":"BDT","locale":"bn"}'
 */

import { readFileSync } from 'fs';
import nodemailer from 'nodemailer';

const [,, templateName, inputJson] = process.argv;

if (!templateName) {
  console.error('Usage: node test-runner.mjs <templateName> <json-input>');
  process.exit(1);
}

const env = {};
readFileSync(
  '/data/data/com.termux/files/home/vubon.com.bd/apps/notification-service/.env',
  'utf8'
).split('\n').forEach(line => {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
});

const templates = await import(
  '/data/data/com.termux/files/home/vubon.com.bd/apps/notification-service/dist/module/infrastructure/external/email/templates/bangla-templates.js'
);

const input = JSON.parse(inputJson || '{}');

console.log(`\n═══════════════════════════════════════════════════`);
console.log(`  🧪 ${templateName}`);
console.log(`═══════════════════════════════════════════════════\n`);
console.log('📥 Input:', JSON.stringify(input, null, 2));
console.log('');

try {
  const fn = templates[templateName];
  if (typeof fn !== 'function') {
    console.error(`❌ Function "${templateName}" not found`);
    process.exit(1);
  }

  const html = fn(input);
  console.log(`✅ HTML: ${html.length} chars`);

  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT),
    secure: env.SMTP_SECURE === 'true',
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASSWORD },
  });

  console.log(`📮 Sending...`);
  const info = await transporter.sendMail({
    from: env.SMTP_FROM,
    to: env.SMTP_USER,
    subject: `🧪 ${templateName}`,
    html,
  });
  console.log(`✅ SENT: ${info.messageId}`);
  console.log(`\n👉 Inbox চেক করুন\n`);
} catch (err) {
  console.error(`❌ FAILED: ${err.message}`);
  console.error(err.stack);
  process.exit(1);
}

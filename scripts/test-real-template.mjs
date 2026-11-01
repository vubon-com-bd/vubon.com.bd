#!/usr/bin/env node
/**
 * REAL Template Test — Uses ACTUAL renderOrderConfirmationEmail
 * from bangla-templates.ts
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';

// ─── Load .env ──────────────────────────────────
const env = {};
readFileSync(
  resolve(process.env.HOME, 'vubon.com.bd/apps/notification-service/.env'),
  'utf8'
).split('\n').forEach(line => {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
});

// ─── Import REAL template ──────────────────────
// Note: We'll compile the .ts file to JS on-the-fly using tsx/ts-node
// OR extract the function via eval

import { execSync } from 'child_process';

console.log('═══════════════════════════════════════════════════');
console.log('  🧪 REAL TEMPLATE TEST');
console.log('  Uses: renderOrderConfirmationEmail from bangla-templates.ts');
console.log('═══════════════════════════════════════════════════\n');

// ─── Step 1: Verify template exists ────────────
const TEMPLATE_FILE = resolve(
  process.env.HOME,
  'vubon.com.bd/apps/notification-service/src/module/infrastructure/external/email/templates/bangla-templates.ts'
);

const templateContent = readFileSync(TEMPLATE_FILE, 'utf8');
if (!templateContent.includes('export function renderOrderConfirmationEmail')) {
  console.error('❌ renderOrderConfirmationEmail NOT FOUND');
  process.exit(1);
}
console.log('✅ Template found\n');

// ─── Step 2: Show template signature ───────────
const interfaceMatch = templateContent.match(
  /export interface OrderConfirmationEmailInput \{([^}]+)\}/
);
if (interfaceMatch) {
  console.log('📋 Input Interface:');
  console.log(interfaceMatch[1].split('\n').filter(l => l.trim()).map(l => '  ' + l.trim()).join('\n'));
  console.log('');
}

// ─── Step 3: Extract function body ────────────
const fnStart = templateContent.indexOf('export function renderOrderConfirmationEmail');
let braceCount = 0;
let fnEnd = -1;
let started = false;

for (let i = fnStart; i < templateContent.length; i++) {
  const ch = templateContent[i];
  if (ch === '{') { braceCount++; started = true; }
  else if (ch === '}') {
    braceCount--;
    if (started && braceCount === 0) { fnEnd = i + 1; break; }
  }
}

if (fnEnd === -1) {
  console.error('❌ Could not extract function body');
  process.exit(1);
}

const fnBody = templateContent.slice(fnStart, fnEnd);

// ─── Step 4: Prepare a testable version ────────
// Extract BanglaEmailTemplate import path
console.log('📦 Preparing test...\n');
console.log('Function length:', fnBody.length, 'chars');
console.log('');

// Write a temporary test file that imports the real template
const testContent = `
import { readFileSync } from 'fs';
import nodemailer from 'nodemailer';

// Load .env
const env = {};
readFileSync(
  '${resolve(process.env.HOME, 'vubon.com.bd/apps/notification-service/.env')}',
  'utf8'
).split('\\n').forEach(line => {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
});

// Import REAL template
import { renderOrderConfirmationEmail } from '${TEMPLATE_FILE.replace('.ts', '.js')}';

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT),
  secure: env.SMTP_SECURE === 'true',
  auth: { user: env.SMTP_USER, pass: env.SMTP_PASSWORD },
});

(async () => {
  try {
    console.log('🎨 Calling real renderOrderConfirmationEmail()...');
    const html = renderOrderConfirmationEmail({
      name: 'মোঃ জুয়েল',
      orderId: 'ORD-2026-000200',
      total: 27400,
      currency: 'BDT',
      locale: 'bn',
    });
    console.log('   ✅ HTML generated:', html.length, 'chars');
    console.log('   First 200 chars:', html.substring(0, 200));
    console.log('');

    console.log('📮 Sending via SMTP...');
    const info = await transporter.sendMail({
      from: env.SMTP_FROM,
      to: env.SMTP_USER,
      subject: '🧪 REAL Template Test — Order Confirmation',
      html,
    });
    console.log('   ✅ SENT!');
    console.log('   Message ID:', info.messageId);
  } catch (err) {
    console.error('❌ FAILED:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
})();
`;

console.log('═══════════════════════════════════════════════════');
console.log('  📄 NEXT STEPS');
console.log('═══════════════════════════════════════════════════\n');
console.log('1. First, we need to build the .ts to .js');
console.log('   Run: cd apps/notification-service && pnpm build');
console.log('');
console.log('2. Then run:');
console.log('   node ' + resolve(process.env.HOME, 'vubon.com.bd/scripts/test-real-template.mjs'));
console.log('');
console.log('OR use tsx to run .ts directly:');
console.log('   npx tsx ' + resolve(process.env.HOME, 'vubon.com.bd/scripts/test-real-template.mjs'));

import { createHmac } from 'node:crypto';
import { readFileSync } from 'node:fs';

// Load .env
const envContent = readFileSync('apps/payment-service/.env', 'utf-8');
const envVars = {};
for (const line of envContent.split('\n')) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m) envVars[m[1]] = m[2];
}

const secret = envVars.QR_HMAC_SECRET || 'dev-qr-secret-change-in-prod';
const v = 1;
const invoiceId = process.argv[2];
const orderId = process.argv[3] || '22222222-2222-4222-8222-222222222222';
const deliveryId = null;
const issuedAt = new Date().toISOString();

const signInput = `${v}|${orderId}|${invoiceId}|${deliveryId ?? ''}|${issuedAt}`;
const sig = createHmac('sha256', secret).update(signInput).digest('hex');

const payload = { v, orderId, invoiceId, deliveryId, issuedAt, sig };
console.log(JSON.stringify(payload));

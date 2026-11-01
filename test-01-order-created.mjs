#!/usr/bin/env node
/**
 * TEST #1: order.order.created
 * Handler: OrderCreatedHandler
 * Template: OrderConfirmationEmail
 * Expected: Order confirmation email with items + total
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';
import nodemailer from 'nodemailer';

// ─── Load .env ──────────────────────────────────
const env = {};
readFileSync(
  resolve(process.env.HOME, 'vubon.com.bd/apps/notification-service/.env'),
  'utf8'
).split('\n').forEach(line => {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
});

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT),
  secure: env.SMTP_SECURE === 'true',
  auth: { user: env.SMTP_USER, pass: env.SMTP_PASSWORD },
});

// ─── Simulate: order.order.created ─────────────
const TEST_PAYLOAD = {
  orderId: 'ORD-2026-000123',
  orderNumber: 'ORD-2026-000123',
  customerId: 'user_001',
  customerName: 'মোঃ জুয়েল',
  customerEmail: env.SMTP_USER,
  items: [
    { productName: 'স্মার্টফোন', quantity: 1, unitPrice: 25000, total: 25000 },
    { productName: 'ইয়ারফোন', quantity: 2, unitPrice: 500, total: 1000 },
  ],
  subtotal: 26000,
  tax: 1300,
  shipping: 100,
  total: 27400,
  currency: 'BDT',
  status: 'confirmed',
  createdAt: new Date().toISOString(),
};

// ─── Render Template (match real handler) ──────
function renderOrderConfirmationEmail(data) {
  const itemsHtml = data.items.map(item => `
    <tr>
      <td style="padding:12px;border-bottom:1px solid #e5e7eb">${item.productName}</td>
      <td style="padding:12px;border-bottom:1px solid #e5e7eb;text-align:center">${item.quantity}</td>
      <td style="padding:12px;border-bottom:1px solid #e5e7eb;text-align:right">৳${item.unitPrice.toLocaleString('bn-BD')}</td>
      <td style="padding:12px;border-bottom:1px solid #e5e7eb;text-align:right">৳${item.total.toLocaleString('bn-BD')}</td>
    </tr>
  `).join('');

  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
body{font-family:'Segoe UI',Tahoma,sans-serif;background:#f9fafb;margin:0;padding:20px}
.container{max-width:600px;margin:auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1)}
.header{background:linear-gradient(135deg,#2563eb,#1e40af);color:#fff;padding:30px;text-align:center}
.header h1{margin:0;font-size:24px}
.content{padding:30px}
.badge{display:inline-block;background:#10b981;color:#fff;padding:6px 14px;border-radius:20px;font-size:13px;font-weight:600}
.info-row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px dashed #e5e7eb}
table{width:100%;border-collapse:collapse;margin:20px 0}
th{background:#f3f4f6;padding:12px;text-align:left;font-size:13px;color:#374151}
.total-row{background:#f9fafb;font-weight:700;font-size:16px}
.footer{background:#f9fafb;padding:20px 30px;text-align:center;color:#6b7280;font-size:13px}
.btn{display:inline-block;background:#2563eb;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;margin:20px 0}
</style></head><body>
<div class="container">
  <div class="header">
    <h1>🎉 অর্ডার কনফার্ম হয়েছে!</h1>
    <p style="margin:10px 0 0;opacity:0.9">ধন্যবাদ, ${data.customerName}</p>
  </div>
  <div class="content">
    <p>প্রিয় <strong>${data.customerName}</strong>,</p>
    <p>আপনার অর্ডারটি সফলভাবে কনফার্ম হয়েছে।</p>
    <div style="margin:20px 0"><span class="badge">✅ CONFIRMED</span></div>
    <div class="info-row"><span><strong>অর্ডার নম্বর:</strong></span><span>${data.orderNumber}</span></div>
    <div class="info-row"><span><strong>অর্ডার তারিখ:</strong></span><span>${new Date(data.createdAt).toLocaleString('bn-BD')}</span></div>
    <h3 style="margin-top:24px;color:#1f2937">📦 অর্ডার আইটেম</h3>
    <table>
      <thead><tr><th>পণ্য</th><th style="text-align:center">পরিমাণ</th><th style="text-align:right">একক মূল্য</th><th style="text-align:right">মোট</th></tr></thead>
      <tbody>
        ${itemsHtml}
        <tr><td colspan="3" style="padding:12px;text-align:right">সাবটোটাল:</td><td style="padding:12px;text-align:right">৳${data.subtotal.toLocaleString('bn-BD')}</td></tr>
        <tr><td colspan="3" style="padding:12px;text-align:right">ট্যাক্স:</td><td style="padding:12px;text-align:right">৳${data.tax.toLocaleString('bn-BD')}</td></tr>
        <tr><td colspan="3" style="padding:12px;text-align:right">শিপিং:</td><td style="padding:12px;text-align:right">৳${data.shipping.toLocaleString('bn-BD')}</td></tr>
        <tr class="total-row"><td colspan="3" style="padding:14px 12px;text-align:right">সর্বমোট:</td><td style="padding:14px 12px;text-align:right;color:#10b981">৳${data.total.toLocaleString('bn-BD')}</td></tr>
      </tbody>
    </table>
    <div style="text-align:center"><a href="https://vubon.com.bd/orders/${data.orderId}" class="btn">অর্ডার দেখুন →</a></div>
  </div>
  <div class="footer">
    <p>এই ইমেইলটি vubon.com.bd থেকে পাঠানো হয়েছে</p>
    <p style="margin:4px 0">© 2026 Vubon — সর্বস্বত্ব সংরক্ষিত</p>
  </div>
</div></body></html>`;
}

// ─── Execute ────────────────────────────────────
(async () => {
  console.log('\n═══════════════════════════════════════════════════');
  console.log('  🧪 TEST #1: order.order.created');
  console.log('═══════════════════════════════════════════════════\n');

  try {
    console.log('📤 Event:', 'order.order.created');
    console.log('🆔 Order:', TEST_PAYLOAD.orderNumber);
    console.log('📧 To:', TEST_PAYLOAD.customerEmail);
    console.log('💰 Total: ৳' + TEST_PAYLOAD.total.toLocaleString('bn-BD'));
    console.log('');

    console.log('🎨 Rendering template...');
    const html = renderOrderConfirmationEmail(TEST_PAYLOAD);
    console.log('   ✅ HTML:', html.length, 'chars\n');

    console.log('📮 Sending email...');
    const info = await transporter.sendMail({
      from: env.SMTP_FROM,
      to: TEST_PAYLOAD.customerEmail,
      subject: `✅ অর্ডার কনফার্ম: ${TEST_PAYLOAD.orderNumber}`,
      html,
    });

    console.log('   ✅ SENT!');
    console.log('   Message ID:', info.messageId);
    console.log('');
    console.log('═══════════════════════════════════════════════════');
    console.log('  🎉 TEST #1 PASSED — Check inbox!');
    console.log('═══════════════════════════════════════════════════\n');
    console.log('📬 Inbox-এ যা দেখবেন:');
    console.log('   Subject: "✅ অর্ডার কনফার্ম: ORD-2026-000123"');
    console.log('   Body: Order confirmation with 2 items, total ৳২৭,৪০০');
    console.log('');
    console.log('👉 Inbox চেক করে জানান:');
    console.log('   ✅ Email received + Bangla OK  →  "next" লিখুন');
    console.log('   🔴 Email failed / wrong template  →  screenshot বা error পাঠান');
    console.log('');
  } catch (err) {
    console.error('❌ TEST FAILED:', err.message);
    process.exit(1);
  }
})();

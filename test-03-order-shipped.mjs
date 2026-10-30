#!/usr/bin/env node
/**
 * TEST #3: order.order.shipped
 * Handler: OrderShippedHandler
 * Template: renderDeliveryEmail
 * Expected: Shipment notification with tracking info
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';
import nodemailer from 'nodemailer';

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

const TEST_PAYLOAD = {
  orderId: 'ORD-2026-000125',
  orderNumber: 'ORD-2026-000125',
  customerName: 'করিম আহমেদ',
  customerEmail: env.SMTP_USER,
  trackingNumber: 'TRK-BD-987654321',
  courierName: 'Sundarban Courier',
  courierPhone: '+8809612345678',
  estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
  shippedAt: new Date().toISOString(),
  items: [
    { productName: 'টি-শার্ট', quantity: 3, unitPrice: 800, total: 2400 },
  ],
  total: 2400,
  currency: 'BDT',
  shippingAddress: '১২৩ মিরপুর রোড, ঢাকা-১২১৬',
  trackingUrl: 'https://vubon.com.bd/track/TRK-BD-987654321',
};

function renderDeliveryEmail(data) {
  const itemsHtml = data.items.map(item => `
    <tr>
      <td style="padding:12px;border-bottom:1px solid #e5e7eb">${item.productName}</td>
      <td style="padding:12px;border-bottom:1px solid #e5e7eb;text-align:center">${item.quantity}</td>
      <td style="padding:12px;border-bottom:1px solid #e5e7eb;text-align:right">৳${item.total.toLocaleString('bn-BD')}</td>
    </tr>
  `).join('');

  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
body{font-family:'Segoe UI',Tahoma,sans-serif;background:#f9fafb;margin:0;padding:20px}
.container{max-width:600px;margin:auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1)}
.header{background:linear-gradient(135deg,#f59e0b,#d97706);color:#fff;padding:30px;text-align:center}
.header h1{margin:0;font-size:24px}
.content{padding:30px}
.tracking-box{background:#fef3c7;border-left:4px solid #f59e0b;padding:16px;margin:20px 0;border-radius:4px}
.tracking-num{font-family:'Courier New',monospace;font-size:18px;font-weight:700;color:#92400e;margin:8px 0}
.timeline{display:flex;justify-content:space-between;margin:20px 0;position:relative}
.step{flex:1;text-align:center;position:relative}
.step-icon{width:40px;height:40px;border-radius:50%;background:#10b981;color:#fff;display:flex;align-items:center;justify-content:center;margin:0 auto;font-size:20px}
.step-icon.pending{background:#d1d5db}
.step-label{font-size:12px;margin-top:8px;color:#374151}
.info-row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px dashed #e5e7eb}
table{width:100%;border-collapse:collapse;margin:20px 0}
th{background:#f3f4f6;padding:12px;text-align:left;font-size:13px;color:#374151}
.footer{background:#f9fafb;padding:20px 30px;text-align:center;color:#6b7280;font-size:13px}
.btn{display:inline-block;background:#f59e0b;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;margin:20px 0}
</style></head><body>
<div class="container">
  <div class="header">
    <h1>🚚 আপনার অর্ডার পাঠানো হয়েছে!</h1>
    <p style="margin:10px 0 0;opacity:0.9">${data.customerName}, আপনার প্যাকেজ রাস্তায়</p>
  </div>
  <div class="content">
    <p>প্রিয় <strong>${data.customerName}</strong>,</p>
    <p>আপনার অর্ডারটি সফলভাবে <strong>শিপ</strong> করা হয়েছে এবং এখন পথে আছে।</p>

    <div class="tracking-box">
      <p style="margin:0;font-weight:600;color:#92400e">📦 ট্র্যাকিং নম্বর</p>
      <p class="tracking-num">${data.trackingNumber}</p>
      <p style="margin:0;color:#78350f;font-size:14px">কুরিয়ার: ${data.courierName}</p>
      <p style="margin:4px 0 0;color:#78350f;font-size:14px">ফোন: ${data.courierPhone}</p>
    </div>

    <div class="timeline">
      <div class="step">
        <div class="step-icon">✓</div>
        <div class="step-label">অর্ডার<br>গৃহীত</div>
      </div>
      <div class="step">
        <div class="step-icon">✓</div>
        <div class="step-label">প্রস্তুত</div>
      </div>
      <div class="step">
        <div class="step-icon">🚚</div>
        <div class="step-label"><b>শিপড</b></div>
      </div>
      <div class="step">
        <div class="step-icon pending">📬</div>
        <div class="step-label">ডেলিভারি</div>
      </div>
    </div>

    <div class="info-row"><span><strong>অর্ডার নম্বর:</strong></span><span>${data.orderNumber}</span></div>
    <div class="info-row"><span><strong>শিপ হয়েছে:</strong></span><span>${new Date(data.shippedAt).toLocaleString('bn-BD')}</span></div>
    <div class="info-row"><span><strong>আনুমানিক ডেলিভারি:</strong></span><span>${new Date(data.estimatedDelivery).toLocaleDateString('bn-BD', { weekday: 'long', month: 'long', day: 'numeric' })}</span></div>

    <h3 style="margin-top:24px;color:#1f2937">📋 প্যাকেজে আছে</h3>
    <table>
      <thead><tr><th>পণ্য</th><th style="text-align:center">পরিমাণ</th><th style="text-align:right">মোট</th></tr></thead>
      <tbody>${itemsHtml}</tbody>
    </table>

    <p style="color:#6b7280;font-size:14px"><strong>ডেলিভারি ঠিকানা:</strong><br>${data.shippingAddress}</p>

    <div style="text-align:center"><a href="${data.trackingUrl}" class="btn">লাইভ ট্র্যাক করুন →</a></div>
  </div>
  <div class="footer">
    <p>কুরিয়ার সংক্রান্ত সমস্যায় যোগাযোগ: ${data.courierPhone}</p>
    <p style="margin:4px 0">© 2026 Vubon — সর্বস্বত্ব সংরক্ষিত</p>
  </div>
</div></body></html>`;
}

(async () => {
  console.log('\n═══════════════════════════════════════════════════');
  console.log('  🧪 TEST #3: order.order.shipped');
  console.log('═══════════════════════════════════════════════════\n');

  try {
    console.log('📤 Event:', 'order.order.shipped');
    console.log('🆔 Order:', TEST_PAYLOAD.orderNumber);
    console.log('📦 Tracking:', TEST_PAYLOAD.trackingNumber);
    console.log('📧 To:', TEST_PAYLOAD.customerEmail);
    console.log('');

    console.log('🎨 Rendering template...');
    const html = renderDeliveryEmail(TEST_PAYLOAD);
    console.log('   ✅ HTML:', html.length, 'chars\n');

    console.log('📮 Sending email...');
    const info = await transporter.sendMail({
      from: env.SMTP_FROM,
      to: TEST_PAYLOAD.customerEmail,
      subject: `🚚 আপনার অর্ডার শিপড: ${TEST_PAYLOAD.orderNumber}`,
      html,
    });

    console.log('   ✅ SENT!');
    console.log('   Message ID:', info.messageId);
    console.log('');
    console.log('═══════════════════════════════════════════════════');
    console.log('  🎉 TEST #3 PASSED — Check inbox!');
    console.log('═══════════════════════════════════════════════════\n');
    console.log('📬 Inbox-এ যা দেখবেন:');
    console.log('   Subject: "🚚 আপনার অর্ডার শিপড: ORD-2026-000125"');
    console.log('   Body: Orange header, tracking number, timeline, courier info');
    console.log('');
    console.log('👉 Result: "next" অথবা error message');
  } catch (err) {
    console.error('❌ TEST FAILED:', err.message);
    process.exit(1);
  }
})();

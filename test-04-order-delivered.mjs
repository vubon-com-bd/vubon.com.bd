#!/usr/bin/env node
/**
 * TEST #4: order.order.delivered
 * Handler: OrderDeliveredHandler
 * Template: renderDeliveryEmail
 * Expected: Delivery confirmation with review CTA
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
  orderId: 'ORD-2026-000126',
  orderNumber: 'ORD-2026-000126',
  customerName: 'ফাতেমা বেগম',
  customerEmail: env.SMTP_USER,
  trackingNumber: 'TRK-BD-987654322',
  courierName: 'Pathao Courier',
  deliveredAt: new Date().toISOString(),
  items: [
    { productName: 'হেডফোন', quantity: 1, unitPrice: 3500, total: 3500, reviewUrl: 'https://vubon.com.bd/review/headphone-001' },
    { productName: 'চার্জার ক্যাবল', quantity: 2, unitPrice: 200, total: 400, reviewUrl: 'https://vubon.com.bd/review/cable-001' },
  ],
  total: 3900,
  currency: 'BDT',
  reviewUrl: 'https://vubon.com.bd/reviews/ORD-2026-000126',
  supportUrl: 'https://vubon.com.bd/support',
};

function renderDeliveryEmail(data) {
  const itemsHtml = data.items.map(item => `
    <tr>
      <td style="padding:12px;border-bottom:1px solid #e5e7eb">${item.productName}</td>
      <td style="padding:12px;border-bottom:1px solid #e5e7eb;text-align:center">${item.quantity}</td>
      <td style="padding:12px;border-bottom:1px solid #e5e7eb;text-align:right">
        <a href="${item.reviewUrl}" style="color:#2563eb;text-decoration:none;font-size:13px">রিভিউ দিন ⭐</a>
      </td>
    </tr>
  `).join('');

  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
body{font-family:'Segoe UI',Tahoma,sans-serif;background:#f9fafb;margin:0;padding:20px}
.container{max-width:600px;margin:auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1)}
.header{background:linear-gradient(135deg,#10b981,#047857);color:#fff;padding:30px;text-align:center}
.header h1{margin:0;font-size:26px}
.header .check{font-size:60px;margin-bottom:10px;display:block}
.content{padding:30px}
.success-box{background:#d1fae5;border:2px solid #10b981;padding:20px;border-radius:8px;text-align:center;margin:20px 0}
.success-box h2{margin:0 0 8px;color:#065f46}
.success-box p{margin:0;color:#047857}
.info-row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px dashed #e5e7eb}
table{width:100%;border-collapse:collapse;margin:20px 0}
th{background:#f3f4f6;padding:12px;text-align:left;font-size:13px;color:#374151}
.stars{text-align:center;margin:20px 0}
.star{font-size:36px;color:#fbbf24;text-decoration:none;margin:0 4px}
.footer{background:#f9fafb;padding:20px 30px;text-align:center;color:#6b7280;font-size:13px}
.btn{display:inline-block;background:#10b981;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;margin:8px}
.btn-outline{background:#fff;color:#10b981;border:2px solid #10b981}
</style></head><body>
<div class="container">
  <div class="header">
    <span class="check">✅</span>
    <h1>আপনার অর্ডার ডেলিভার হয়েছে!</h1>
    <p style="margin:10px 0 0;opacity:0.9">ধন্যবাদ ${data.customerName}</p>
  </div>
  <div class="content">
    <div class="success-box">
      <h2>🎉 সফলভাবে ডেলিভারি সম্পন্ন</h2>
      <p>${new Date(data.deliveredAt).toLocaleString('bn-BD', { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
    </div>

    <p>প্রিয় <strong>${data.customerName}</strong>,</p>
    <p>আপনার অর্ডারটি <strong>সফলভাবে ডেলিভার</strong> হয়েছে। আমাদের সাথে কেনাকাটার জন্য ধন্যবাদ!</p>

    <div class="info-row"><span><strong>অর্ডার নম্বর:</strong></span><span>${data.orderNumber}</span></div>
    <div class="info-row"><span><strong>ট্র্যাকিং নম্বর:</strong></span><span>${data.trackingNumber}</span></div>
    <div class="info-row"><span><strong>কুরিয়ার:</strong></span><span>${data.courierName}</span></div>
    <div class="info-row"><span><strong>সর্বমোট:</strong></span><span style="font-weight:700;color:#10b981">৳${data.total.toLocaleString('bn-BD')}</span></div>

    <h3 style="margin-top:24px;color:#1f2937">📦 ডেলিভারি আইটেম</h3>
    <table>
      <thead><tr><th>পণ্য</th><th style="text-align:center">পরিমাণ</th><th style="text-align:right">রিভিউ</th></tr></thead>
      <tbody>${itemsHtml}</tbody>
    </table>

    <div style="background:#eff6ff;padding:20px;border-radius:8px;margin:20px 0;text-align:center">
      <h3 style="margin:0 0 10px;color:#1e40af">⭐ আপনার মতামত জানান</h3>
      <p style="margin:0 0 15px;color:#475569;font-size:14px">আপনার রিভিউ অন্য ক্রেতাদের সিদ্ধান্ত নিতে সাহায্য করে</p>
      <div class="stars">
        <a href="${data.reviewUrl}?rating=5" class="star">⭐</a>
        <a href="${data.reviewUrl}?rating=4" class="star">⭐</a>
        <a href="${data.reviewUrl}?rating=3" class="star">⭐</a>
        <a href="${data.reviewUrl}?rating=2" class="star">⭐</a>
        <a href="${data.reviewUrl}?rating=1" class="star">⭐</a>
      </div>
    </div>

    <div style="text-align:center;margin-top:24px">
      <a href="${data.reviewUrl}" class="btn">রিভিউ দিন</a>
      <a href="${data.supportUrl}" class="btn btn-outline">সাহায্য দরকার?</a>
    </div>

    <div style="margin-top:24px;padding:16px;background:#fef2f2;border-radius:8px;border-left:4px solid #ef4444">
      <p style="margin:0;font-size:14px;color:#991b1b"><strong>⚠️ কোনো সমস্যা?</strong> ৭ দিনের মধ্যে রিটার্ন/এক্সচেঞ্জের জন্য যোগাযোগ করুন।</p>
    </div>
  </div>
  <div class="footer">
    <p>সমস্যা হলে: support@vubon.com.bd | হটলাইন: ১৬২৪৭</p>
    <p style="margin:4px 0">© 2026 Vubon — সর্বস্বত্ব সংরক্ষিত</p>
  </div>
</div></body></html>`;
}

(async () => {
  console.log('\n═══════════════════════════════════════════════════');
  console.log('  🧪 TEST #4: order.order.delivered');
  console.log('═══════════════════════════════════════════════════\n');

  try {
    console.log('📤 Event:', 'order.order.delivered');
    console.log('🆔 Order:', TEST_PAYLOAD.orderNumber);
    console.log('📬 Delivered by:', TEST_PAYLOAD.courierName);
    console.log('📧 To:', TEST_PAYLOAD.customerEmail);
    console.log('💰 Total: ৳' + TEST_PAYLOAD.total.toLocaleString('bn-BD'));
    console.log('');

    console.log('🎨 Rendering template...');
    const html = renderDeliveryEmail(TEST_PAYLOAD);
    console.log('   ✅ HTML:', html.length, 'chars\n');

    console.log('📮 Sending email...');
    const info = await transporter.sendMail({
      from: env.SMTP_FROM,
      to: TEST_PAYLOAD.customerEmail,
      subject: `✅ ডেলিভারি সম্পন্ন: ${TEST_PAYLOAD.orderNumber}`,
      html,
    });

    console.log('   ✅ SENT!');
    console.log('   Message ID:', info.messageId);
    console.log('');
    console.log('═══════════════════════════════════════════════════');
    console.log('  🎉 TEST #4 PASSED — Check inbox!');
    console.log('═══════════════════════════════════════════════════\n');
    console.log('📬 Inbox-এ যা দেখবেন:');
    console.log('   Subject: "✅ ডেলিভারি সম্পন্ন: ORD-2026-000126"');
    console.log('   Body: Green success, 5-star review buttons, 2 items');
    console.log('');
    console.log('👉 Result: "next" অথবা error message');
  } catch (err) {
    console.error('❌ TEST FAILED:', err.message);
    process.exit(1);
  }
})();

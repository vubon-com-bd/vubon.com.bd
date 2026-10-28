import { writeFileSync, mkdirSync } from 'node:fs';

const templates = await import('./apps/notification-service/dist/module/infrastructure/external/email/templates/bangla-templates.js');

const OUTPUT_DIR = './email-previews';
mkdirSync(OUTPUT_DIR, { recursive: true });

const previews = [
  { name: '01-welcome', fn: 'renderWelcomeEmail', args: { name: 'রহিম উদ্দিন', email: 'rahim@vubon.bd', locale: 'bn' } },
  { name: '02-welcome-en', fn: 'renderWelcomeEmail', args: { name: 'Rahim Uddin', email: 'rahim@vubon.bd', locale: 'en' } },
  { name: '03-order-confirmed', fn: 'renderOrderConfirmationEmail', args: { name: 'রহিম উদ্দিন', orderId: 'ORD-2026-001234', total: 5750, currency: 'BDT', locale: 'bn' } },
  { name: '04-payment-receipt', fn: 'renderPaymentReceiptEmail', args: { name: 'রহিম উদ্দিন', orderId: 'ORD-2026-001234', amount: 5750, currency: 'BDT', locale: 'bn' } },
  { name: '05-payment-failed', fn: 'renderPaymentFailedEmail', args: { name: 'রহিম উদ্দিন', orderId: 'ORD-2026-001234', amount: 5750, currency: 'BDT', reason: 'অপর্যাপ্ত ব্যালেন্স', locale: 'bn' } },
  { name: '06-refund', fn: 'renderRefundEmail', args: { name: 'রহিম উদ্দিন', orderId: 'ORD-2026-001234', amount: 5750, currency: 'BDT', locale: 'bn' } },
  { name: '07-delivery', fn: 'renderDeliveryEmail', args: { name: 'রহিম উদ্দিন', orderId: 'ORD-2026-001234', trackingNumber: 'TN-2026-5678', locale: 'bn' } },
  { name: '08-suspended', fn: 'renderAccountSuspendedEmail', args: { name: 'রহিম উদ্দিন', reason: 'নীতিমালা লঙ্ঘন', locale: 'bn' } },
  { name: '09-role-assigned', fn: 'renderRoleAssignedEmail', args: { name: 'রহিম উদ্দিন', role: 'Premium Customer', locale: 'bn' } },
  { name: '10-vendor-welcome', fn: 'renderVendorWelcomeEmail', args: { name: 'করিম সাহেব', businessName: 'করিম ট্রেডার্স', locale: 'bn' } },
  { name: '11-vendor-approved', fn: 'renderVendorApprovedEmail', args: { name: 'করিম সাহেব', businessName: 'করিম ট্রেডার্স', locale: 'bn' } },
  { name: '12-cart-abandoned', fn: 'renderAbandonedCartEmail', args: { name: 'রহিম উদ্দিন', cartId: 'CART-001', itemCount: 3, locale: 'bn' } },
  { name: '13-low-stock', fn: 'renderLowStockEmail', args: { name: 'করিম সাহেব', productId: 'PROD-001', available: 5, threshold: 10, locale: 'bn' } },
  { name: '14-out-of-stock', fn: 'renderOutOfStockEmail', args: { name: 'করিম সাহেব', productId: 'PROD-001', locale: 'bn' } },
  { name: '15-review-posted', fn: 'renderReviewPostedEmail', args: { name: 'করিম সাহেব', productId: 'PROD-001', rating: 5, reviewText: 'দুর্দান্ত পণ্য!', locale: 'bn' } },
];

console.log('═══════════════════════════════════════════════════════════');
console.log('  HTML EMAIL PREVIEWS');
console.log('═══════════════════════════════════════════════════════════\n');

let success = 0;
let failed = 0;

for (const preview of previews) {
  try {
    const fn = templates[preview.fn];
    if (typeof fn !== 'function') {
      console.log(`  ⚠️  ${preview.name}: ${preview.fn} not found`);
      failed++;
      continue;
    }

    const html = fn(preview.args);
    const path = `${OUTPUT_DIR}/${preview.name}.html`;
    writeFileSync(path, html);
    console.log(`  ✅ ${preview.name}.html (${html.length} bytes)`);
    success++;
  } catch (err) {
    console.log(`  ❌ ${preview.name}: ${err.message}`);
    failed++;
  }
}

const indexHtml = `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <title>Vubon Email Previews</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; margin: 0; padding: 40px 20px; background: #f1f5f9; }
    .container { max-width: 900px; margin: 0 auto; }
    h1 { color: #0f172a; margin-bottom: 8px; }
    .subtitle { color: #64748b; margin-bottom: 32px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
    .card {
      background: white; border-radius: 12px; padding: 20px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1); text-decoration: none;
      color: #0f172a; transition: transform 0.15s, box-shadow 0.15s;
    }
    .card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    .card-title { font-weight: 600; margin-bottom: 6px; }
    .card-desc { font-size: 13px; color: #64748b; }
    .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; background: #dbeafe; color: #1e40af; }
  </style>
</head>
<body>
  <div class="container">
    <h1>📧 Vubon Email Previews</h1>
    <p class="subtitle">${success}টি ইমেইল টেমপ্লেট — Bengali & English</p>
    <div class="grid">
${previews.map(p => `      <a href="./${p.name}.html" class="card">
        <div class="card-title">${p.name.replace(/^\d+-/, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</div>
        <div class="card-desc">Click to preview <span class="badge">${p.args.locale || 'bn'}</span></div>
      </a>`).join('\n')}
    </div>
  </div>
</body>
</html>`;

writeFileSync(`${OUTPUT_DIR}/index.html`, indexHtml);

console.log('\n═══════════════════════════════════════════════════════════');
console.log(`  ✅ ${success} templates rendered`);
if (failed > 0) console.log(`  ❌ ${failed} failed`);
console.log(`  📁 Output: ${OUTPUT_DIR}/index.html`);
console.log('═══════════════════════════════════════════════════════════');

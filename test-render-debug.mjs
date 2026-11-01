const templates = await import('./apps/notification-service/dist/module/infrastructure/external/email/templates/bangla-templates.js');

console.log('═══ Testing renderOrderCancelRejectedEmail ═══');
const html = templates.renderOrderCancelRejectedEmail({
  name: 'রহিম উদ্দিন',
  orderId: 'ORD-CANCEL-001',
  reason: 'গ্রাহক অনুরোধ',
  locale: 'bn',
});

console.log('Length:', html.length);
console.log('First 200 chars:', html.substring(0, 200));
console.log('');
console.log('═══ Full HTML ═══');
console.log(html);

// Save for inspection
import('node:fs').then(fs => {
  fs.writeFileSync('/data/data/com.termux/files/home/test-cancel-render.html', html);
  console.log('\n✅ Saved to: ~/test-cancel-render.html');
});

import {
  renderWelcomeEmail,
  renderOrderConfirmationEmail,
  renderPaymentReceiptEmail,
  renderPasswordResetEmail,
  renderMfaCodeEmail,
  renderDeliveryEmail,
} from './apps/notification-service/dist/module/infrastructure/external/email/templates/bangla-templates.js';

import { writeFileSync } from 'node:fs';

console.log('═══ Testing All 6 Bangla Email Templates ═══\n');

// 1. Welcome (Bangla)
const welcome = renderWelcomeEmail({
  name: 'রহিম উদ্দিন',
  email: 'rahim@vubon.com.bd',
  locale: 'bn',
});
writeFileSync('email-welcome-bn.html', welcome);
console.log('✅ 1. Welcome (Bangla) → email-welcome-bn.html');
console.log(`   Length: ${welcome.length} chars`);

// 2. Order Confirmation (Bangla)
const order = renderOrderConfirmationEmail({
  name: 'সুফিয়া খাতুন',
  orderId: 'ORD-2026-001',
  total: 5750,
  currency: 'BDT',
  locale: 'bn',
  items: [
    { name: 'স্মার্টফোন', quantity: 1, price: 5000 },
    { name: 'কেস', quantity: 2, price: 375 },
  ],
});
writeFileSync('email-order-bn.html', order);
console.log('✅ 2. Order Confirmation (Bangla) → email-order-bn.html');

// 3. Payment Receipt (Bangla)
const payment = renderPaymentReceiptEmail({
  name: 'করিম আহমেদ',
  orderId: 'ORD-2026-002',
  amount: 2500,
  currency: 'BDT',
  transactionId: 'TXN-BKASH-123456',
  method: 'bKash',
  locale: 'bn',
});
writeFileSync('email-payment-bn.html', payment);
console.log('✅ 3. Payment Receipt (Bangla) → email-payment-bn.html');

// 4. Password Reset (Bangla)
const reset = renderPasswordResetEmail({
  name: 'ফাতেমা',
  resetUrl: 'https://vubon.com.bd/reset?token=abc123',
  expiresIn: '৩০ মিনিট',
  locale: 'bn',
});
writeFileSync('email-reset-bn.html', reset);
console.log('✅ 4. Password Reset (Bangla) → email-reset-bn.html');

// 5. MFA Code (Bangla)
const mfa = renderMfaCodeEmail({
  name: 'রফিক',
  code: '847291',
  locale: 'bn',
});
writeFileSync('email-mfa-bn.html', mfa);
console.log('✅ 5. MFA Code (Bangla) → email-mfa-bn.html');

// 6. Delivery (Bangla)
const delivery = renderDeliveryEmail({
  name: 'নাসরিন',
  orderId: 'ORD-2026-003',
  status: 'shipped',
  trackingNumber: 'TRK-BD-789',
  estimatedAt: '২৮ অক্টোবর, ২০২৬',
  locale: 'bn',
});
writeFileSync('email-delivery-bn.html', delivery);
console.log('✅ 6. Delivery (Bangla) → email-delivery-bn.html');

console.log('\n🎯 All 6 templates rendered!');
console.log('\nFiles created in ~/vubon.com.bd:');
console.log('  - email-welcome-bn.html');
console.log('  - email-order-bn.html');
console.log('  - email-payment-bn.html');
console.log('  - email-reset-bn.html');
console.log('  - email-mfa-bn.html');
console.log('  - email-delivery-bn.html');

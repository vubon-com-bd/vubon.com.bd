import { NOTIFICATION_TEMPLATES_BN } from './packages/shared-constants/dist/platform/notification/i18n/notification-templates-bn.js';
import { NOTIFICATION_LOCALE } from './packages/shared-constants/dist/platform/notification/i18n/index.js';

console.log('═══ Test 1: Locale constants ═══');
console.log('EN:', NOTIFICATION_LOCALE.EN);
console.log('BN:', NOTIFICATION_LOCALE.BN);

console.log('\n═══ Test 2: Bangla templates loaded ═══');
const keys = Object.keys(NOTIFICATION_TEMPLATES_BN);
console.log('Total templates:', keys.length);
console.log('First 5 keys:', keys.slice(0, 5));

console.log('\n═══ Test 3: Welcome template (Bangla) ═══');
const welcome = NOTIFICATION_TEMPLATES_BN.WELCOME;
console.log('Subject:', welcome.subject);
console.log('Body:', welcome.body);

console.log('\n═══ Test 4: Interpolation ═══');
const orderBody = NOTIFICATION_TEMPLATES_BN.ORDER_CREATED.body;
console.log('Raw:', orderBody);
const interpolated = orderBody
  .replace('{{name}}', 'রহিম')
  .replace('{{orderId}}', 'ORD-2026-001')
  .replace('{{total}}', '৫০০০');
console.log('Rendered:', interpolated);

console.log('\n═══ Test 5: bKash template ═══');
const bkash = NOTIFICATION_TEMPLATES_BN.BKASH_PAYMENT_SUCCESS.body;
console.log('bKash:', bkash.replace('{{amount}}', '১০০০').replace('{{txnId}}', 'TXN123'));

console.log('\n═══ Test 6: Nagad template ═══');
const nagad = NOTIFICATION_TEMPLATES_BN.NAGAD_PAYMENT_SUCCESS.body;
console.log('Nagad:', nagad.replace('{{amount}}', '৫০০').replace('{{txnId}}', 'NGD456'));

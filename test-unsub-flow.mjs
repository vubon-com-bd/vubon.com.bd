import { UnsubscribeService } from './apps/notification-service/dist/module/domain/services/unsubscribe.service.js';

const token = UnsubscribeService.encodeToken({
  userId: 'u-html-1',
  channel: 'email',
  category: 'order',
  expiresAt: Date.now() + (30 * 24 * 60 * 60 * 1000),
});

// Test verify
const decoded = UnsubscribeService.decodeToken(token);
console.log('✅ Token created & verified:');
console.log('  User:', decoded.userId);
console.log('  Channel:', decoded.channel);
console.log('  Category:', decoded.category);
console.log('');
console.log('Unsubscribe URL:');
console.log(`http://localhost:4006/unsubscribe?token=${encodeURIComponent(token)}`);

// Generate unsubscribe token directly from service
import { UnsubscribeService } from './apps/notification-service/dist/module/domain/services/unsubscribe.service.js';

const token = UnsubscribeService.encodeToken({
  userId: 'u-html-1',
  channel: 'email',
  category: 'order',
  expiresAt: Date.now() + (30 * 24 * 60 * 60 * 1000), // 30 days
});

console.log('Token generated:', token.substring(0, 60) + '...');
console.log('');
console.log('Unsubscribe URL:');
console.log(`http://localhost:4006/unsubscribe?token=${encodeURIComponent(token)}`);
console.log('');
console.log('Test with curl:');
console.log(`curl -s "http://localhost:4006/unsubscribe?token=${encodeURIComponent(token)}" | head -20`);

/**
 * ID Fixtures — deterministic UUIDs for tests
 * @module notification-service/test/fixtures/domain
 */

export const IDS = {
  // Notification
  notificationId: '11111111-1111-4111-8111-111111111111',
  notificationId2: '11111111-1111-4111-8111-222222222222',
  notificationId3: '11111111-1111-4111-8111-333333333333',

  // Template
  templateId: '22222222-2222-4222-8222-111111111111',
  templateId2: '22222222-2222-4222-8222-222222222222',

  // Schedule
  scheduleId: '33333333-3333-4333-8333-111111111111',

  // Broadcast
  broadcastId: '44444444-4444-4444-8444-111111111111',

  // Digest
  digestId: '55555555-5555-4555-8555-111111111111',

  // Preference
  preferenceId: '66666666-6666-4666-8666-111111111111',

  // Device
  deviceId: '77777777-7777-4777-8777-111111111111',

  // Webhook
  webhookId: '88888888-8888-4888-8888-111111111111',

  // Cross-service
  userId: 'aaaaaaaa-aaaa-4aaa-8aaa-111111111111',
  userId2: 'aaaaaaaa-aaaa-4aaa-8aaa-222222222222',
  orderId: 'bbbbbbbb-bbbb-4bbb-8bbb-111111111111',
  productId: 'cccccccc-cccc-4ccc-8ccc-111111111111',
  vendorId: 'dddddddd-dddd-4ddd-8ddd-111111111111',
  paymentId: 'eeeeeeee-eeee-4eee-8eee-111111111111',

  // Tokens
  deviceToken: 'fcm_token_1:APA91bH_short_test_token_1234567890_abcdefghij_xyz',
  deviceToken2: 'apns_token_2:APA91bH_other_test_token_0987654321_zyxwvutsrq_abc',
  webhookSecret: 'whsec_test_secret_1234567890abcdef',
} as const;

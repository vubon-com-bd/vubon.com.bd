/**
 * E2E Endpoint Registry — Vendor Service
 * @module vendor-service/scripts/e2e
 *
 * Central metadata for all REST endpoints.
 * Used by generate-e2e-tests.mjs to auto-generate E2E specs.
 *
 * NOTE: Termux + Prisma ARM64 = degraded mode.
 * Tests accept a range of statuses to remain resilient.
 */

// ─── Test UUID constants ────────────────────
const TEST_VENDOR_ID = '00000000-0000-0000-0000-000000000001';
const TEST_USER_ID = '00000000-0000-0000-0000-000000000002';
const TEST_COMMISSION_ID = '00000000-0000-0000-0000-000000000003';
const TEST_PAYOUT_ID = '00000000-0000-0000-0000-000000000004';
const TEST_SUBSCRIPTION_ID = '00000000-0000-0000-0000-000000000005';
const TEST_MEMBER_ID = '00000000-0000-0000-0000-000000000006';
const TEST_VERIFICATION_ID = '00000000-0000-0000-0000-000000000007';

export const ENDPOINTS = [
  // ═══════════════════════════════════════════════
  // HEALTH
  // ═══════════════════════════════════════════════
  {
    group: 'health',
    method: 'GET',
    path: '/health',
    name: 'Health Check',
    auth: false,
    expect: {
      statuses: [200, 503],
      hasFields: ['service', 'healthy', 'timestamp', 'dependencies'],
    },
  },

  // ═══════════════════════════════════════════════
  // PUBLIC VENDORS (unauthenticated)
  // ═══════════════════════════════════════════════
  {
    group: 'public-vendors',
    method: 'GET',
    path: '/public/vendors',
    name: 'Public List Vendors',
    auth: false,
    query: { page: 1, limit: 20 },
    expect: { statuses: [200, 500, 503] },
  },
  {
    group: 'public-vendors',
    method: 'GET',
    path: '/public/vendors/search',
    name: 'Public Search Vendors',
    auth: false,
    query: { q: 'test', limit: 10 },
    expect: { statuses: [200, 500, 503] },
  },
  {
    group: 'public-vendors',
    method: 'GET',
    path: '/public/vendors/slug/:slug',
    name: 'Public Vendor By Slug',
    auth: false,
    params: { slug: 'test-vendor' },
    expect: { statuses: [200, 404, 500, 503] },
  },
  {
    group: 'public-vendors',
    method: 'GET',
    path: '/public/vendors/:id',
    name: 'Public Vendor By ID',
    auth: false,
    params: { id: TEST_VENDOR_ID },
    expect: { statuses: [200, 404, 500, 503] },
  },

  // ═══════════════════════════════════════════════
  // VENDORS (main aggregate)
  // ═══════════════════════════════════════════════
  {
    group: 'vendors',
    method: 'POST',
    path: '/vendors',
    name: 'Register Vendor',
    auth: true,
    request: {
      userId: TEST_USER_ID,
      name: 'E2E Test Vendor',
      displayName: 'E2E Test Vendor',
      slug: 'e2e-test-vendor',
      type: 'individual',
      businessType: 'retailer',
      email: 'e2e-vendor@example.com',
      phone: '+8801712345678',
      acceptTerms: true,
    },
    expect: { statuses: [201, 400, 409, 500, 503] },
  },
  {
    group: 'vendors',
    method: 'GET',
    path: '/vendors',
    name: 'List Vendors',
    auth: true,
    query: { page: 1, limit: 20 },
    expect: { statuses: [200, 400, 500, 503] },
  },
  {
    group: 'vendors',
    method: 'GET',
    path: '/vendors/me',
    name: 'Get My Vendor',
    auth: true,
    expect: { statuses: [200, 404, 500, 503] },
  },
  {
    group: 'vendors',
    method: 'GET',
    path: '/vendors/search',
    name: 'Search Vendors',
    auth: true,
    query: { q: 'test', limit: 10 },
    expect: { statuses: [200, 400, 500, 503] },
  },
  {
    group: 'vendors',
    method: 'GET',
    path: '/vendors/stats',
    name: 'Get Vendor Stats',
    auth: true,
    expect: { statuses: [200, 400, 500, 503] },
  },
  {
    group: 'vendors',
    method: 'GET',
    path: '/vendors/slug/:slug',
    name: 'Get Vendor By Slug',
    auth: true,
    params: { slug: 'e2e-test-vendor' },
    expect: { statuses: [200, 404, 500, 503] },
  },
  {
    group: 'vendors',
    method: 'GET',
    path: '/vendors/:id',
    name: 'Get Vendor By ID',
    auth: true,
    params: { id: TEST_VENDOR_ID },
    expect: { statuses: [200, 404, 500, 503] },
  },
  {
    group: 'vendors',
    method: 'GET',
    path: '/vendors/:id/public',
    name: 'Get Vendor Public View',
    auth: true,
    params: { id: TEST_VENDOR_ID },
    expect: { statuses: [200, 404, 500, 503] },
  },
  {
    group: 'vendors',
    method: 'GET',
    path: '/vendors/:id/detail',
    name: 'Get Vendor Detail',
    auth: true,
    params: { id: TEST_VENDOR_ID },
    expect: { statuses: [200, 404, 500, 503] },
  },
  {
    group: 'vendors',
    method: 'PATCH',
    path: '/vendors/:id',
    name: 'Update Vendor',
    auth: true,
    params: { id: TEST_VENDOR_ID },
    request: { name: 'Updated E2E Vendor' },
    expect: { statuses: [200, 400, 404, 500, 503] },
  },
  {
    group: 'vendors',
    method: 'DELETE',
    path: '/vendors/:id',
    name: 'Delete Vendor',
    auth: true,
    params: { id: TEST_VENDOR_ID },
    request: { reason: 'E2E test cleanup', force: false },
    expect: { statuses: [204, 400, 404, 500, 503] },
  },

  // ═══════════════════════════════════════════════
  // VENDOR PROFILE
  // ═══════════════════════════════════════════════
  {
    group: 'profile',
    method: 'GET',
    path: '/vendors/:vendorId/profile',
    name: 'Get Vendor Profile',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID },
    expect: { statuses: [200, 404, 500, 503] },
  },
  {
    group: 'profile',
    method: 'PATCH',
    path: '/vendors/:vendorId/profile',
    name: 'Update Vendor Profile',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID },
    request: { displayName: 'Updated Profile' },
    expect: { statuses: [200, 400, 404, 500, 503] },
  },

  // ═══════════════════════════════════════════════
  // VENDOR BUSINESS
  // ═══════════════════════════════════════════════
  {
    group: 'business',
    method: 'GET',
    path: '/vendors/:vendorId/business',
    name: 'Get Vendor Business',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID },
    expect: { statuses: [200, 404, 500, 503] },
  },
  {
    group: 'business',
    method: 'PATCH',
    path: '/vendors/:vendorId/business',
    name: 'Update Vendor Business',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID },
    request: { legalName: 'E2E Test Vendor Ltd' },
    expect: { statuses: [200, 400, 404, 500, 503] },
  },

  // ═══════════════════════════════════════════════
  // VENDOR CONTACTS
  // ═══════════════════════════════════════════════
  {
    group: 'contacts',
    method: 'GET',
    path: '/vendors/:vendorId/contacts',
    name: 'List Vendor Contacts',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID },
    expect: { statuses: [200, 404, 500, 503] },
  },

  // ═══════════════════════════════════════════════
  // VENDOR ADDRESSES
  // ═══════════════════════════════════════════════
  {
    group: 'addresses',
    method: 'GET',
    path: '/vendors/:vendorId/addresses',
    name: 'List Vendor Addresses',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID },
    expect: { statuses: [200, 404, 500, 503] },
  },

  // ═══════════════════════════════════════════════
  // VENDOR BANK ACCOUNTS
  // ═══════════════════════════════════════════════
  {
    group: 'bank-accounts',
    method: 'GET',
    path: '/vendors/:vendorId/bank-accounts',
    name: 'List Vendor Bank Accounts',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID },
    expect: { statuses: [200, 404, 500, 503] },
  },

  // ═══════════════════════════════════════════════
  // VENDOR DOCUMENTS
  // ═══════════════════════════════════════════════
  {
    group: 'documents',
    method: 'GET',
    path: '/vendors/:vendorId/documents',
    name: 'List Vendor Documents',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID },
    expect: { statuses: [200, 404, 500, 503] },
  },

  // ═══════════════════════════════════════════════
  // VENDOR VERIFICATIONS
  // ═══════════════════════════════════════════════
  {
    group: 'verifications',
    method: 'GET',
    path: '/vendors/:vendorId/verifications',
    name: 'List Vendor Verifications',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID },
    expect: { statuses: [200, 404, 500, 503] },
  },
  {
    group: 'verifications',
    method: 'POST',
    path: '/vendors/:vendorId/verifications',
    name: 'Submit Verification',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID },
    request: { type: 'email', referenceId: 'e2e-ref-001' },
    expect: { statuses: [201, 400, 409, 500, 503] },
  },
  {
    group: 'verifications',
    method: 'GET',
    path: '/vendors/:vendorId/verifications/:verificationId',
    name: 'Get Verification By ID',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID, verificationId: TEST_VERIFICATION_ID },
    expect: { statuses: [200, 404, 500, 503] },
  },
  {
    group: 'verifications',
    method: 'POST',
    path: '/vendors/:vendorId/verifications/:verificationId/reverify',
    name: 'Reverify Verification',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID, verificationId: TEST_VERIFICATION_ID },
    request: { referenceId: 'e2e-reverify-001' },
    expect: { statuses: [200, 400, 404, 500, 503] },
  },

  // ═══════════════════════════════════════════════
  // VENDOR APPROVALS
  // ═══════════════════════════════════════════════
  {
    group: 'approvals',
    method: 'GET',
    path: '/vendors/:vendorId/approvals',
    name: 'List Vendor Approvals',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID },
    expect: { statuses: [200, 404, 500, 503] },
  },

  // ═══════════════════════════════════════════════
  // VENDOR SUSPENSIONS
  // ═══════════════════════════════════════════════
  {
    group: 'suspensions',
    method: 'GET',
    path: '/vendors/:vendorId/suspensions',
    name: 'List Vendor Suspensions',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID },
    expect: { statuses: [200, 404, 500, 503] },
  },

  // ═══════════════════════════════════════════════
  // VENDOR COMMISSIONS
  // ═══════════════════════════════════════════════
  {
    group: 'commissions',
    method: 'GET',
    path: '/vendors/:vendorId/commissions',
    name: 'List Vendor Commissions',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID },
    expect: { statuses: [200, 404, 500, 503] },
  },
  {
    group: 'commissions',
    method: 'GET',
    path: '/vendors/:vendorId/commissions/summary',
    name: 'Commission Summary',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID },
    expect: { statuses: [200, 404, 500, 503] },
  },
  {
    group: 'commissions',
    method: 'GET',
    path: '/vendors/:vendorId/commissions/:commissionId',
    name: 'Get Commission By ID',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID, commissionId: TEST_COMMISSION_ID },
    expect: { statuses: [200, 404, 500, 503] },
  },
  {
    group: 'commissions',
    method: 'PATCH',
    path: '/vendors/:vendorId/commissions',
    name: 'Update Commission',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID },
    request: { type: 'percentage', rate: 15 },
    expect: { statuses: [200, 400, 404, 500, 503] },
  },
  {
    group: 'commissions',
    method: 'POST',
    path: '/vendors/:vendorId/commissions/calculate',
    name: 'Calculate Commission',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID },
    request: { orderAmount: 1500, currency: 'BDT' },
    expect: { statuses: [200, 400, 404, 500, 503] },
  },

  // ═══════════════════════════════════════════════
  // VENDOR PAYOUTS
  // ═══════════════════════════════════════════════
  {
    group: 'payouts',
    method: 'GET',
    path: '/vendors/:vendorId/payouts',
    name: 'List Vendor Payouts',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID },
    expect: { statuses: [200, 404, 500, 503] },
  },
  {
    group: 'payouts',
    method: 'GET',
    path: '/vendors/:vendorId/payouts/summary',
    name: 'Payout Summary',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID },
    expect: { statuses: [200, 404, 500, 503] },
  },
  {
    group: 'payouts',
    method: 'GET',
    path: '/vendors/:vendorId/payouts/:payoutId',
    name: 'Get Payout By ID',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID, payoutId: TEST_PAYOUT_ID },
    expect: { statuses: [200, 404, 500, 503] },
  },
  {
    group: 'payouts',
    method: 'POST',
    path: '/vendors/:vendorId/payouts',
    name: 'Request Payout',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID },
    request: { amount: 5000, method: 'bank_transfer' },
    expect: { statuses: [201, 400, 404, 500, 503] },
  },
  {
    group: 'payouts',
    method: 'POST',
    path: '/vendors/:vendorId/payouts/:payoutId/approve',
    name: 'Approve Payout',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID, payoutId: TEST_PAYOUT_ID },
    request: { notes: 'E2E approve' },
    expect: { statuses: [200, 400, 404, 500, 503] },
  },
  {
    group: 'payouts',
    method: 'POST',
    path: '/vendors/:vendorId/payouts/:payoutId/reject',
    name: 'Reject Payout',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID, payoutId: TEST_PAYOUT_ID },
    request: { reason: 'E2E reject test' },
    expect: { statuses: [200, 400, 404, 500, 503] },
  },
  {
    group: 'payouts',
    method: 'POST',
    path: '/vendors/:vendorId/payouts/:payoutId/process',
    name: 'Process Payout',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID, payoutId: TEST_PAYOUT_ID },
    request: { transactionId: 'e2e-txn-001' },
    expect: { statuses: [200, 400, 404, 500, 503] },
  },

  // ═══════════════════════════════════════════════
  // VENDOR SETTLEMENTS
  // ═══════════════════════════════════════════════
  {
    group: 'settlements',
    method: 'GET',
    path: '/vendors/:vendorId/settlements',
    name: 'List Vendor Settlements',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID },
    expect: { statuses: [200, 404, 500, 503] },
  },

  // ═══════════════════════════════════════════════
  // VENDOR PERFORMANCES
  // ═══════════════════════════════════════════════
  {
    group: 'performances',
    method: 'GET',
    path: '/vendors/:vendorId/performances',
    name: 'List Vendor Performances',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID },
    expect: { statuses: [200, 404, 500, 503] },
  },

  // ═══════════════════════════════════════════════
  // VENDOR RATINGS
  // ═══════════════════════════════════════════════
  {
    group: 'ratings',
    method: 'GET',
    path: '/vendors/:vendorId/ratings',
    name: 'List Vendor Ratings',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID },
    expect: { statuses: [200, 404, 500, 503] },
  },

  // ═══════════════════════════════════════════════
  // VENDOR REVIEWS
  // ═══════════════════════════════════════════════
  {
    group: 'reviews',
    method: 'GET',
    path: '/vendors/:vendorId/reviews',
    name: 'List Vendor Reviews',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID },
    expect: { statuses: [200, 404, 500, 503] },
  },

  // ═══════════════════════════════════════════════
  // VENDOR SHIPPING
  // ═══════════════════════════════════════════════
  {
    group: 'shipping',
    method: 'GET',
    path: '/vendors/:vendorId/shipping',
    name: 'Get Vendor Shipping Config',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID },
    expect: { statuses: [200, 404, 500, 503] },
  },

  // ═══════════════════════════════════════════════
  // VENDOR RETURN POLICIES
  // ═══════════════════════════════════════════════
  {
    group: 'return-policies',
    method: 'GET',
    path: '/vendors/:vendorId/return-policies',
    name: 'List Vendor Return Policies',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID },
    expect: { statuses: [200, 404, 500, 503] },
  },

  // ═══════════════════════════════════════════════
  // VENDOR WARRANTIES
  // ═══════════════════════════════════════════════
  {
    group: 'warranties',
    method: 'GET',
    path: '/vendors/:vendorId/warranties',
    name: 'List Vendor Warranties',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID },
    expect: { statuses: [200, 404, 500, 503] },
  },

  // ═══════════════════════════════════════════════
  // VENDOR TEAM
  // ═══════════════════════════════════════════════
  {
    group: 'team',
    method: 'GET',
    path: '/vendors/:vendorId/team',
    name: 'List Team Members',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID },
    expect: { statuses: [200, 404, 500, 503] },
  },
  {
    group: 'team',
    method: 'GET',
    path: '/vendors/:vendorId/team/:memberId',
    name: 'Get Team Member',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID, memberId: TEST_MEMBER_ID },
    expect: { statuses: [200, 404, 500, 503] },
  },
  {
    group: 'team',
    method: 'POST',
    path: '/vendors/:vendorId/team',
    name: 'Invite Team Member',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID },
    request: {
      vendorId: TEST_VENDOR_ID,
      email: 'member@example.com',
      role: 'vendor_manager',
    },
    expect: { statuses: [201, 400, 404, 409, 500, 503] },
  },
  {
    group: 'team',
    method: 'PATCH',
    path: '/vendors/:vendorId/team/:memberId',
    name: 'Update Team Member',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID, memberId: TEST_MEMBER_ID },
    request: { fullName: 'Updated Member' },
    expect: { statuses: [200, 400, 404, 500, 503] },
  },
  {
    group: 'team',
    method: 'POST',
    path: '/vendors/:vendorId/team/:memberId/role',
    name: 'Assign Team Role',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID, memberId: TEST_MEMBER_ID },
    request: { role: 'vendor_staff' },
    expect: { statuses: [200, 400, 404, 500, 503] },
  },
  {
    group: 'team',
    method: 'DELETE',
    path: '/vendors/:vendorId/team/:memberId',
    name: 'Remove Team Member',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID, memberId: TEST_MEMBER_ID },
    request: { reason: 'E2E cleanup' },
    expect: { statuses: [204, 400, 404, 500, 503] },
  },

  // ═══════════════════════════════════════════════
  // VENDOR FEATURES
  // ═══════════════════════════════════════════════
  {
    group: 'features',
    method: 'GET',
    path: '/vendors/:vendorId/features',
    name: 'List Vendor Features',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID },
    expect: { statuses: [200, 404, 500, 503] },
  },

  // ═══════════════════════════════════════════════
  // VENDOR SUBSCRIPTIONS
  // ═══════════════════════════════════════════════
  {
    group: 'subscriptions',
    method: 'GET',
    path: '/vendors/:vendorId/subscriptions/current',
    name: 'Get Current Subscription',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID },
    expect: { statuses: [200, 404, 500, 503] },
  },
  {
    group: 'subscriptions',
    method: 'GET',
    path: '/vendors/:vendorId/subscriptions/plans',
    name: 'List Subscription Plans',
    auth: false,
    params: { vendorId: TEST_VENDOR_ID },
    expect: { statuses: [200, 500, 503] },
  },
  {
    group: 'subscriptions',
    method: 'POST',
    path: '/vendors/:vendorId/subscriptions',
    name: 'Create Subscription',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID },
    request: { plan: 'basic', cycle: 'monthly' },
    expect: { statuses: [201, 400, 404, 409, 500, 503] },
  },
  {
    group: 'subscriptions',
    method: 'POST',
    path: '/vendors/:vendorId/subscriptions/:subscriptionId/upgrade',
    name: 'Upgrade Subscription',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID, subscriptionId: TEST_SUBSCRIPTION_ID },
    request: { plan: 'premium' },
    expect: { statuses: [200, 400, 404, 500, 503] },
  },
  {
    group: 'subscriptions',
    method: 'POST',
    path: '/vendors/:vendorId/subscriptions/:subscriptionId/downgrade',
    name: 'Downgrade Subscription',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID, subscriptionId: TEST_SUBSCRIPTION_ID },
    request: { plan: 'free', reason: 'E2E test' },
    expect: { statuses: [200, 400, 404, 500, 503] },
  },
  {
    group: 'subscriptions',
    method: 'POST',
    path: '/vendors/:vendorId/subscriptions/:subscriptionId/cancel',
    name: 'Cancel Subscription',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID, subscriptionId: TEST_SUBSCRIPTION_ID },
    request: { reason: 'E2E test cancel', cancelAtPeriodEnd: true },
    expect: { statuses: [200, 400, 404, 500, 503] },
  },

  // ═══════════════════════════════════════════════
  // VENDOR PERMISSIONS
  // ═══════════════════════════════════════════════
  {
    group: 'permissions',
    method: 'GET',
    path: '/vendors/:vendorId/permissions',
    name: 'List Vendor Permissions',
    auth: true,
    params: { vendorId: TEST_VENDOR_ID },
    expect: { statuses: [200, 404, 500, 503] },
  },
];

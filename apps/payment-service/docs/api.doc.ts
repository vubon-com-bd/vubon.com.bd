/**
 * PAYMENT SERVICE — API DOCUMENTATION
 * @module payment-service/docs
 *
 * ══════════════════════════════════════════════════════════════════
 *  🌐 REST API — Base URL
 * ══════════════════════════════════════════════════════════════════
 *
 *  Development:   http://localhost:4005/api/v1
 *  Production:    https://payments.vubon.com.bd/api/v1
 *  Swagger UI:    /api/v1/docs
 *  OpenAPI JSON:  /api/v1/docs-json
 *
 *  Auth:          Bearer JWT in Authorization header
 *  Content-Type:  application/json
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  💳 PAYMENT ENDPOINTS
 * ══════════════════════════════════════════════════════════════════
 *
 *  POST   /payments                            — Initiate payment
 *  GET    /payments                            — List (paginated)
 *  GET    /payments/stats                      — Payment statistics
 *  GET    /payments/order/:orderId             — List by order
 *  GET    /payments/user/:userId               — List by user
 *  GET    /payments/:paymentId                 — Get payment
 *  GET    /payments/:paymentId/detail          — Detail + transactions
 *  GET    /payments/:paymentId/public          — Public view
 *  POST   /payments/:paymentId/verify          — Verify gateway callback
 *  POST   /payments/:paymentId/capture         — Capture authorized amount
 *  POST   /payments/:paymentId/fail            — Mark failed
 *  POST   /payments/:paymentId/cancel          — Cancel
 *  POST   /payments/:paymentId/retry           — Retry failed payment
 *  POST   /payments/:paymentId/chargeback      — Mark chargeback
 *  POST   /payments/:paymentId/mark-paid       — Mark paid (admin)
 *
 *  Initiate body:
 *    {
 *      "orderId": "uuid",
 *      "method": "mobile_banking",
 *      "gateway": "bkash (optional)",
 *      "amount": 1500.00,
 *      "currency": "BDT",
 *      "returnUrl": "https://shop.vubon.com.bd/payment/return",
 *      "idempotencyKey": "idem_abc12345 (optional)",
 *      "metadata": { "source": "web" }
 *    }
 *
 *  Response (201):
 *    {
 *      "success": true,
 *      "paymentId": "uuid",
 *      "status": "pending",
 *      "redirectUrl": "https://bkash.vubon.com.bd/checkout/...",
 *      "gatewayPaymentId": "bkash_..."
 *    }
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🔄 REFUND ENDPOINTS
 * ══════════════════════════════════════════════════════════════════
 *
 *  POST   /refunds                              — Request refund
 *  GET    /refunds                              — List (paginated)
 *  GET    /refunds/payment/:paymentId           — List by payment
 *  GET    /refunds/:refundId                    — Get refund
 *  GET    /refunds/:refundId/public             — Public view
 *  POST   /refunds/:refundId/approve            — Approve
 *  POST   /refunds/:refundId/process            — Start processing
 *  POST   /refunds/:refundId/complete           — Complete (mark succeeded)
 *  POST   /refunds/:refundId/fail               — Mark failed
 *  POST   /refunds/:refundId/cancel             — Cancel
 *
 *  Request body:
 *    {
 *      "paymentId": "uuid",
 *      "amount": 500.00,
 *      "reason": "damaged product",
 *      "idempotencyKey": "idem_refund_001"
 *    }
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  📋 TRANSACTION ENDPOINTS
 * ══════════════════════════════════════════════════════════════════
 *
 *  GET    /transactions                         — List (paginated)
 *  GET    /transactions/payment/:paymentId      — List by payment
 *  GET    /transactions/order/:orderId          — List by order
 *  GET    /transactions/:transactionId          — Get transaction
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🔔 WEBHOOK ENDPOINTS
 * ══════════════════════════════════════════════════════════════════
 *
 *  POST   /webhooks/:gateway                    — Receive webhook (PUBLIC)
 *  GET    /webhooks                             — List events (paginated)
 *  GET    /webhooks/:webhookId                  — Get event
 *
 *  Supported gateways: bkash | nagad | rocket | sslcommerz | stripe | paypal
 *
 *  Signature verification:
 *    • HMAC-SHA256     — stripe, sslcommerz (header: x-webhook-signature)
 *    • Token compare   — bkash, nagad, rocket, upay, paypal
 *    • Manual          — no signature required
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  ❤️  HEALTH ENDPOINTS (PUBLIC)
 * ══════════════════════════════════════════════════════════════════
 *
 *  GET    /health                               — Full health (prisma + redis)
 *  GET    /health/live                          — Liveness probe
 *  GET    /health/ready                         — Readiness probe
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  📊 HTTP STATUS CODES
 * ══════════════════════════════════════════════════════════════════
 *
 *  200  OK               — successful read / state transition
 *  201  Created          — payment / refund created
 *  400  Bad Request      — invalid input, invalid transition
 *  401  Unauthorized     — missing / invalid token
 *  402  Payment Required — gateway rejected
 *  403  Forbidden        — not owner
 *  404  Not Found        — payment / refund / transaction missing
 *  409  Conflict         — idempotency conflict, duplicate webhook
 *  422  Unprocessable    — domain validation failure
 *  500  Internal Error   — unexpected
 *  503  Unavailable      — gateway down
 */

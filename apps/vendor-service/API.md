<!-- AUTO-GENERATED from docs/api.doc.ts. Do not edit directly. -->

API Reference

Base URL: `http://localhost:4006/api/v1`
Swagger UI: `http://localhost:4006/api/v1/docs`
Auth: `Authorization: Bearer <JWT>` (except endpoints marked `@Public`)

## Conventions

- **IDs** are UUID v4.
- **Money** fields include a `currency` (ISO 4217).
- **Pagination** — `page` (1-based), `limit` (default 20, max 100).
- **Errors** — `{ statusCode, code, message, context?, timestamp }`.
- **Idempotency** — send `X-Idempotency-Key` on mutation endpoints that require it.

---

## Vendors

### POST /vendors
Register a new vendor.

**Body (required):** `ownerId, businessName, displayName, vendorType, businessType, contactEmail, contactPhone, addressLine1, division, district, acceptTerms=true`
**Optional:** `slug, businessRegistration, businessDescription, addressLine2, upazila, postalCode, documents[], idempotencyKey`
**Response:** `VendorResponseDto`

### GET /vendors
List vendors (paginated).

**Query:** `page, limit, status, type, tier, isVerified, isFeatured, minRating, search, sortBy, sortDir`
**Response:** `VendorListResponseDto`

### GET /vendors/slug/check
Check slug availability.
**Query:** `slug`
**Response:** `{ slug, available, suggestion? }`

### GET /vendors/slug/suggest
Suggest a slug from a name.
**Query:** `name`
**Response:** `{ slug, available, suggestion? }`

### GET /vendors/:vendorId
Get a vendor by ID.
**Response:** `VendorResponseDto`

### GET /vendors/:vendorId/summary
Get vendor summary.
**Response:** `VendorSummaryDto`

### GET /vendors/:vendorId/stats
Get vendor statistics.
**Response:** `VendorStatsResponseDto`

### PATCH /vendors/:vendorId
Update vendor profile fields. **Owner only.**
**Body:** `name?, displayName?, description?, logoUrl?, bannerUrl?, website?`

### PATCH /vendors/:vendorId/profile
Update vendor public profile. **Owner only.**
**Body:** `tagline?, about?, logoUrl?, bannerUrl?, categories?, languages?, socialLinks?`

### PATCH /vendors/:vendorId/business
Update legal/business info. **Owner only.**
**Body:** `type?, businessType?, legalName?, registrationNumber?, description?`

### POST /vendors/:vendorId/activate
Activate vendor. **Owner only.**

### POST /vendors/:vendorId/deactivate
Deactivate vendor. **Owner only.**
**Body:** `reason?`

### POST /vendors/:vendorId/suspend
Suspend a vendor. **Admin only.**
**Body:** `reason, durationDays, suspendedBy, notes?`

### POST /vendors/:vendorId/reinstate
Lift suspension. **Admin only.**

### POST /vendors/:vendorId/approve
Approve a vendor. **Admin only.**
**Body:** `reviewedBy, note?`

### POST /vendors/:vendorId/reject
Reject a vendor. **Admin only.**
**Body:** `reviewedBy, reason, note?`

### DELETE /vendors/:vendorId
Soft-delete vendor. **Owner only.**
**Query:** `reason?`

---

## Public Vendors

### GET /public/vendors/top-rated
Top-rated vendors. **Public.**
**Query:** `limit` (default 10)

### GET /public/vendors/featured
Featured vendors. **Public.**
**Query:** `limit` (default 10)

### GET /public/vendors/search
Search public vendors. **Public.**
**Query:** `q?, limit` (default 20)

### GET /public/vendors/slug/:slug
Get public vendor by slug. **Public.**

### GET /public/vendors/:vendorId
Get public vendor by ID. **Public.**

---

## Documents

### POST /vendors/:vendorId/documents
Upload a document. **Owner only.**
**Body:** `type, fileUrl, fileName, mimeType, fileSize, documentNumber?, issuedAt?, expiresAt?, notes?`
**Response:** `VendorDocumentResponseDto`

### GET /vendors/:vendorId/documents
List documents. **Owner only.**

### GET /vendors/:vendorId/documents/public
List public documents. **Public.**

### GET /vendors/:vendorId/documents/:documentId
Get a document by ID. **Owner only.**

### POST /vendors/:vendorId/documents/:documentId/verify
Verify a document. **Admin only.**

### POST /vendors/:vendorId/documents/:documentId/reject
Reject a document. **Admin only.**
**Body:** `reason`

---

## Verification

### POST /vendors/:vendorId/verification/submit
Submit verification. **Owner only.**
**Body:** `documents[], idempotencyKey?`

### GET /vendors/:vendorId/verification
Get verification status. **Owner only.**

### POST /vendors/:vendorId/verification/approve
Approve verification. **Admin only.**

### POST /vendors/:vendorId/verification/reject
Reject verification. **Admin only.**
**Body:** `reason`

---

## Approval

### GET /vendors/:vendorId/approval
Get approval status.

### POST /vendors/:vendorId/approval/approve
Approve vendor. **Admin only.**
**Body:** `note?`

### POST /vendors/:vendorId/approval/reject
Reject vendor. **Admin only.**
**Body:** `reason, note?`

### POST /vendors/:vendorId/approval/request-info
Request more information. **Admin only.**
**Body:** `note`

### POST /vendors/:vendorId/approval/resubmit
Resubmit approval. **Owner only.**

---

## Suspensions

### POST /vendors/:vendorId/suspensions
Suspend a vendor. **Admin only.**
**Body:** `reason, durationDays, suspendedBy, notes?`

### POST /vendors/:vendorId/suspensions/:suspensionId/lift
Lift suspension. **Admin only.**

### POST /vendors/:vendorId/suspensions/:suspensionId/appeal
File an appeal. **Owner only.**
**Body:** `suspensionId, appealReason, evidenceUrls?`

### GET /vendors/:vendorId/suspensions
List suspensions. **Owner only.**

### GET /vendors/:vendorId/suspensions/active
Get active suspension. **Owner only.**

### GET /vendors/:vendorId/suspensions/:suspensionId
Get suspension by ID. **Owner only.**

---

---

## Team

### POST /vendors/:vendorId/team/invite
Invite a team member. **Owner only.**
**Body:** `email, role, message?`

### POST /vendors/:vendorId/team/accept-invite
Accept an invite. **Public.**
**Body:** `token, name`

### GET /vendors/:vendorId/team
List team members. **Owner only.**

### GET /vendors/:vendorId/team/:memberId
Get a team member. **Owner only.**

### PATCH /vendors/:vendorId/team/:memberId/role
Change team member role. **Owner only.**
**Body:** `newRole`

### POST /vendors/:vendorId/team/:memberId/suspend
Suspend a team member. **Owner only.**

### DELETE /vendors/:vendorId/team/:memberId
Remove a team member. **Owner only.**

---

## Payouts

### POST /vendors/:vendorId/payouts/request
Request a payout. **Owner only.**
**Body:** `amount, currency, method?, bankAccountId?, notes?`
**Header:** `X-Idempotency-Key` (required)

### POST /vendors/:vendorId/payouts/:payoutId/approve
Approve payout. **Admin only.**

### POST /vendors/:vendorId/payouts/:payoutId/reject
Reject payout. **Admin only.**
**Body:** `reason`

### POST /vendors/:vendorId/payouts/:payoutId/process
Move payout to processing. **Admin only.**

### POST /vendors/:vendorId/payouts/:payoutId/mark-paid
Mark payout as paid. **Admin only.**
**Body:** `transactionId, reference?`

### POST /vendors/:vendorId/payouts/:payoutId/fail
Mark payout as failed. **Admin only.**
**Body:** `reason`

### POST /vendors/:vendorId/payouts/:payoutId/cancel
Cancel a pending payout. **Owner only.**

### GET /vendors/:vendorId/payouts
List payouts. **Owner only.**

### GET /vendors/:vendorId/payouts/summary
Get payout summary. **Owner only.**

### GET /vendors/:vendorId/payouts/:payoutId
Get payout by ID. **Owner only.**

---

## Settlements

### POST /vendors/:vendorId/settlements
Create a settlement. **Admin only.**
**Body:** `periodStart, periodEnd, grossAmount, commissionAmount, netAmount, currency, orderCount, orderIds?`

### POST /vendors/:vendorId/settlements/:settlementId/complete
Complete a settlement. **Admin only.**
**Body:** `payoutId`

### GET /vendors/:vendorId/settlements
List settlements. **Owner only.**

### GET /vendors/:vendorId/settlements/:settlementId
Get settlement by ID. **Owner only.**

---

## Invoices

### POST /vendors/:vendorId/invoices
Create an invoice. **Admin only.**
**Body:** `type, amount, taxAmount?, totalAmount, currency, issueDate, dueDate, periodStart?, periodEnd?, orderIds?, notes?`

### POST /vendors/:vendorId/invoices/:invoiceId/send
Send invoice. **Admin only.**
**Body:** `recipientEmail?`

### POST /vendors/:vendorId/invoices/:invoiceId/mark-paid
Mark invoice paid. **Owner only.**
**Body:** `note?`

### GET /vendors/:vendorId/invoices
List invoices. **Owner only.**

### GET /vendors/:vendorId/invoices/:invoiceId
Get invoice by ID. **Owner only.**

---

## Subscription

### POST /vendors/:vendorId/subscription
Create a subscription. **Owner only.**
**Body:** `plan, cycle, price, currency, trialDays?, features?`

### POST /vendors/:vendorId/subscription/change-plan
Change plan. **Owner only.**
**Body:** `newPlan, newCycle?, newPrice, immediate`

### POST /vendors/:vendorId/subscription/cancel
Cancel subscription. **Owner only.**
**Body:** `immediate, reason?`

### POST /vendors/:vendorId/subscription/renew
Renew subscription. **Owner only.**

### GET /vendors/:vendorId/subscription
Get subscription. **Owner only.**

### GET /vendors/:vendorId/subscription/public
Get public subscription. **Public.**

---

## Commission

### POST /vendors/:vendorId/commission
Configure commission. **Admin only.**
**Body:** `type, percent, fixedAmount?, currency, applyOnShipping, applyOnTax, effectiveFrom?, effectiveTo?`

### POST /vendors/:vendorId/commission/calculate
Preview commission on an order.
**Body:** `orderAmount, currency, shippingAmount?, taxAmount?`

### GET /vendors/:vendorId/commission/active
Get active commission config.

---

## Rating

### GET /vendors/:vendorId/rating
Get vendor rating. **Public.**

### POST /vendors/:vendorId/rating/recalculate
Recalculate rating. **Admin only.**

---

## Reviews

### POST /vendors/:vendorId/reviews
Submit a review. **Auth.**
**Body:** `orderId, rating, comment?, isVerifiedPurchase?`

### GET /vendors/:vendorId/reviews
List all reviews. **Admin only.**

### GET /vendors/:vendorId/reviews/public
List public reviews. **Public.**

### GET /vendors/:vendorId/reviews/:reviewId
Get a review. **Public.**

### POST /vendors/:vendorId/reviews/:reviewId/approve
Approve a review. **Admin only.**

### POST /vendors/:vendorId/reviews/:reviewId/reject
Reject a review. **Admin only.**
**Body:** `reason`

### POST /vendors/:vendorId/reviews/:reviewId/flag
Flag a review. **Auth.**
**Body:** `reason`

---

## Performance

### GET /vendors/:vendorId/performance
Get latest performance. **Owner only.**

### GET /vendors/:vendorId/performance/history
List performance history. **Owner only.**

### POST /vendors/:vendorId/performance/evaluate
Trigger evaluation. **Admin only.**
**Body:** `evaluationPeriodStart, evaluationPeriodEnd, orderCount`

### POST /vendors/:vendorId/performance/warning/issue
Issue a warning. **Admin only.**

### POST /vendors/:vendorId/performance/warning/clear
Clear a warning. **Admin only.**

### POST /vendors/:vendorId/performance/recalculate
Recalculate performance. **Admin only.**

---

## Shipping

### POST /vendors/:vendorId/shipping/initialize
Initialize shipping config. **Owner only.**
**Body:** `defaultMethod`

### POST /vendors/:vendorId/shipping/rates
Add shipping rate. **Owner only.**
**Body:** `method, zone, cost, currency, minDeliveryDays, maxDeliveryDays`

### DELETE /vendors/:vendorId/shipping/rates/:method/:zone
Remove rate. **Owner only.**

### POST /vendors/:vendorId/shipping/free-threshold
Set free-shipping threshold. **Owner only.**
**Body:** `amount?`

### GET /vendors/:vendorId/shipping
Get shipping config. **Public.**

### GET /vendors/:vendorId/shipping/calculate
Calculate shipping. **Public.**
**Query:** `zone, total, method?`

---

## Warranty

### POST /vendors/:vendorId/warranty/initialize
Initialize warranty config. **Owner only.**

### POST /vendors/:vendorId/warranty/type
Update warranty type. **Owner only.**
**Body:** `warrantyType`

### POST /vendors/:vendorId/warranty/period
Update warranty period. **Owner only.**
**Body:** `days`

### POST /vendors/:vendorId/warranty/exclusions
Add exclusion. **Owner only.**
**Body:** `term`

### POST /vendors/:vendorId/warranty/exclusions/remove
Remove exclusion. **Owner only.**
**Body:** `term`

### GET /vendors/:vendorId/warranty
Get warranty config. **Public.**

---

## Return Policy

### POST /vendors/:vendorId/return-policy/initialize
Initialize return policy. **Owner only.**

### POST /vendors/:vendorId/return-policy/type
Update return type. **Owner only.**
**Body:** `returnType`

### POST /vendors/:vendorId/return-policy/window
Update return window. **Owner only.**
**Body:** `days`

### POST /vendors/:vendorId/return-policy/exclusions
Add exclusion. **Owner only.**
**Body:** `term`

### GET /vendors/:vendorId/return-policy
Get return policy. **Public.**

### GET /vendors/:vendorId/return-policy/eligibility
Check return eligibility. **Public.**
**Query:** `deliveredAt`

---

## Settings

### POST /vendors/:vendorId/settings/initialize
Initialize settings. **Owner only.**
**Body:** `currency`

### POST /vendors/:vendorId/settings/vacation
Toggle vacation mode. **Owner only.**
**Body:** `enabled, message?`

### PATCH /vendors/:vendorId/settings/auto-accept
Toggle auto-accept orders. **Owner only.**
**Body:** `enabled`

### PATCH /vendors/:vendorId/settings/auto-payout
Toggle auto-payout. **Owner only.**
**Body:** `enabled`

### PATCH /vendors/:vendorId/settings/notifications
Update notification preferences. **Owner only.**

### PATCH /vendors/:vendorId/settings/locale
Update timezone & locale. **Owner only.**
**Body:** `timezone, locale`

### GET /vendors/:vendorId/settings
Get settings. **Owner only.**

---

## Stats

### GET /vendors/:vendorId/stats
Get latest stats. **Owner only.**

### POST /vendors/:vendorId/stats/period
Initialize stats period. **Admin only.**
**Body:** `periodStart, periodEnd, currency`

### POST /vendors/:vendorId/stats/record-order
Record an order in stats. **Admin.**
**Body:** `amount`

---

## Reports

### POST /vendors/:vendorId/reports/request
Request a report. **Owner only.**
**Body:** `type, format, period, periodStart, periodEnd`

### POST /vendors/:vendorId/reports/:reportId/ready
Mark report ready. **Admin only.**
**Body:** `fileUrl, fileSize`

### POST /vendors/:vendorId/reports/:reportId/fail
Mark report failed. **Admin only.**
**Body:** `reason`

### GET /vendors/:vendorId/reports
List reports. **Owner only.**

### GET /vendors/:vendorId/reports/:reportId
Get report by ID. **Owner only.**

---

## Health

### GET /health/live — Liveness probe. **Public.**
### GET /health/ready — Readiness probe. **Public.**
### GET /health — Full check (db + redis). **Public.**

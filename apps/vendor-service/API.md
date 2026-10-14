# API Reference — Vendor Service

Base URL: http://localhost:3004
Swagger: http://localhost:3004/api/docs

## Authentication
JWT Bearer token: Authorization: Bearer <token>

Public: /health, /public/vendors/*, /vendors/search, /vendors/slug/:slug

## Endpoints
POST /vendors           Register vendor
GET /vendors            List vendors (paginated)
GET /vendors/:id        Get vendor by ID
GET /vendors/:id/public Public view
GET /vendors/:id/detail Detail with children
GET /vendors/me         My vendor
GET /vendors/slug/:slug Get by slug
GET /vendors/search     Search vendors
GET /vendors/stats      Aggregate stats
PATCH /vendors/:id      Update vendor
DELETE /vendors/:id     Soft delete

POST /vendors/:vendorId/commissions/calculate
PATCH /vendors/:vendorId/commissions
GET /vendors/:vendorId/commissions

POST /vendors/:vendorId/payouts
POST /vendors/:vendorId/payouts/:id/approve
POST /vendors/:vendorId/payouts/:id/reject
POST /vendors/:vendorId/payouts/:id/process
GET /vendors/:vendorId/payouts
GET /vendors/:vendorId/payouts/summary

POST /vendors/:vendorId/team
PATCH /vendors/:vendorId/team/:memberId
DELETE /vendors/:vendorId/team/:memberId
GET /vendors/:vendorId/team

POST /vendors/:vendorId/subscriptions
POST /vendors/:vendorId/subscriptions/:id/upgrade
POST /vendors/:vendorId/subscriptions/:id/cancel
GET /vendors/:vendorId/subscriptions/current
GET /vendors/:vendorId/subscriptions/plans

## Error Format
statusCode, code, message, field, details, timestamp, path

## Status Codes
200, 201, 204, 400, 401, 403, 404, 409, 422, 429, 500, 503

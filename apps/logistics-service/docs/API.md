# API Documentation — Logistics Service

Base URL: http://localhost:3007
Auth: Bearer JWT in `Authorization` header

## Health
GET /health -> 200

## Shipments (19 routes)
POST   /shipments
PATCH  /shipments/:id
POST   /shipments/:id/cancel
POST   /shipments/:id/confirm
POST   /shipments/:id/start-processing
POST   /shipments/:id/pack
POST   /shipments/:id/pick-up
POST   /shipments/:id/start-transit
POST   /shipments/:id/out-for-delivery
POST   /shipments/:id/deliver
POST   /shipments/:id/fail
POST   /shipments/:id/return
POST   /shipments/:id/put-on-hold
POST   /shipments/:id/mark-delayed
POST   /shipments/:id/resume-from-hold
GET    /shipments
GET    /shipments/:id
GET    /shipments/stats/summary
GET    /shipments/:id/timeline

## Couriers (12 routes)
POST   /couriers
PATCH  /couriers/:id
POST   /couriers/:id/activate
POST   /couriers/:id/deactivate
POST   /couriers/:id/suspend
POST   /couriers/:id/terminate
GET    /couriers
GET    /couriers/:id
GET    /couriers/code/:code
GET    /couriers/default
GET    /couriers/stats
GET    /couriers/public/:id

## Deliveries (13 routes)
POST   /deliveries
POST   /deliveries/:id/schedule
POST   /deliveries/:id/assign
POST   /deliveries/:id/arrive
POST   /deliveries/:id/complete
POST   /deliveries/:id/fail
POST   /deliveries/:id/refuse
POST   /deliveries/:id/reschedule
POST   /deliveries/:id/cancel
GET    /deliveries
GET    /deliveries/:id
GET    /deliveries/stats

## Trackings (11 routes)
POST   /trackings
POST   /trackings/:id/activate
POST   /trackings/:id/complete
POST   /trackings/:id/fail
POST   /trackings/:id/expire
POST   /trackings/:id/events
GET    /trackings
GET    /trackings/:id
GET    /trackings/number/:trackingNumber
GET    /trackings/stats

## Warehouses (13 routes)
POST   /warehouses
PATCH  /warehouses/:id
PATCH  /warehouses/:id/capacity
POST   /warehouses/:id/activate
POST   /warehouses/:id/deactivate
POST   /warehouses/:id/close
POST   /warehouses/:id/archive
POST   /warehouses/:id/maintenance/start
POST   /warehouses/:id/maintenance/end
GET    /warehouses
GET    /warehouses/:id
GET    /warehouses/code/:code
GET    /warehouses/stats

## Fulfillments (15 routes)
POST   /fulfillments
POST   /fulfillments/:id/start
POST   /fulfillments/:id/begin-picking
POST   /fulfillments/:id/begin-packing
POST   /fulfillments/:id/mark-ready-to-ship
POST   /fulfillments/:id/ship
POST   /fulfillments/:id/fulfill
POST   /fulfillments/:id/partially-fulfill
POST   /fulfillments/:id/cancel
POST   /fulfillments/:id/fail
POST   /fulfillments/:id/put-on-hold
POST   /fulfillments/:id/resume-from-hold
GET    /fulfillments
GET    /fulfillments/:id
GET    /fulfillments/stats

## Dispatches (11 routes)
POST   /dispatches
POST   /dispatches/:id/assign
POST   /dispatches/:id/dispatch
POST   /dispatches/:id/start-transit
POST   /dispatches/:id/mark-delivered
POST   /dispatches/:id/mark-failed
POST   /dispatches/:id/mark-returned
POST   /dispatches/:id/cancel
GET    /dispatches
GET    /dispatches/:id
GET    /dispatches/stats

## Vehicles (10 routes)
POST   /vehicles
PATCH  /vehicles/:id
POST   /vehicles/:id/assign
POST   /vehicles/:id/assign-driver
POST   /vehicles/:id/unassign-driver
POST   /vehicles/:id/release
POST   /vehicles/:id/maintenance/start
POST   /vehicles/:id/maintenance/complete
POST   /vehicles/:id/retire
GET    /vehicles
GET    /vehicles/:id
GET    /vehicles/stats

## Drivers (14 routes)
POST   /drivers
PATCH  /drivers/:id
POST   /drivers/:id/assign-vehicle
POST   /drivers/:id/unassign-vehicle
POST   /drivers/:id/go-on-duty
POST   /drivers/:id/go-off-duty
POST   /drivers/:id/go-on-break
POST   /drivers/:id/go-on-leave
POST   /drivers/:id/mark-available
POST   /drivers/:id/suspend
POST   /drivers/:id/deactivate
POST   /drivers/:id/collect-cash
POST   /drivers/:id/deposit-cash
GET    /drivers
GET    /drivers/:id
GET    /drivers/stats

## Routes (12 routes)
POST   /routes
PATCH  /routes/:id
POST   /routes/:id/plan
POST   /routes/:id/optimize
POST   /routes/:id/start
POST   /routes/:id/complete-stop
POST   /routes/:id/complete
POST   /routes/:id/cancel
POST   /routes/:id/archive
GET    /routes
GET    /routes/:id
GET    /routes/stats

## Zones (10 routes)
POST   /zones
PATCH  /zones/:id
POST   /zones/:id/activate
POST   /zones/:id/deactivate
POST   /zones/:id/restrict
POST   /zones/:id/suspend
POST   /zones/:id/archive
GET    /zones
GET    /zones/:id
GET    /zones/stats

## Shipping Methods (10 routes)
POST   /shipping-methods
PATCH  /shipping-methods/:id
POST   /shipping-methods/:id/activate
POST   /shipping-methods/:id/deactivate
POST   /shipping-methods/:id/suspend
GET    /shipping-methods
GET    /shipping-methods/:id
GET    /shipping-methods/default
GET    /shipping-methods/usable
GET    /shipping-methods/stats

## Packagings (12 routes)
POST   /packagings
PATCH  /packagings/:id
PATCH  /packagings/:id/size
POST   /packagings/:id/add-stock
POST   /packagings/:id/consume-stock
POST   /packagings/:id/activate
POST   /packagings/:id/deactivate
POST   /packagings/:id/discontinue
GET    /packagings
GET    /packagings/:id
GET    /packagings/usable
GET    /packagings/out-of-stock

## Return Reasons (8 routes)
POST   /return-reasons
PATCH  /return-reasons/:id
POST   /return-reasons/:id/activate
POST   /return-reasons/:id/deactivate
GET    /return-reasons
GET    /return-reasons/:id
GET    /return-reasons/active
GET    /return-reasons/stats

## Inventory Locations (14 routes)
POST   /inventory-locations
PATCH  /inventory-locations/:id
POST   /inventory-locations/:id/add-stock
POST   /inventory-locations/:id/remove-stock
POST   /inventory-locations/:id/activate
POST   /inventory-locations/:id/deactivate
POST   /inventory-locations/:id/quarantine
POST   /inventory-locations/:id/unquarantine
POST   /inventory-locations/:id/archive
GET    /inventory-locations
GET    /inventory-locations/:id
GET    /inventory-locations/code/:code
GET    /inventory-locations/barcode/:barcode
GET    /inventory-locations/pickable

## Return Shipments (14 routes)
POST   /return-shipments
POST   /return-shipments/:id/approve
POST   /return-shipments/:id/reject
POST   /return-shipments/:id/schedule-pickup
POST   /return-shipments/:id/pick-up
POST   /return-shipments/:id/start-transit
POST   /return-shipments/:id/receive
POST   /return-shipments/:id/inspect
POST   /return-shipments/:id/complete
POST   /return-shipments/:id/cancel
POST   /return-shipments/:id/mark-lost
GET    /return-shipments
GET    /return-shipments/:id
GET    /return-shipments/stats

## Insurances (14 routes)
POST   /insurances
POST   /insurances/:id/activate
POST   /insurances/:id/cancel
POST   /insurances/:id/expire
POST   /insurances/:id/claims
POST   /insurances/:id/claims/:claimId/review
POST   /insurances/:id/claims/:claimId/approve
POST   /insurances/:id/claims/:claimId/reject
POST   /insurances/:id/claims/:claimId/pay
GET    /insurances
GET    /insurances/:id
GET    /insurances/stats

## Webhooks (10 public endpoints, no JWT)
POST /webhooks/sa-paribahan
POST /webhooks/sundarban
POST /webhooks/redx
POST /webhooks/pathao
POST /webhooks/paperfly
POST /webhooks/steadfast
POST /webhooks/dhl
POST /webhooks/fedex
POST /webhooks/ups
POST /webhooks/aramex

Webhook body:
    { "body": { "trackingNumber": "...", "status": "...", "occurredAt": "..." } }

Signature header (optional, dev mode skips):
    x-<provider>-signature: HMAC-SHA256 hex

## Public Tracking (no JWT)
GET /public/tracking/:trackingNumber

## System
GET /health
GET /api/docs (Swagger UI)
GET /api/docs-json (OpenAPI JSON)

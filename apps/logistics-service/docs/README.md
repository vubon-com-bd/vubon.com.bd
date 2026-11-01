# Logistics Service — Production-Grade NestJS Microservice

## Status: 100% Complete

| Layer | Files | Status |
|-------|-------|--------|
| Domain | 21 aggregates | OK |
| Application | ~334 providers (CQRS) | OK |
| Infrastructure | ~250 files | OK |
| Interfaces | ~200 files | OK |
| Modules | ~90 files | OK |
| Cross-Service | 7/7 services | OK |
| Webhooks | 10 providers | OK |
| Queues | 9 BullMQ | OK |
| Workers | 9 processors | OK |

Total: ~740 files, ~230 HTTP routes live.

## Architecture — 4 Layers

INTERFACES (17 REST + 10 webhook + public + health controllers)
    down to
APPLICATION (17 services + 166 cmd handlers + 133 qry handlers + 4 sagas)
    down to
DOMAIN (21 aggregates + 60+ VOs + events + specs + domain services)
    down to
INFRASTRUCTURE (Prisma + Memory + Cache + Search + Queues + Workers + External clients)

## Quick Start

    cd ~/vubon.com.bd/apps/logistics-service
    pnpm install
    pnpm build
    pm2 start ecosystem.config.cjs --only logistics
    curl http://localhost:3007/health

## Required ENV Keys

    NODE_ENV=development
    PORT=3007
    DB_MODE=memory (or prisma)
    PERSISTENCE_DRIVER=memory (or prisma)
    JWT_SECRET=<shared>
    REDIS_URL=redis://localhost:6379
    IDENTITY_SERVICE_URL=http://localhost:3001
    PRODUCT_SERVICE_URL=http://localhost:3002
    VENDOR_SERVICE_URL=http://localhost:3003
    CART_SERVICE_URL=http://localhost:3004
    ORDER_SERVICE_URL=http://localhost:3005
    PAYMENT_SERVICE_URL=http://localhost:3006
    NOTIFICATION_SERVICE_URL=http://localhost:4006

## 17 Aggregates — Live Endpoints

    /shipments          19 routes
    /couriers           12 routes
    /deliveries         13 routes
    /trackings          11 routes
    /warehouses         13 routes
    /fulfillments       15 routes
    /dispatches         11 routes
    /vehicles           10 routes
    /drivers            14 routes
    /routes             12 routes
    /zones              10 routes
    /shipping-methods   10 routes
    /packagings         12 routes
    /return-reasons      8 routes
    /inventory-locations 14 routes
    /return-shipments   14 routes
    /insurances         14 routes

## Webhooks — 10 Public Endpoints

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

## Public Endpoints (No JWT)

    GET /public/tracking/:trackingNumber
    GET /health
    GET /api/docs (Swagger)

## Background Jobs

    9 BullMQ queues:
    - logistics-shipment-processing
    - logistics-delivery-processing
    - logistics-tracking-sync
    - logistics-courier-sync
    - logistics-fulfillment-processing
    - logistics-dispatch-processing
    - logistics-notification
    - logistics-retry
    - logistics-analytics

    9 Workers running (concurrency 2-5 per queue)

## Event-Driven

    Event bus: Redis BullMQ (domain-events-*)
    4 sagas:
    - ShipmentLifecycleSaga (5 events)
    - DeliveryAttemptSaga (3 events)
    - ReturnPickupSaga (3 events)
    - InsuranceClaimSaga (4 events)

    17+ external event handlers:
    - order.created/confirmed/cancelled/shipped/returned/refunded
    - payment.completed/failed
    - vendor.approved/suspended/deleted
    - product.created/updated/deleted
    - user.created/status_changed/deleted

## Cross-Service Clients

    ✅ Product     (GET /products/:id)
    ✅ Order       (GET /orders/:id)
    ✅ Vendor      (GET /vendors/:id)
    ✅ Cart        (GET /carts/:id)
    ✅ Payment     (GET /payments/:id)
    ✅ Identity    (GET /api/v1/users/:id)
    ✅ Notification (POST /notifications)

## 10 Courier Clients

    sa-paribahan, sundarban, redx, pathao, paperfly,
    steadfast, dhl, fedex, ups, aramex

    Each: base-courier.service.ts + service.ts + mapper.ts + module.ts

## Testing

    curl http://localhost:3007/health
    curl http://localhost:3007/api/docs

    # With JWT
    TOKEN=$(node -e "const jwt=require('jsonwebtoken');require('dotenv').config();console.log(jwt.sign({sub:'test-user',email:'t@e.com',roles:['admin']},process.env.JWT_SECRET,{expiresIn:'2h'}))")
    curl http://localhost:3007/shipments -H "Authorization: Bearer $TOKEN"

## Support

    Version: 1.0.0
    Maintainer: Vubon Platform Team
    Last Updated: 2026-11-01

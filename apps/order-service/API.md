# API Reference — Order Service

Base URL: http://localhost:3004
Swagger: http://localhost:3004/api/docs

## Authentication

All endpoints require JWT bearer token (except /health and /public/*).

Header: Authorization: Bearer <token>

Public endpoints:
- GET /health
- GET /orders/:id/public
- GET /orders/number/:orderNumber
- GET /public/orders/:id

## Endpoints Summary

| Group | Count | Base Path |
|-------|-------|-----------|
| Health | 1 | /health |
| Orders | 11 | /orders |
| Order Items | 5 | /orders/:id/items |
| Checkouts | 7 | /checkouts |
| Deliveries | 5 | /deliveries |
| Cancels | 4 | /cancels |
| Returns | 5 | /returns |
| Fulfillments | 5 | /fulfillments |
| Tracking | 5 | /tracking |

Total: 48 endpoints

## Orders

### POST /orders
Create a new order.

Body:
    {
      "customerId": "uuid",
      "items": [
        {
          "productId": "uuid",
          "variantId": "uuid (optional)",
          "vendorId": "uuid (optional)",
          "quantity": 1,
          "unitPrice": 100
        }
      ],
      "shippingAddress": {
        "line1": "123 St",
        "city": "Dhaka",
        "country": "BD"
      },
      "billingAddress": {},
      "shippingMethod": "standard",
      "paymentMethod": "bkash",
      "currency": "BDT",
      "notes": "string",
      "idempotencyKey": "string"
    }

Response 201:
    {
      "success": true,
      "orderId": "uuid",
      "orderNumber": "ORD-2026-000001",
      "status": "pending"
    }

### GET /orders
List orders (paginated, filtered).

Query params: page, limit, status, customerId, fromDate, toDate

### GET /orders/:id
Get order by ID.

### GET /orders/number/:orderNumber
Get order by order number.

### GET /orders/:id/public
Public view of order (customer-safe).

### GET /orders/:id/detail
Order detail with items.

### GET /orders/stats
Order statistics (aggregated).

### PATCH /orders/:id
Update order (notes, shipping, tracking).

### POST /orders/:id/confirm
Confirm pending order.

### POST /orders/:id/hold
Put order on hold (admin).

### POST /orders/:id/release
Release hold.

### DELETE /orders/:id
Soft delete order.

## Order Items

### POST /orders/:orderId/items
Add item to order.

### GET /orders/:orderId/items
List items for order.

### GET /orders/:orderId/items/:itemId
Get specific item.

### PATCH /orders/:orderId/items/:itemId
Update item quantity/price.

### DELETE /orders/:orderId/items/:itemId
Remove item from order.

## Checkouts

### POST /checkouts
Start new checkout session.

### POST /checkouts/:id/address
Select shipping/billing address.

### POST /checkouts/:id/shipping
Select shipping method.

### POST /checkouts/:id/payment
Select payment method.

### POST /checkouts/:id/confirm
Confirm checkout (creates order).

### POST /checkouts/:id/abandon
Abandon checkout.

### GET /checkouts/:id
Get checkout details.

## Deliveries

### POST /deliveries
Schedule delivery.

### GET /deliveries
List deliveries (paginated).

### GET /deliveries/:id
Get delivery details.

### POST /deliveries/:id/reschedule
Reschedule delivery.

### POST /deliveries/:id/confirm
Confirm delivery (mark as delivered).

## Cancels

### POST /cancels
Request order cancellation.

### POST /cancels/:id/approve
Approve cancellation (refund).

### POST /cancels/:id/reject
Reject cancellation.

### GET /cancels/:id
Get cancel details.

## Returns

### POST /returns
Request order return.

### POST /returns/:id/approve
Approve return.

### POST /returns/:id/reject
Reject return.

### POST /returns/:id/complete
Complete return (refund).

### GET /returns/:id
Get return details.

## Fulfillments

### POST /fulfillments/start
Start fulfillment.

### POST /fulfillments/:id/pack
Mark as packed.

### POST /fulfillments/:id/ship
Mark as shipped.

### POST /fulfillments/:id/complete
Mark as complete.

### GET /fulfillments/:id
Get fulfillment details.

## Tracking

### POST /tracking
Add tracking event.

### GET /tracking/orders/:orderId
Get tracking summary for order.

### GET /tracking/orders/:orderId/events
List tracking events.

### GET /tracking/:id
Get specific tracking entry.

### POST /tracking/:id/update
Update tracking entry.

## Error Responses

All errors follow:
    {
      "statusCode": 400,
      "code": "VAL-001",
      "message": "Error message",
      "timestamp": "2026-01-01T00:00:00.000Z",
      "path": "/orders"
    }

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 422 | Unprocessable Entity |
| 500 | Internal Server Error |
| 503 | Service Unavailable |

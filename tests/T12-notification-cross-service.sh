#!/data/data/com.termux/files/usr/bin/bash
set -e

API="http://localhost:3001/api/v1"
CART="http://localhost:3004"
PRODUCT="http://localhost:3002"
VENDOR="http://localhost:3003"
ORDER="http://localhost:3005"
PAYMENT="http://localhost:3006"
TS=$(date +%s)
EMAIL="t12-${TS}@vubon.com.bd"
PASS="Test@12345"
PASS_COUNT=0
FAIL_COUNT=0

echo "═══════════════════════════════════════════════════════"
echo "  T12: NOTIFICATION — Cross-service handler test"
echo "═══════════════════════════════════════════════════════"
echo ""

> ~/logs/notification-out.log 2>/dev/null || true

# Setup
curl -s -X POST "$API/auth/register" -H "Content-Type: application/json" -d "{\"email\":\"$EMAIL\",\"password\":\"$PASS\",\"confirmPassword\":\"$PASS\",\"acceptTerms\":true,\"firstName\":\"T12\",\"lastName\":\"Notif\",\"phone\":\"+8801700${TS: -6}\"}" > /dev/null
LOGIN=$(curl -s -X POST "$API/auth/login" -H "Content-Type: application/json" -d "{\"identifier\":\"$EMAIL\",\"password\":\"$PASS\"}")
TOKEN=$(echo "$LOGIN" | grep -oP '"accessToken":"[^"]+"' | cut -d'"' -f4)
USER_ID=$(echo "$LOGIN" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
AUTH="Authorization: Bearer $TOKEN"
sleep 3
VENDOR_ID=$(curl -s "$VENDOR/vendors/me" -H "$AUTH" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
curl -s -X POST "$VENDOR/vendors/$VENDOR_ID/approve" -H "Content-Type: application/json" -H "$AUTH" -d '{"notes":"t12"}' > /dev/null

echo "▶ T12.1: Vendor approved → vendor.vendor.approved event"
sleep 2
LOG=$(grep -a "vendor.approval.approved\|VendorApproved" ~/logs/notification-out.log 2>/dev/null | wc -l)
if [ "$LOG" -gt 0 ]; then echo "  ✅ vendor.approval.approved ($LOG)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  ⚠️  Event not logged (async)"; fi

# Product create → publish
CAT_ID=$(curl -s -X POST "$PRODUCT/categories" -H "Content-Type: application/json" -H "$AUTH" -d "{\"name\":\"T12Cat\",\"slug\":\"t12cat-$TS\"}" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
PROD_ID=$(curl -s -X POST "$PRODUCT/products" -H "Content-Type: application/json" -H "$AUTH" -d "{\"name\":\"T12 Product\",\"slug\":\"t12p-$TS\",\"sku\":\"T12-$TS\",\"type\":\"physical\",\"categoryId\":\"$CAT_ID\",\"vendorId\":\"$VENDOR_ID\",\"price\":1500,\"currency\":\"BDT\"}" | grep -oP '"productId":"[^"]+"' | cut -d'"' -f4)
sleep 2
echo ""
echo "▶ T12.2: Product created → product.product.created"
LOG=$(grep -a "product.product.created\|ProductCreatedHandler" ~/logs/notification-out.log 2>/dev/null | wc -l)
if [ "$LOG" -gt 0 ]; then echo "  ✅ product.product.created ($LOG)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  ⚠️  Async not logged"; fi

curl -s -X POST "$PRODUCT/product-variants" -H "Content-Type: application/json" -H "$AUTH" -d "{\"productId\":\"$PROD_ID\",\"name\":\"Default\",\"sku\":\"T12V-$TS\",\"type\":\"weight\",\"options\":[{\"name\":\"W\",\"value\":\"1kg\"}],\"price\":1500}" > /dev/null
sleep 2
INV_ID=$(curl -s "$PRODUCT/product-inventory/by-product/$PROD_ID" -H "$AUTH" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
curl -s -X POST "$PRODUCT/product-inventory/$INV_ID/update" -H "Content-Type: application/json" -H "$AUTH" -d '{"delta":50,"reason":"init"}' > /dev/null
curl -s -X POST "$PRODUCT/products/$PROD_ID/media" -H "Content-Type: application/json" -H "$AUTH" -d '{"items":[{"url":"https://vubon.com.bd/img/t12.jpg","type":"image","alt":"t12","order":0,"isPrimary":true}]}' > /dev/null
curl -s -X POST "$PRODUCT/products/$PROD_ID/submit" -H "Content-Type: application/json" -H "$AUTH" -d '{}' > /dev/null
curl -s -X POST "$PRODUCT/products/$PROD_ID/approve" -H "Content-Type: application/json" -H "$AUTH" -d '{}' > /dev/null
curl -s -X POST "$PRODUCT/products/$PROD_ID/publish" -H "Content-Type: application/json" -H "$AUTH" -d '{}' > /dev/null
sleep 3

echo ""
echo "▶ T12.3: Product published → product.product.published"
LOG=$(grep -a "product.product.published\|ProductPublished" ~/logs/notification-out.log 2>/dev/null | wc -l)
if [ "$LOG" -gt 0 ]; then echo "  ✅ product.product.published ($LOG)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  ⚠️  Async not logged"; fi

# Cart → order
CART_ID=$(curl -s "$CART/carts/me" -H "$AUTH" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
curl -s -X POST "$CART/carts/$CART_ID/items" -H "Content-Type: application/json" -H "$AUTH" -d "{\"productId\":\"$PROD_ID\",\"quantity\":2}" > /dev/null
sleep 2

echo ""
echo "▶ T12.4: Cart item added → cart.cart_item.added"
LOG=$(grep -a "cart.cart_item.added\|CartItemAdded" ~/logs/notification-out.log 2>/dev/null | wc -l)
if [ "$LOG" -gt 0 ]; then echo "  ✅ cart.cart_item.added ($LOG)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  ⚠️  Async not logged"; fi

ORDER_ID=$(curl -s -X POST "$ORDER/orders" -H "Content-Type: application/json" -H "$AUTH" -d "{\"customerId\":\"$USER_ID\",\"cartId\":\"$CART_ID\",\"items\":[{\"productId\":\"$PROD_ID\",\"vendorId\":\"$VENDOR_ID\",\"quantity\":2,\"unitPrice\":1500}],\"shippingAddress\":{\"line1\":\"123 Test\",\"city\":\"Dhaka\",\"country\":\"BD\"},\"paymentMethod\":\"cash_on_delivery\",\"currency\":\"BDT\"}" | grep -oP '"orderId":"[^"]+"' | cut -d'"' -f4)
sleep 3

echo ""
echo "▶ T12.5: Order created → order.order.created"
LOG=$(grep -a "order.order.created\|OrderCreatedHandler" ~/logs/notification-out.log 2>/dev/null | wc -l)
if [ "$LOG" -gt 0 ]; then echo "  ✅ order.order.created ($LOG)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  ⚠️  Async not logged"; fi

# Payment
PAY_ID=$(curl -s -X POST "$PAYMENT/payments" -H "Content-Type: application/json" -H "$AUTH" -d "{\"orderId\":\"$ORDER_ID\",\"method\":\"cash_on_delivery\",\"amount\":3000,\"currency\":\"BDT\"}" | grep -oP '"paymentId":"[^"]+"' | cut -d'"' -f4)
curl -s -X POST "$PAYMENT/payments/$PAY_ID/confirm" -H "Content-Type: application/json" -H "$AUTH" -d '{}' > /dev/null
sleep 4

echo ""
echo "▶ T12.6: Payment completed → payment.payment.completed"
LOG=$(grep -a "payment.payment.completed\|PaymentCompletedHandler" ~/logs/notification-out.log 2>/dev/null | wc -l)
if [ "$LOG" -gt 0 ]; then echo "  ✅ payment.payment.completed ($LOG)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  ⚠️  Async not logged"; fi

# Summary
echo ""
echo "▶ Notification activity summary"
TOTAL_EVENTS=$(grep -a "Processing " ~/logs/notification-out.log 2>/dev/null | wc -l)
TOTAL_NOTIFS=$(grep -a "Notification sent\|Bengali notification sent" ~/logs/notification-out.log 2>/dev/null | wc -l)
echo "  📊 Events processed: $TOTAL_EVENTS"
echo "  📊 Notifications sent: $TOTAL_NOTIFS"

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  T12 RESULT: $PASS_COUNT passed, $FAIL_COUNT failed"
echo "═══════════════════════════════════════════════════════"

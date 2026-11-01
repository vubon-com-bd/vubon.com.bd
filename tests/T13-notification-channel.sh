#!/data/data/com.termux/files/usr/bin/bash
set -e

API="http://localhost:3001/api/v1"
CART="http://localhost:3004"
PRODUCT="http://localhost:3002"
VENDOR="http://localhost:3003"
ORDER="http://localhost:3005"
PAYMENT="http://localhost:3006"
TS=$(date +%s)
EMAIL="t13-${TS}@vubon.com.bd"
PASS="Test@12345"

PASS_COUNT=0
FAIL_COUNT=0
check() {
  local name="$1" condition="$2"
  if [ "$condition" = "true" ]; then echo "  ✅ $name"; PASS_COUNT=$((PASS_COUNT+1))
  else echo "  🔴 $name"; FAIL_COUNT=$((FAIL_COUNT+1)); fi
}

echo "═══════════════════════════════════════════════════════"
echo "  T13: NOTIFICATION CHANNEL — Email delivery verify"
echo "═══════════════════════════════════════════════════════"
echo ""

# Clear notification log
> ~/logs/notification-out.log 2>/dev/null || true

# Setup full flow
curl -s -X POST "$API/auth/register" -H "Content-Type: application/json" -d "{\"email\":\"$EMAIL\",\"password\":\"$PASS\",\"confirmPassword\":\"$PASS\",\"acceptTerms\":true,\"firstName\":\"T13\",\"lastName\":\"Channel\",\"phone\":\"+8801700${TS: -6}\"}" > /dev/null
LOGIN=$(curl -s -X POST "$API/auth/login" -H "Content-Type: application/json" -d "{\"identifier\":\"$EMAIL\",\"password\":\"$PASS\"}")
TOKEN=$(echo "$LOGIN" | grep -oP '"accessToken":"[^"]+"' | cut -d'"' -f4)
USER_ID=$(echo "$LOGIN" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
AUTH="Authorization: Bearer $TOKEN"
sleep 3
VENDOR_ID=$(curl -s "$VENDOR/vendors/me" -H "$AUTH" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
curl -s -X POST "$VENDOR/vendors/$VENDOR_ID/approve" -H "Content-Type: application/json" -H "$AUTH" -d '{"notes":"t13"}' > /dev/null
CAT_ID=$(curl -s -X POST "$PRODUCT/categories" -H "Content-Type: application/json" -H "$AUTH" -d "{\"name\":\"T13Cat\",\"slug\":\"t13cat-$TS\"}" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
PROD_ID=$(curl -s -X POST "$PRODUCT/products" -H "Content-Type: application/json" -H "$AUTH" -d "{\"name\":\"T13 Product\",\"slug\":\"t13p-$TS\",\"sku\":\"T13-$TS\",\"type\":\"physical\",\"categoryId\":\"$CAT_ID\",\"vendorId\":\"$VENDOR_ID\",\"price\":1500,\"currency\":\"BDT\"}" | grep -oP '"productId":"[^"]+"' | cut -d'"' -f4)
sleep 2
curl -s -X POST "$PRODUCT/product-variants" -H "Content-Type: application/json" -H "$AUTH" -d "{\"productId\":\"$PROD_ID\",\"name\":\"Default\",\"sku\":\"T13V-$TS\",\"type\":\"weight\",\"options\":[{\"name\":\"W\",\"value\":\"1kg\"}],\"price\":1500}" > /dev/null
sleep 2
INV_ID=$(curl -s "$PRODUCT/product-inventory/by-product/$PROD_ID" -H "$AUTH" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
curl -s -X POST "$PRODUCT/product-inventory/$INV_ID/update" -H "Content-Type: application/json" -H "$AUTH" -d '{"delta":50,"reason":"init"}' > /dev/null
curl -s -X POST "$PRODUCT/products/$PROD_ID/media" -H "Content-Type: application/json" -H "$AUTH" -d '{"items":[{"url":"https://vubon.com.bd/img/t13.jpg","type":"image","alt":"t13","order":0,"isPrimary":true}]}' > /dev/null
curl -s -X POST "$PRODUCT/products/$PROD_ID/submit" -H "Content-Type: application/json" -H "$AUTH" -d '{}' > /dev/null
curl -s -X POST "$PRODUCT/products/$PROD_ID/approve" -H "Content-Type: application/json" -H "$AUTH" -d '{}' > /dev/null
curl -s -X POST "$PRODUCT/products/$PROD_ID/publish" -H "Content-Type: application/json" -H "$AUTH" -d '{}' > /dev/null
sleep 3
CART_ID=$(curl -s "$CART/carts/me" -H "$AUTH" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
curl -s -X POST "$CART/carts/$CART_ID/items" -H "Content-Type: application/json" -H "$AUTH" -d "{\"productId\":\"$PROD_ID\",\"quantity\":2}" > /dev/null
echo "  Setup: user + vendor + product + cart ready"
echo ""

# T13.1: Create order + payment → trigger email
echo "▶ T13.1: Order + payment → notification email"
ORDER_ID=$(curl -s -X POST "$ORDER/orders" -H "Content-Type: application/json" -H "$AUTH" -d "{\"customerId\":\"$USER_ID\",\"cartId\":\"$CART_ID\",\"items\":[{\"productId\":\"$PROD_ID\",\"vendorId\":\"$VENDOR_ID\",\"quantity\":2,\"unitPrice\":1500}],\"shippingAddress\":{\"line1\":\"123 Test\",\"city\":\"Dhaka\",\"country\":\"BD\"},\"paymentMethod\":\"cash_on_delivery\",\"currency\":\"BDT\"}" | grep -oP '"orderId":"[^"]+"' | cut -d'"' -f4)
sleep 2
PAY_ID=$(curl -s -X POST "$PAYMENT/payments" -H "Content-Type: application/json" -H "$AUTH" -d "{\"orderId\":\"$ORDER_ID\",\"method\":\"cash_on_delivery\",\"amount\":3000,\"currency\":\"BDT\"}" | grep -oP '"paymentId":"[^"]+"' | cut -d'"' -f4)
curl -s -X POST "$PAYMENT/payments/$PAY_ID/confirm" -H "Content-Type: application/json" -H "$AUTH" -d '{}' > /dev/null
sleep 5

# T13.2: Verify SMTP send attempt in log
echo ""
echo "▶ T13.2: SMTP send attempt in notification log"
SEND_ATTEMPTS=$(grep -a -c "smtp\|SMTP\|sendMail\|Transport" ~/logs/notification-out.log 2>/dev/null || echo 0)
SEND_SUCCESS=$(grep -a -c "messageId\|Email sent\|Notification sent" ~/logs/notification-out.log 2>/dev/null || echo 0)
echo "  📊 SMTP attempts: $SEND_ATTEMPTS"
echo "  📊 Successful sends: $SEND_SUCCESS"
check "Email sent (>0 success)" "$([ "$SEND_SUCCESS" -gt 0 ] && echo true || echo false)"

# T13.3: Verify messageId captured
echo ""
echo "▶ T13.3: Message ID from SMTP"
MSG_IDS=$(grep -a -oP 'msgId=<[^>]+>' ~/logs/notification-out.log 2>/dev/null | head -3)
if [ -n "$MSG_IDS" ]; then
  echo "  ✅ Message IDs found:"
  echo "$MSG_IDS" | while read id; do echo "    $id"; done
  PASS_COUNT=$((PASS_COUNT+1))
else
  echo "  ⚠️  No message IDs in log"
fi

# T13.4: Notification handler for payment
echo ""
echo "▶ T13.4: PaymentCompletedHandler triggered"
PAY_HANDLER=$(grep -a -c "PaymentCompletedHandler\|payment.payment.completed" ~/logs/notification-out.log 2>/dev/null || echo 0)
check "Payment handler triggered" "$([ "$PAY_HANDLER" -gt 0 ] && echo true || echo false)"

# T13.5: Bengali template rendered
echo ""
echo "▶ T13.5: Bengali email template rendered"
BN_TEMPLATE=$(grep -a -c "Bengali notification\|renderPaymentCompletedEmail\|bn-BD" ~/logs/notification-out.log 2>/dev/null || echo 0)
check "Bengali template used" "$([ "$BN_TEMPLATE" -gt 0 ] && echo true || echo false)"

# T13.6: Channel selection (IN_APP + EMAIL)
echo ""
echo "▶ T13.6: Channel selection (IN_APP + EMAIL)"
CHANNELS=$(grep -a "channel=email\|channel=in_app\|Channels:" ~/logs/notification-out.log 2>/dev/null | wc -l)
check "Multi-channel dispatch ($CHANNELS)" "$([ "$CHANNELS" -gt 0 ] && echo true || echo false)"

# Final summary
echo ""
echo "▶ Notification delivery summary"
echo "  📊 Total events processed: $(grep -a 'Processing ' ~/logs/notification-out.log | wc -l)"
echo "  📊 Total notifications sent: $(grep -a 'Notification sent\|Email sent' ~/logs/notification-out.log | wc -l)"
echo "  📊 Total SMTP attempts: $SEND_ATTEMPTS"

# Show last 5 email-related log lines
echo ""
echo "▶ Last 5 email log lines:"
grep -a -iE "smtp|email|sendmail|messageId" ~/logs/notification-out.log 2>/dev/null | tail -5 | sed 's/^/  /'

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  T13 RESULT: $PASS_COUNT passed, $FAIL_COUNT failed"
echo "═══════════════════════════════════════════════════════"

# API Examples

Place API request/response examples here.

## Categories

- `requests/` — Sample request bodies
- `responses/` — Sample responses
- `curl/` — curl command examples
- `postman/` — Postman collections

## curl Examples

### Health
\`\`\`bash
curl http://localhost:3002/health
\`\`\`

### List Products
\`\`\`bash
curl -H "Authorization: Bearer <token>" \\
  "http://localhost:3002/products?page=1&limit=20"
\`\`\`

### Create Product
\`\`\`bash
curl -X POST http://localhost:3002/products \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -H "Idempotency-Key: unique-key-123" \\
  -d '{
    "name": "Premium T-Shirt",
    "slug": "premium-t-shirt",
    "sku": "TSHIRT-001",
    "type": "physical",
    "categoryId": "uuid",
    "price": 1250.00,
    "currency": "BDT"
  }'
\`\`\`

vubon.com.bd/
│
├── 📁 packages/
│   │
│   ├── 📁 schema/
│   │   └── 📁 cart/
│   │       ├── 📄 core.primitives.schema.ts
│   │       ├── 📄 cart.schema.ts
│   │       ├── 📄 cart-item.schema.ts
│   │       ├── 📄 saved-for-later.schema.ts
│   │       ├── 📄 cart-promotion.schema.ts
│   │       ├── 📄 cart-coupon.schema.ts
│   │       ├── 📄 abandoned-cart.schema.ts
│   │       ├── 📄 cart-guest.schema.ts
│   │       ├── 📄 cart-merger.schema.ts
│   │       └── 📄 cart-settings.schema.ts
│   │
│   ├── 📁 client-types/
│   │   └── 📁 cart/
│   │       ├── 📄 core.primitives.types.ts
│   │       ├── 📄 cart.types.ts
│   │       ├── 📄 cart-item.types.ts
│   │       ├── 📄 saved-for-later.types.ts
│   │       ├── 📄 cart-promotion.types.ts
│   │       ├── 📄 cart-coupon.types.ts
│   │       ├── 📄 abandoned-cart.types.ts
│   │       ├── 📄 cart-guest.types.ts
│   │       ├── 📄 cart-merger.types.ts
│   │       ├── 📄 cart-settings.types.ts
│   │       └── 📄 index.ts
│   │
│   └── 📁 ui/                                        # 👈 একমাত্র Shared UI Source (No Duplicates)
│       │
│       ├── 📄 index.ts                               # Main exports
│       │
│       ├── 📁 components/
│       │   │
│       │   ├── 📁 shared/                           # Base UI Components
│       │   │   ├── 📄 Button.tsx
│       │   │   ├── 📄 Input.tsx
│       │   │   ├── 📄 Card.tsx
│       │   │   ├── 📄 Modal.tsx
│       │   │   ├── 📄 Table.tsx
│       │   │   ├── 📄 Pagination.tsx
│       │   │   ├── 📄 Loading.tsx
│       │   │   ├── 📄 ErrorBoundary.tsx
│       │   │   ├── 📄 QuantitySelector.tsx
│       │   │   ├── 📄 PriceBreakdown.tsx
│       │   │   └── 📄 CouponInput.tsx
│       │   │
│       │   ├── 📁 cart/                             # Cart-specific Shared Components
│       │   │   ├── 📄 CartDrawer.tsx
│       │   │   ├── 📄 CartItem.tsx
│       │   │   ├── 📄 CartItemList.tsx
│       │   │   ├── 📄 CartSummary.tsx
│       │   │   ├── 📄 CartTotals.tsx
│       │   │   ├── 📄 CartCoupon.tsx
│       │   │   ├── 📄 CartShipping.tsx
│       │   │   ├── 📄 CartNote.tsx
│       │   │   ├── 📄 CartProgressBar.tsx
│       │   │   ├── 📄 FreeShippingBar.tsx
│       │   │   ├── 📄 CartLoyaltyPoints.tsx
│       │   │   ├── 📄 CartRecommendations.tsx
│       │   │   ├── 📄 EmptyCart.tsx
│       │   │   ├── 📄 MiniCart.tsx
│       │   │   ├── 📄 MiniCartItem.tsx
│       │   │   ├── 📄 MiniCartButton.tsx
│       │   │   ├── 📄 SavedForLaterList.tsx
│       │   │   ├── 📄 SavedForLaterItem.tsx
│       │   │   ├── 📄 MoveToCartButton.tsx
│       │   │   ├── 📄 AddToCartButton.tsx
│       │   │   ├── 📄 BuyNowButton.tsx
│       │   │   └── 📄 CartNotification.tsx
│       │   │
│       │   └── 📁 layout/                           # Layout Components
│       │       ├── 📄 Header.tsx
│       │       ├── 📄 Footer.tsx
│       │       ├── 📄 Sidebar.tsx
│       │       └── 📄 Container.tsx
│       │
│       └── 📁 styles/
│           │
│           ├── 📄 globals.css
│           ├── 📄 tailwind.config.js
│           │
│           ├── 📁 shared/
│           │   ├── 📄 button.module.css
│           │   ├── 📄 input.module.css
│           │   ├── 📄 card.module.css
│           │   ├── 📄 modal.module.css
│           │   ├── 📄 table.module.css
│           │   ├── 📄 pagination.module.css
│           │   ├── 📄 loading.module.css
│           │   ├── 📄 error-boundary.module.css
│           │   ├── 📄 quantity-selector.module.css
│           │   ├── 📄 price-breakdown.module.css
│           │   └── 📄 coupon-input.module.css
│           │
│           ├── 📁 cart/
│           │   ├── 📄 cart-drawer.module.css
│           │   ├── 📄 cart-item.module.css
│           │   ├── 📄 cart-item-list.module.css
│           │   ├── 📄 cart-summary.module.css
│           │   ├── 📄 cart-totals.module.css
│           │   ├── 📄 cart-coupon.module.css
│           │   ├── 📄 cart-shipping.module.css
│           │   ├── 📄 cart-note.module.css
│           │   ├── 📄 cart-progress-bar.module.css
│           │   ├── 📄 free-shipping-bar.module.css
│           │   ├── 📄 cart-loyalty-points.module.css
│           │   ├── 📄 cart-recommendations.module.css
│           │   ├── 📄 empty-cart.module.css
│           │   ├── 📄 mini-cart.module.css
│           │   ├── 📄 mini-cart-item.module.css
│           │   ├── 📄 mini-cart-button.module.css
│           │   ├── 📄 saved-for-later-list.module.css
│           │   ├── 📄 saved-for-later-item.module.css
│           │   ├── 📄 move-to-cart-button.module.css
│           │   ├── 📄 add-to-cart-button.module.css
│           │   ├── 📄 buy-now-button.module.css
│           │   └── 📄 cart-notification.module.css
│           │
│           └── 📁 layout/
│               ├── 📄 header.module.css
│               ├── 📄 footer.module.css
│               ├── 📄 sidebar.module.css
│               └── 📄 container.module.css
│
├── 📁 apps/
│   │
│   ├── 📁 cart-service/                              # Cart Service (Backend)
│   │   └── 📁 src/
│   │       │
│   │       ├── 📁 module/
│   │       │   │
│   │       │   ├── 📁 domain/
│   │       │   │   │
│   │       │   │   ├── 📁 value-objects/
│   │       │   │   │   ├── base.vo.ts
│   │       │   │   │   ├── index.ts
│   │       │   │   │   ├── 📁 primitives/
│   │       │   │   │   │   ├── index.ts
│   │       │   │   │   │   ├── cart-id.vo.ts
│   │       │   │   │   │   ├── cart-item-id.vo.ts
│   │       │   │   │   │   ├── quantity.vo.ts
│   │       │   │   │   │   ├── subtotal.vo.ts
│   │       │   │   │   │   ├── tax.vo.ts
│   │       │   │   │   │   ├── shipping.vo.ts
│   │       │   │   │   │   ├── discount.vo.ts
│   │       │   │   │   │   ├── total.vo.ts
│   │       │   │   │   │   └── coupon-code.vo.ts
│   │       │   │   │   ├── cart.vo.ts
│   │       │   │   │   ├── cart-item.vo.ts
│   │       │   │   │   ├── saved-for-later.vo.ts
│   │       │   │   │   ├── cart-promotion.vo.ts
│   │       │   │   │   ├── cart-coupon.vo.ts
│   │       │   │   │   └── abandoned-cart.vo.ts
│   │       │   │   │
│   │       │   │   ├── 📁 entities/
│   │       │   │   │   ├── base.entity.ts
│   │       │   │   │   ├── index.ts
│   │       │   │   │   ├── cart.entity.ts
│   │       │   │   │   ├── cart-item.entity.ts
│   │       │   │   │   ├── saved-for-later.entity.ts
│   │       │   │   │   ├── cart-promotion.entity.ts
│   │       │   │   │   ├── cart-coupon.entity.ts
│   │       │   │   │   ├── abandoned-cart.entity.ts
│   │       │   │   │   ├── cart-guest.entity.ts
│   │       │   │   │   ├── cart-merger.entity.ts
│   │       │   │   │   └── cart-settings.entity.ts
│   │       │   │   │
│   │       │   │   ├── 📁 repositories/
│   │       │   │   │   ├── base.repository.ts
│   │       │   │   │   ├── index.ts
│   │       │   │   │   ├── cart.repository.ts
│   │       │   │   │   ├── cart-item.repository.ts
│   │       │   │   │   ├── saved-for-later.repository.ts
│   │       │   │   │   ├── cart-promotion.repository.ts
│   │       │   │   │   ├── cart-coupon.repository.ts
│   │       │   │   │   ├── abandoned-cart.repository.ts
│   │       │   │   │   ├── cart-guest.repository.ts
│   │       │   │   │   ├── cart-merger.repository.ts
│   │       │   │   │   ├── cart-settings.repository.ts
│   │       │   │   │   └── 📁 mocks/
│   │       │   │   │       ├── cart.repository.mock.ts
│   │       │   │   │       ├── cart-item.repository.mock.ts
│   │       │   │   │       ├── saved-for-later.repository.mock.ts
│   │       │   │   │       ├── cart-promotion.repository.mock.ts
│   │       │   │   │       ├── cart-coupon.repository.mock.ts
│   │       │   │   │       ├── abandoned-cart.repository.mock.ts
│   │       │   │   │       ├── cart-guest.repository.mock.ts
│   │       │   │   │       ├── cart-merger.repository.mock.ts
│   │       │   │   │       └── cart-settings.repository.mock.ts
│   │       │   │   │
│   │       │   │   └── 📁 events/
│   │       │   │       ├── base.event.ts
│   │       │   │       ├── index.ts
│   │       │   │       ├── cart.events.ts
│   │       │   │       ├── cart-item.events.ts
│   │       │   │       ├── cart-coupon.events.ts
│   │       │   │       ├── abandoned-cart.events.ts
│   │       │   │       ├── cart-merger.events.ts
│   │       │   │       └── cart-checkout.events.ts
│   │       │   │
│   │       │   ├── 📁 application/
│   │       │   │   │
│   │       │   │   ├── 📁 dtos/
│   │       │   │   │   ├── index.ts
│   │       │   │   │   ├── 📁 requests/
│   │       │   │   │   │   ├── index.ts
│   │       │   │   │   │   ├── common.dto.ts
│   │       │   │   │   │   ├── add-to-cart.dto.ts
│   │       │   │   │   │   ├── update-cart-item.dto.ts
│   │       │   │   │   │   ├── remove-from-cart.dto.ts
│   │       │   │   │   │   ├── apply-coupon.dto.ts
│   │       │   │   │   │   ├── remove-coupon.dto.ts
│   │       │   │   │   │   ├── move-to-saved-for-later.dto.ts
│   │       │   │   │   │   ├── move-to-cart.dto.ts
│   │       │   │   │   │   ├── clear-cart.dto.ts
│   │       │   │   │   │   ├── update-cart-shipping.dto.ts
│   │       │   │   │   │   ├── update-cart-billing.dto.ts
│   │       │   │   │   │   ├── estimate-shipping.dto.ts
│   │       │   │   │   │   ├── calculate-tax.dto.ts
│   │       │   │   │   │   ├── merge-cart.dto.ts
│   │       │   │   │   │   ├── bulk-add-to-cart.dto.ts
│   │       │   │   │   │   ├── update-multiple-items.dto.ts
│   │       │   │   │   │   ├── cart-gift-wrap.dto.ts
│   │       │   │   │   │   ├── cart-note.dto.ts
│   │       │   │   │   │   └── cart-loyalty-points.dto.ts
│   │       │   │   │   │
│   │       │   │   │   ├── 📁 responses/
│   │       │   │   │   │   ├── index.ts
│   │       │   │   │   │   ├── cart.response.dto.ts
│   │       │   │   │   │   ├── cart-item.response.dto.ts
│   │       │   │   │   │   ├── cart-summary.response.dto.ts
│   │       │   │   │   │   ├── cart-validation.response.dto.ts
│   │       │   │   │   │   ├── cart-pricing.response.dto.ts
│   │       │   │   │   │   ├── saved-for-later.response.dto.ts
│   │       │   │   │   │   └── abandoned-cart.response.dto.ts
│   │       │   │   │   │
│   │       │   │   │   ├── 📁 mappers/
│   │       │   │   │   │   ├── index.ts
│   │       │   │   │   │   ├── cart.mapper.ts
│   │       │   │   │   │   ├── cart-item.mapper.ts
│   │       │   │   │   │   ├── saved-for-later.mapper.ts
│   │       │   │   │   │   └── cart-coupon.mapper.ts
│   │       │   │   │   │
│   │       │   │   │   ├── 📁 interfaces/
│   │       │   │   │   │   ├── index.ts
│   │       │   │   │   │   ├── cart.dto.interface.ts
│   │       │   │   │   │   └── cart-item.dto.interface.ts
│   │       │   │   │   │
│   │       │   │   │   └── 📁 validators/
│   │       │   │   │       ├── index.ts
│   │       │   │   │       ├── cart.validator.ts
│   │       │   │   │       ├── cart-item.validator.ts
│   │       │   │   │       └── coupon.validator.ts
│   │       │   │   │
│   │       │   │   └── 📁 services/
│   │       │   │       ├── index.ts
│   │       │   │       ├── 📁 interfaces/
│   │       │   │       │   ├── index.ts
│   │       │   │       │   ├── cart.service.interface.ts
│   │       │   │       │   ├── cart-item.service.interface.ts
│   │       │   │       │   ├── cart-pricing.service.interface.ts
│   │       │   │       │   ├── cart-validation.service.interface.ts
│   │       │   │       │   ├── saved-for-later.service.interface.ts
│   │       │   │       │   ├── abandoned-cart.service.interface.ts
│   │       │   │       │   ├── cart-merger.service.interface.ts
│   │       │   │       │   └── cart-guest.service.interface.ts
│   │       │   │       │
│   │       │   │       ├── 📁 impl/
│   │       │   │       │   ├── index.ts
│   │       │   │       │   ├── cart.service.ts
│   │       │   │       │   ├── cart-item.service.ts
│   │       │   │       │   ├── cart-pricing.service.ts
│   │       │   │       │   ├── cart-validation.service.ts
│   │       │   │       │   ├── saved-for-later.service.ts
│   │       │   │       │   ├── abandoned-cart.service.ts
│   │       │   │       │   ├── cart-merger.service.ts
│   │       │   │       │   └── cart-guest.service.ts
│   │       │   │       │
│   │       │   │       └── 📁 errors/
│   │       │   │           ├── index.ts
│   │       │   │           ├── cart.errors.ts
│   │       │   │           ├── cart-item.errors.ts
│   │       │   │           ├── coupon.errors.ts
│   │       │   │           ├── stock.errors.ts
│   │       │   │           └── pricing.errors.ts
│   │       │   │
│   │       │   ├── 📁 interfaces/
│   │       │   │   │
│   │       │   │   └── 📁 dtos/
│   │       │   │       │
│   │       │   │       ├── 📁 requests/
│   │       │   │       │   ├── index.ts
│   │       │   │       │   ├── cart.request.dto.ts
│   │       │   │       │   ├── cart-item.request.dto.ts
│   │       │   │       │   └── coupon.request.dto.ts
│   │       │   │       │
│   │       │   │       ├── 📁 responses/
│   │       │   │       │   ├── index.ts
│   │       │   │       │   ├── cart.response.dto.ts
│   │       │   │       │   └── cart-item.response.dto.ts
│   │       │   │       │
│   │       │   │       ├── 📁 mappers/
│   │       │   │       │   ├── index.ts
│   │       │   │       │   ├── cart.controller.mapper.ts
│   │       │   │       │   └── cart-item.controller.mapper.ts
│   │       │   │       │
│   │       │   │       ├── 📁 validators/
│   │       │   │       │   ├── index.ts
│   │       │   │       │   ├── cart.validator.ts
│   │       │   │       │   └── cart-item.validator.ts
│   │       │   │       │
│   │       │   │       └── 📁 interfaces/
│   │       │   │           ├── index.ts
│   │       │   │           └── cart.controller.interface.ts
│   │       │   │
│   │       │   └── 📁 controllers/
│   │       │       │
│   │       │       ├── index.ts
│   │       │       ├── 📁 rest/
│   │       │       │   ├── index.ts
│   │       │       │   ├── cart.controller.ts
│   │       │       │   ├── cart-item.controller.ts
│   │       │       │   ├── saved-for-later.controller.ts
│   │       │       │   ├── cart-coupon.controller.ts
│   │       │       │   └── abandoned-cart.controller.ts
│   │       │       │
│   │       │       ├── 📁 guards/
│   │       │       │   ├── index.ts
│   │       │       │   ├── jwt-auth.guard.ts
│   │       │       │   ├── cart-owner.guard.ts
│   │       │       │   ├── guest-cart.guard.ts
│   │       │       │   └── rate-limit.guard.ts
│   │       │       │
│   │       │       ├── 📁 interceptors/
│   │       │       │   ├── index.ts
│   │       │       │   ├── audit.interceptor.ts
│   │       │       │   ├── cart.cache.interceptor.ts
│   │       │       │   └── cart-pricing.interceptor.ts
│   │       │       │
│   │       │       └── 📁 decorators/
│   │       │           ├── index.ts
│   │       │           ├── cart-owner.decorator.ts
│   │       │           └── guest-id.decorator.ts
│   │       │
│   │       ├── 📁 infrastructure/
│   │       │   │
│   │       │   ├── 📁 repositories/
│   │       │   │   ├── index.ts
│   │       │   │   ├── 📁 prisma/
│   │       │   │   │   ├── index.ts
│   │       │   │   │   ├── cart.repository.prisma.ts
│   │       │   │   │   ├── cart-item.repository.prisma.ts
│   │       │   │   │   ├── saved-for-later.repository.prisma.ts
│   │       │   │   │   ├── cart-promotion.repository.prisma.ts
│   │       │   │   │   ├── cart-coupon.repository.prisma.ts
│   │       │   │   │   ├── abandoned-cart.repository.prisma.ts
│   │       │   │   │   ├── cart-guest.repository.prisma.ts
│   │       │   │   │   ├── cart-merger.repository.prisma.ts
│   │       │   │   │   └── cart-settings.repository.prisma.ts
│   │       │   │   │
│   │       │   │   └── 📁 cache/
│   │       │   │       ├── index.ts
│   │       │   │       ├── cart.cache.ts
│   │       │   │       ├── cart-item.cache.ts
│   │       │   │       └── abandoned-cart.cache.ts
│   │       │   │
│   │       │   ├── 📁 prisma/
│   │       │   │   ├── schema.prisma
│   │       │   │   ├── seed.ts
│   │       │   │   ├── prisma.service.ts
│   │       │   │   └── prisma.module.ts
│   │       │   │
│   │       │   ├── 📁 services/
│   │       │   │   ├── index.ts
│   │       │   │   ├── 📁 external/
│   │       │   │   │   ├── product.service.ts          # Call product-service
│   │       │   │   │   ├── inventory.service.ts        # Call inventory-service
│   │       │   │   │   ├── pricing.service.ts          # Call pricing-service
│   │       │   │   │   ├── coupon.service.ts           # Call promotion-service
│   │       │   │   │   ├── tax.service.ts              # Call tax-service
│   │       │   │   │   ├── shipping.service.ts         # Call logistics-service
│   │       │   │   │   └── loyalty.service.ts          # Call loyalty-service
│   │       │   │   │
│   │       │   │   └── 📁 internal/
│   │       │   │       ├── cart-lock.service.ts
│   │       │   │       ├── cart-expiry.service.ts
│   │       │   │       └── cart-recovery.service.ts
│   │       │   │
│   │       │   ├── 📁 workers/
│   │       │   │   ├── index.ts
│   │       │   │   ├── abandoned-cart.worker.ts
│   │       │   │   ├── cart-cleanup.worker.ts
│   │       │   │   ├── cart-sync.worker.ts
│   │       │   │   └── price-update.worker.ts
│   │       │   │
│   │       │   ├── 📁 queues/
│   │       │   │   ├── index.ts
│   │       │   │   ├── cart.queue.ts
│   │       │   │   ├── abandoned-cart.queue.ts
│   │       │   │   └── cart-notification.queue.ts
│   │       │   │
│   │       │   └── 📁 config/
│   │       │       ├── index.ts
│   │       │       ├── cart.config.ts
│   │       │       ├── redis.config.ts
│   │       │       └── external-services.config.ts
│   │       │
│   │       └── 📁 modules/
│   │           │
│   │           ├── index.ts
│   │           ├── app.module.ts
│   │           │
│   │           ├── 📁 cart/
│   │           │   ├── cart.module.ts
│   │           │   ├── index.ts
│   │           │   ├── 📁 commands/
│   │           │   │   ├── index.ts
│   │           │   │   ├── create-cart.handler.ts
│   │           │   │   ├── update-cart.handler.ts
│   │           │   │   ├── delete-cart.handler.ts
│   │           │   │   ├── clear-cart.handler.ts
│   │           │   │   ├── update-shipping.handler.ts
│   │           │   │   ├── update-billing.handler.ts
│   │           │   │   ├── add-gift-wrap.handler.ts
│   │           │   │   ├── update-cart-note.handler.ts
│   │           │   │   ├── lock-cart.handler.ts
│   │           │   │   ├── unlock-cart.handler.ts
│   │           │   │   └── convert-guest-cart.handler.ts
│   │           │   ├── 📁 queries/
│   │           │   │   ├── index.ts
│   │           │   │   ├── get-cart.handler.ts
│   │           │   │   ├── get-cart-by-user.handler.ts
│   │           │   │   ├── get-cart-by-guest-id.handler.ts
│   │           │   │   ├── get-cart-summary.handler.ts
│   │           │   │   ├── get-cart-pricing.handler.ts
│   │           │   │   ├── validate-cart.handler.ts
│   │           │   │   ├── check-cart-eligibility.handler.ts
│   │           │   │   └── get-cart-totals.handler.ts
│   │           │   ├── 📁 events/
│   │           │   │   ├── index.ts
│   │           │   │   ├── cart-created.handler.ts
│   │           │   │   ├── cart-updated.handler.ts
│   │           │   │   ├── cart-cleared.handler.ts
│   │           │   │   ├── cart-expired.handler.ts
│   │           │   │   ├── cart-converted.handler.ts
│   │           │   │   └── cart.event-store.ts
│   │           │   ├── 📁 sagas/
│   │           │   │   ├── index.ts
│   │           │   │   ├── cart.saga.ts
│   │           │   │   └── 📁 commands/
│   │           │   │       ├── update-inventory.command.ts
│   │           │   │       ├── send-reminder.command.ts
│   │           │   │       └── update-analytics.command.ts
│   │           │   └── 📁 health/
│   │           │       ├── index.ts
│   │           │       ├── cart.health.ts
│   │           │       ├── cart.health.module.ts
│   │           │       └── cart.controller.ts
│   │           │
│   │           ├── 📁 cart-item/
│   │           │   ├── cart-item.module.ts
│   │           │   ├── index.ts
│   │           │   ├── 📁 commands/
│   │           │   │   ├── index.ts
│   │           │   │   ├── add-to-cart.handler.ts
│   │           │   │   ├── update-cart-item.handler.ts
│   │           │   │   ├── remove-from-cart.handler.ts
│   │           │   │   ├── bulk-add-to-cart.handler.ts
│   │           │   │   ├── update-multiple-items.handler.ts
│   │           │   │   ├── validate-item-stock.handler.ts
│   │           │   │   └── recalculate-item-price.handler.ts
│   │           │   ├── 📁 queries/
│   │           │   │   ├── index.ts
│   │           │   │   ├── get-cart-items.handler.ts
│   │           │   │   ├── get-cart-item.handler.ts
│   │           │   │   ├── get-cart-items-count.handler.ts
│   │           │   │   └── check-item-exists.handler.ts
│   │           │   ├── 📁 events/
│   │           │   │   ├── index.ts
│   │           │   │   ├── item-added.handler.ts
│   │           │   │   ├── item-updated.handler.ts
│   │           │   │   ├── item-removed.handler.ts
│   │           │   │   ├── item-out-of-stock.handler.ts
│   │           │   │   └── item-price-changed.handler.ts
│   │           │   └── 📁 health/
│   │           │       ├── index.ts
│   │           │       └── cart-item.health.ts
│   │           │
│   │           ├── 📁 saved-for-later/
│   │           │   ├── saved-for-later.module.ts
│   │           │   ├── index.ts
│   │           │   ├── 📁 commands/
│   │           │   │   ├── index.ts
│   │           │   │   ├── move-to-saved.handler.ts
│   │           │   │   ├── move-to-cart.handler.ts
│   │           │   │   ├── remove-from-saved.handler.ts
│   │           │   │   └── move-all-to-cart.handler.ts
│   │           │   ├── 📁 queries/
│   │           │   │   ├── index.ts
│   │           │   │   ├── get-saved-items.handler.ts
│   │           │   │   └── get-saved-count.handler.ts
│   │           │   └── 📁 events/
│   │           │       ├── index.ts
│   │           │       └── moved-to-saved.handler.ts
│   │           │
│   │           ├── 📁 cart-coupon/
│   │           │   ├── cart-coupon.module.ts
│   │           │   ├── index.ts
│   │           │   ├── 📁 commands/
│   │           │   │   ├── index.ts
│   │           │   │   ├── apply-coupon.handler.ts
│   │           │   │   ├── remove-coupon.handler.ts
│   │           │   │   ├── validate-coupon.handler.ts
│   │           │   │   └── apply-best-coupon.handler.ts
│   │           │   ├── 📁 queries/
│   │           │   │   ├── index.ts
│   │           │   │   ├── get-applied-coupons.handler.ts
│   │           │   │   └── get-available-coupons.handler.ts
│   │           │   └── 📁 events/
│   │           │       ├── index.ts
│   │           │       ├── coupon-applied.handler.ts
│   │           │       └── coupon-removed.handler.ts
│   │           │
│   │           ├── 📁 abandoned-cart/
│   │           │   ├── abandoned-cart.module.ts
│   │           │   ├── index.ts
│   │           │   ├── 📁 commands/
│   │           │   │   ├── index.ts
│   │           │   │   ├── track-abandoned-cart.handler.ts
│   │           │   │   ├── recover-abandoned-cart.handler.ts
│   │           │   │   ├── send-recovery-email.handler.ts
│   │           │   │   └── cleanup-abandoned-carts.handler.ts
│   │           │   ├── 📁 queries/
│   │           │   │   ├── index.ts
│   │           │   │   ├── get-abandoned-carts.handler.ts
│   │           │   │   ├── get-abandoned-stats.handler.ts
│   │           │   │   └── get-recovery-rate.handler.ts
│   │           │   ├── 📁 events/
│   │           │   │   ├── index.ts
│   │           │   │   ├── cart-abandoned.handler.ts
│   │           │   │   ├── cart-recovered.handler.ts
│   │           │   │   └── reminder-sent.handler.ts
│   │           │   └── 📁 sagas/
│   │           │       ├── index.ts
│   │           │       ├── abandoned-cart.saga.ts
│   │           │       └── 📁 commands/
│   │           │           ├── send-reminder.command.ts
│   │           │           ├── apply-discount.command.ts
│   │           │           └── notify-admin.command.ts
│   │           │
│   │           ├── 📁 cart-merger/
│   │           │   ├── cart-merger.module.ts
│   │           │   ├── index.ts
│   │           │   ├── 📁 commands/
│   │           │   │   ├── index.ts
│   │           │   │   ├── merge-guest-cart.handler.ts
│   │           │   │   ├── merge-carts.handler.ts
│   │           │   │   ├── resolve-conflicts.handler.ts
│   │           │   │   └── sync-cart-devices.handler.ts
│   │           │   ├── 📁 queries/
│   │           │   │   ├── index.ts
│   │           │   │   ├── get-merge-preview.handler.ts
│   │           │   │   └── get-cart-conflicts.handler.ts
│   │           │   └── 📁 events/
│   │           │       ├── index.ts
│   │           │       └── cart-merged.handler.ts
│   │           │
│   │           └── 📁 cart-guest/
│   │               ├── cart-guest.module.ts
│   │               ├── index.ts
│   │               ├── 📁 commands/
│   │               │   ├── index.ts
│   │               │   ├── create-guest-cart.handler.ts
│   │               │   ├── link-guest-to-user.handler.ts
│   │               │   ├── extend-guest-cart.handler.ts
│   │               │   └── expire-guest-cart.handler.ts
│   │               ├── 📁 queries/
│   │               │   ├── index.ts
│   │               │   ├── get-guest-cart.handler.ts
│   │               │   └── validate-guest-session.handler.ts
│   │               └── 📁 events/
│   │                   ├── index.ts
│   │                   └── guest-cart-linked.handler.ts
│   │





│   ├── 📁 admin-dashboard/                          # Web Admin Dashboard
│   │   │
│   │   ├── 📄 package.json
│   │   ├── 📄 next.config.js
│   │   ├── 📄 tsconfig.json
│   │   ├── 📄 .env.example
│   │   │
│   │   ├── 📁 src/
│   │   │   │
│   │   │   ├── 📁 api/
│   │   │   │   ├── 📁 clients/
│   │   │   │   │   ├── 📄 axios.client.ts
│   │   │   │   │   └── 📄 fetch.client.ts
│   │   │   │   ├── 📁 endpoints/
│   │   │   │   │   ├── 📁 cart/
│   │   │   │   │   │   ├── 📄 cart.endpoints.ts
│   │   │   │   │   │   ├── 📄 abandoned-cart.endpoints.ts
│   │   │   │   │   │   ├── 📄 cart-analytics.endpoints.ts
│   │   │   │   │   │   └── 📄 cart-settings.endpoints.ts
│   │   │   │   │   └── 📄 index.ts
│   │   │   │   └── 📄 index.ts
│   │   │   │
│   │   │   ├── 📁 types/
│   │   │   │   ├── 📁 cart/
│   │   │   │   │   ├── 📄 cart.types.ts
│   │   │   │   │   ├── 📄 abandoned-cart.types.ts
│   │   │   │   │   ├── 📄 cart-analytics.types.ts
│   │   │   │   │   └── 📄 cart-settings.types.ts
│   │   │   │   └── 📄 index.ts
│   │   │   │
│   │   │   ├── 📁 hooks/
│   │   │   │   ├── 📁 queries/
│   │   │   │   │   ├── 📄 useCarts.ts
│   │   │   │   │   ├── 📄 useCartDetail.ts
│   │   │   │   │   ├── 📄 useAbandonedCarts.ts
│   │   │   │   │   ├── 📄 useCartAnalytics.ts
│   │   │   │   │   └── 📄 useCartSettings.ts
│   │   │   │   ├── 📁 mutations/
│   │   │   │   │   ├── 📄 useUpdateCartSettings.ts
│   │   │   │   │   ├── 📄 useSendRecoveryEmail.ts
│   │   │   │   │   └── 📄 useClearAbandonedCarts.ts
│   │   │   │   └── 📄 index.ts
│   │   │   │
│   │   │   ├── 📁 contexts/
│   │   │   │   ├── 📄 CartAdminContext.tsx
│   │   │   │   └── 📄 index.ts
│   │   │   │
│   │   │   ├── 📁 components/
│   │   │   │   └── 📁 admin/                       # Admin-specific components only
│   │   │   │       ├── 📁 carts/
│   │   │   │       │   ├── 📄 CartList.tsx
│   │   │   │       │   ├── 📄 CartDetail.tsx
│   │   │   │       │   ├── 📄 CartTable.tsx
│   │   │   │       │   ├── 📄 CartFilters.tsx
│   │   │   │       │   └── 📄 CartAnalytics.tsx
│   │   │   │       ├── 📁 abandoned-carts/
│   │   │   │       │   ├── 📄 AbandonedCartList.tsx
│   │   │   │       │   ├── 📄 AbandonedCartDetail.tsx
│   │   │   │       │   ├── 📄 RecoveryReport.tsx
│   │   │   │       │   └── 📄 SendRecoveryEmail.tsx
│   │   │   │       ├── 📁 settings/
│   │   │   │       │   ├── 📄 CartSettings.tsx
│   │   │   │       │   ├── 📄 AbandonedCartSettings.tsx
│   │   │   │       │   └── 📄 CartLimitsSettings.tsx
│   │   │   │       └── 📁 reports/
│   │   │   │           ├── 📄 CartReport.tsx
│   │   │   │           ├── 📄 AbandonedCartReport.tsx
│   │   │   │           └── 📄 CartConversionReport.tsx
│   │   │   │
│   │   │   ├── 📁 composition/
│   │   │   │   ├── 📁 layouts/
│   │   │   │   │   ├── 📁 partials/
│   │   │   │   │   │   ├── 📄 AdminHeader.tsx    # Uses packages/ui
│   │   │   │   │   │   ├── 📄 AdminSidebar.tsx   # Uses packages/ui
│   │   │   │   │   │   └── 📄 AdminFooter.tsx    # Uses packages/ui
│   │   │   │   │   └── 📄 AdminDashboardLayout.tsx
│   │   │   │   │
│   │   │   │   ├── 📁 widgets/
│   │   │   │   │   ├── 📁 stats/
│   │   │   │   │   │   ├── 📄 TotalCartsWidget.tsx
│   │   │   │   │   │   ├── 📄 AbandonedCartsWidget.tsx
│   │   │   │   │   │   ├── 📄 RecoveryRateWidget.tsx
│   │   │   │   │   │   └── 📄 AverageCartValueWidget.tsx
│   │   │   │   │   └── 📁 charts/
│   │   │   │   │       ├── 📄 CartTrendChart.tsx
│   │   │   │   │       └── 📄 AbandonedCartChart.tsx
│   │   │   │   │
│   │   │   │   └── 📁 providers/
│   │   │   │       └── 📄 AdminCartProvider.tsx
│   │   │   │
│   │   │   └── 📁 styles/
│   │   │       ├── 📄 globals.css                # Imports packages/ui/styles
│   │   │       ├── 📄 admin-specific.css
│   │   │       └── 📄 admin-dashboard.css
│   │   │
│   │   └── 📁 pages/
│   │       ├── 📄 _app.tsx
│   │       ├── 📄 _document.tsx
│   │       ├── 📄 index.tsx
│   │       ├── 📁 carts/
│   │       │   ├── 📄 index.tsx
│   │       │   ├── 📄 [id].tsx
│   │       │   └── 📄 analytics.tsx
│   │       ├── 📁 abandoned-carts/
│   │       │   ├── 📄 index.tsx
│   │       │   └── 📄 recovery.tsx
│   │       ├── 📁 settings/
│   │       │   └── 📄 cart.tsx
│   │       └── 📄 404.tsx
│   │
│   ├── 📁 seller-dashboard/                        # Web Seller Dashboard
│   │   │
│   │   ├── 📄 package.json
│   │   ├── 📄 next.config.js
│   │   ├── 📄 tsconfig.json
│   │   ├── 📄 .env.example
│   │   │
│   │   ├── 📁 src/
│   │   │   │
│   │   │   ├── 📁 api/
│   │   │   │   ├── 📁 clients/
│   │   │   │   │   ├── 📄 axios.client.ts
│   │   │   │   │   └── 📄 fetch.client.ts
│   │   │   │   ├── 📁 endpoints/
│   │   │   │   │   ├── 📁 seller-cart/
│   │   │   │   │   │   ├── 📄 cart-stats.endpoints.ts
│   │   │   │   │   │   └── 📄 cart-items.endpoints.ts
│   │   │   │   │   └── 📄 index.ts
│   │   │   │   └── 📄 index.ts
│   │   │   │
│   │   │   ├── 📁 types/
│   │   │   │   ├── 📁 seller-cart/
│   │   │   │   │   ├── 📄 cart-stats.types.ts
│   │   │   │   │   └── 📄 cart-item.types.ts
│   │   │   │   └── 📄 index.ts
│   │   │   │
│   │   │   ├── 📁 hooks/
│   │   │   │   ├── 📁 queries/
│   │   │   │   │   ├── 📄 useSellerCartStats.ts
│   │   │   │   │   ├── 📄 useSellerCartItems.ts
│   │   │   │   │   └── 📄 useAbandonedCarts.ts
│   │   │   │   └── 📄 index.ts
│   │   │   │
│   │   │   ├── 📁 components/
│   │   │   │   └── 📁 seller/                     # Seller-specific components only
│   │   │   │       ├── 📁 carts/
│   │   │   │       │   ├── 📄 CartStats.tsx
│   │   │   │       │   ├── 📄 CartItemsList.tsx
│   │   │   │       │   └── 📄 AbandonedCartAlert.tsx
│   │   │   │       └── 📁 widgets/
│   │   │   │           ├── 📄 CartValueWidget.tsx
│   │   │   │           └── 📄 PopularInCartsWidget.tsx
│   │   │   │
│   │   │   ├── 📁 composition/
│   │   │   │   ├── 📁 layouts/
│   │   │   │   │   ├── 📁 partials/
│   │   │   │   │   │   ├── 📄 SellerHeader.tsx   # Uses packages/ui
│   │   │   │   │   │   ├── 📄 SellerSidebar.tsx  # Uses packages/ui
│   │   │   │   │   │   └── 📄 SellerFooter.tsx   # Uses packages/ui
│   │   │   │   │   └── 📄 SellerDashboardLayout.tsx
│   │   │   │   │
│   │   │   │   └── 📁 providers/
│   │   │   │       └── 📄 SellerCartProvider.tsx
│   │   │   │
│   │   │   └── 📁 styles/
│   │   │       ├── 📄 globals.css                # Imports packages/ui/styles
│   │   │       └── 📄 seller-specific.css
│   │   │
│   │   └── 📁 pages/
│   │       ├── 📄 _app.tsx
│   │       ├── 📄 _document.tsx
│   │       ├── 📄 index.tsx
│   │       ├── 📁 carts/
│   │       │   ├── 📄 index.tsx
│   │       │   └── 📄 abandoned.tsx
│   │       └── 📄 404.tsx
│   │
│   └── 📁 customer-app/                            # Web Customer App
│       │
│       ├── 📄 package.json
│       ├── 📄 next.config.js
│       ├── 📄 tsconfig.json
│       ├── 📄 .env.example
│       │
│       ├── 📁 src/
│       │   │
│       │   ├── 📁 api/
│       │   │   ├── 📁 clients/
│       │   │   │   ├── 📄 axios.client.ts
│       │   │   │   └── 📄 fetch.client.ts
│       │   │   ├── 📁 endpoints/
│       │   │   │   ├── 📁 customer-cart/
│       │   │   │   │   ├── 📄 cart.endpoints.ts
│       │   │   │   │   ├── 📄 cart-item.endpoints.ts
│       │   │   │   │   ├── 📄 saved-for-later.endpoints.ts
│       │   │   │   │   ├── 📄 coupon.endpoints.ts
│       │   │   │   │   └── 📄 checkout.endpoints.ts
│       │   │   │   └── 📄 index.ts
│       │   │   └── 📄 index.ts
│       │   │
│       │   ├── 📁 types/
│       │   │   ├── 📁 customer-cart/
│       │   │   │   ├── 📄 cart.types.ts
│       │   │   │   ├── 📄 cart-item.types.ts
│       │   │   │   ├── 📄 saved-for-later.types.ts
│       │   │   │   ├── 📄 coupon.types.ts
│       │   │   │   └── 📄 checkout.types.ts
│       │   │   └── 📄 index.ts
│       │   │
│       │   ├── 📁 hooks/
│       │   │   ├── 📁 queries/
│       │   │   │   ├── 📄 useCart.ts
│       │   │   │   ├── 📄 useCartSummary.ts
│       │   │   │   ├── 📄 useCartItems.ts
│       │   │   │   ├── 📄 useCartTotals.ts
│       │   │   │   ├── 📄 useSavedForLater.ts
│       │   │   │   ├── 📄 useAvailableCoupons.ts
│       │   │   │   └── 📄 useCartValidation.ts
│       │   │   ├── 📁 mutations/
│       │   │   │   ├── 📄 useAddToCart.ts
│       │   │   │   ├── 📄 useUpdateCartItem.ts
│       │   │   │   ├── 📄 useRemoveFromCart.ts
│       │   │   │   ├── 📄 useBulkAddToCart.ts
│       │   │   │   ├── 📄 useUpdateMultipleItems.ts
│       │   │   │   ├── 📄 useClearCart.ts
│       │   │   │   ├── 📄 useApplyCoupon.ts
│       │   │   │   ├── 📄 useRemoveCoupon.ts
│       │   │   │   ├── 📄 useMoveToSavedForLater.ts
│       │   │   │   ├── 📄 useMoveToCart.ts
│       │   │   │   ├── 📄 useUpdateCartShipping.ts
│       │   │   │   ├── 📄 useEstimateShipping.ts
│       │   │   │   ├── 📄 useCalculateTax.ts
│       │   │   │   ├── 📄 useAddGiftWrap.ts
│       │   │   │   ├── 📄 useUpdateCartNote.ts
│       │   │   │   └── 📄 useApplyLoyaltyPoints.ts
│       │   │   └── 📄 index.ts
│       │   │
│       │   ├── 📁 contexts/
│       │   │   ├── 📄 CartContext.tsx
│       │   │   ├── 📄 CartDrawerContext.tsx
│       │   │   └── 📄 index.ts
│       │   │
│       │   ├── 📁 components/
│       │   │   └── 📁 customer/                   # Customer-specific components only
│       │   │       ├── 📁 cart/
│       │   │       │   ├── 📄 CartPage.tsx       # Uses packages/ui/cart components
│       │   │       │   ├── 📄 CartItemList.tsx   # Uses packages/ui/cart components
│       │   │       │   ├── 📄 CartShipping.tsx   # Uses packages/ui/cart components
│       │   │       │   ├── 📄 CartNote.tsx       # Uses packages/ui/cart components
│       │   │       │   ├── 📄 CartProgressBar.tsx # Uses packages/ui/cart components
│       │   │       │   ├── 📄 FreeShippingBar.tsx # Uses packages/ui/cart components
│       │   │       │   ├── 📄 CartLoyaltyPoints.tsx # Uses packages/ui/cart components
│       │   │       │   └── 📄 CartRecommendations.tsx # Uses packages/ui/cart components
│       │   │       │
│       │   │       └── 📁 widgets/
│       │   │           └── (Customer-specific widgets only)
│       │   │
│       │   ├── 📁 composition/
│       │   │   ├── 📁 layouts/
│       │   │   │   ├── 📁 partials/
│       │   │   │   │   ├── 📄 CustomerHeader.tsx # Uses packages/ui
│       │   │   │   │   ├── 📄 CustomerFooter.tsx # Uses packages/ui
│       │   │   │   │   └── 📄 MobileMenu.tsx
│       │   │   │   └── 📄 CustomerLayout.tsx
│       │   │   │
│       │   │   ├── 📁 widgets/
│       │   │   │   ├── 📁 cart/
│       │   │   │   │   ├── 📄 CartWidget.tsx     # Uses packages/ui/cart
│       │   │   │   │   └── 📄 MiniCart.tsx       # Uses packages/ui/cart
│       │   │   │   └── 📁 user/
│       │   │   │       └── 📄 UserMenuWidget.tsx
│       │   │   │
│       │   │   └── 📁 providers/
│       │   │       ├── 📄 CartProvider.tsx
│       │   │       └── 📄 CartDrawerProvider.tsx
│       │   │
│       │   └── 📁 styles/
│       │       ├── 📄 globals.css                # Imports packages/ui/styles
│       │       └── 📄 customer-specific.css
│       │
│       └── 📁 pages/
│           ├── 📄 _app.tsx
│           ├── 📄 _document.tsx
│           ├── 📄 index.tsx
│           ├── 📁 cart/
│           │   ├── 📄 index.tsx
│           │   └── 📄 saved-for-later.tsx
│           ├── 📁 checkout/
│           │   └── 📄 index.tsx
│           └── 📄 404.tsx
│
├── 📁 shared/
│   │
│   ├── 📁 utils/
│   │   ├── 📁 cart/
│   │   │   ├── 📄 cart-calculator.utils.ts
│   │   │   ├── 📄 cart-validator.utils.ts
│   │   │   ├── 📄 price-calculator.utils.ts
│   │   │   ├── 📄 discount-calculator.utils.ts
│   │   │   ├── 📄 tax-calculator.utils.ts
│   │   │   ├── 📄 shipping-calculator.utils.ts
│   │   │   └── 📄 coupon-validator.utils.ts
│   │   ├── 📁 validation/
│   │   │   ├── 📄 cart.validation.ts
│   │   │   └── 📄 coupon.validation.ts
│   │   └── 📁 formatters/
│   │       ├── 📄 cart.formatter.ts
│   │       └── 📄 price.formatter.ts
│   │
│   └── 📁 constants/
│       ├── 📄 cart.constants.ts
│       ├── 📄 coupon.constants.ts
│       └── 📄 shipping.constants.ts
│
└── 📁 prisma/
    └── 📄 schema.prisma

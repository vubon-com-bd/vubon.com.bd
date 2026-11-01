/**
 * @CurrentVendor() — extracts vendor context from request
 * @module vendor-service/interfaces/decorators
 *
 * Injected by an upstream middleware/guard that resolves the vendor
 * tied to the authenticated user. Returns the vendorId, or undefined.
 */
import { createParamDecorator } from '@nestjs/common';
import type { ExecutionContext } from '@nestjs/common';

export interface CurrentVendorShape {
  readonly vendorId: string;
  readonly userId: string;
  readonly status?: string;
  readonly tier?: string;
}

export const CurrentVendor = createParamDecorator(
  (field: keyof CurrentVendorShape | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{
      vendor?: CurrentVendorShape;
    }>();
    const vendor = request.vendor;
    if (!vendor) return undefined;
    return field ? vendor[field] : vendor;
  },
);

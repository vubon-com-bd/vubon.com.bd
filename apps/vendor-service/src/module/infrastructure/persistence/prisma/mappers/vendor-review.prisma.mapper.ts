/**
 * VendorReviewPrismaMapper — row ↔ domain entity
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import { VendorReviewEntity } from '../../../../domain/entities/vendor-review.entity.js';
import { VendorReviewVO } from '../../../../domain/value-objects/composites/vendor-review.vo.js';
import { ReviewIdVO } from '../../../../domain/value-objects/primitives/review-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo.js';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo.js';
import { RatingValueVO } from '../../../../domain/value-objects/primitives/rating-value.vo.js';
import { ReviewContentVO } from '../../../../domain/value-objects/primitives/review-content.vo.js';
import { ReviewStatusVO } from '../../../../domain/value-objects/primitives/review-status.vo.js';

export interface VendorReviewPrismaRow {
  id: string;
  vendorId: string;
  userId: string;
  orderId: string | null;
  productId: string | null;
  rating: number;
  content: string;
  title: string | null;
  status: string;
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  flaggedCount: number;
  vendorReply: string | null;
  vendorRepliedAt: Date | null;
  submittedAt: Date;
  moderatedAt: Date | null;
  moderatedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const toIso = (d: Date | null): string | undefined =>
  d ? new Date(d).toISOString() : undefined;

export class VendorReviewPrismaMapper {
  static toDomain(raw: VendorReviewPrismaRow): VendorReviewEntity {
    const vo = VendorReviewVO.reconstitute({
      id: ReviewIdVO.reconstitute(raw.id),
      vendorId: VendorIdVO.reconstitute(raw.vendorId),
      userId: UserIdVO.reconstitute(raw.userId),
      orderId: raw.orderId ? OrderIdVO.reconstitute(raw.orderId) : undefined,
      productId: raw.productId ? ProductIdVO.reconstitute(raw.productId) : undefined,
      rating: RatingValueVO.reconstitute(raw.rating),
      content: ReviewContentVO.reconstitute(raw.content),
      title: raw.title ?? undefined,
      status: ReviewStatusVO.reconstitute(raw.status),
      isVerifiedPurchase: raw.isVerifiedPurchase,
      helpfulCount: raw.helpfulCount,
      flaggedCount: raw.flaggedCount,
      vendorReply: raw.vendorReply ?? undefined,
      vendorRepliedAt: toIso(raw.vendorRepliedAt),
      submittedAt: new Date(raw.submittedAt).toISOString(),
      moderatedAt: toIso(raw.moderatedAt),
      moderatedBy: raw.moderatedBy ?? undefined,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
    });

    return VendorReviewEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      props: { vo },
    });
  }

  static toPersistence(entity: VendorReviewEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      vendorId: vo.vendorId.value,
      userId: vo.userId.value,
      orderId: vo.orderId?.value ?? null,
      productId: vo.productId?.value ?? null,
      rating: vo.rating.rating,
      content: vo.content.value,
      title: vo.title ?? null,
      status: vo.status.value,
      isVerifiedPurchase: vo.isVerifiedPurchase,
      helpfulCount: vo.helpfulCount,
      flaggedCount: vo.flaggedCount,
      vendorReply: vo.vendorReply ?? null,
      vendorRepliedAt: vo.vendorRepliedAt ? new Date(vo.vendorRepliedAt) : null,
      submittedAt: new Date(vo.submittedAt),
      moderatedAt: vo.moderatedAt ? new Date(vo.moderatedAt) : null,
      moderatedBy: vo.moderatedBy ?? null,
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}

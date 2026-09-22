import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SubmitReviewCommand } from './submit-review.command';
import type { VendorReviewRepository } from '../../../domain/repositories/vendor-review.repository.interface';
import { VendorReviewEntity } from '../../../domain/entities/vendor-review.entity';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo';
import { ReviewIdVO } from '../../../domain/value-objects/primitives/review-id.vo';
import { ReviewContentVO } from '../../../domain/value-objects/primitives/review-content.vo';
import { ReviewStatusVO } from '../../../domain/value-objects/primitives/review-status.vo';
import { RatingValueVO } from '../../../domain/value-objects/primitives/rating-value.vo';
import type { ReviewResponseDto } from '../../dtos/responses/review-response.dto';

@CommandHandler(SubmitReviewCommand)
export class SubmitReviewHandler
  extends BaseCommandHandler<SubmitReviewCommand, ReviewResponseDto>
  implements ICommandHandler<SubmitReviewCommand>
{
  readonly commandType = 'vendor.review.submit';

  constructor(
    private readonly reviewRepo: VendorReviewRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: SubmitReviewCommand): Promise<ReviewResponseDto> {
    const entity = VendorReviewEntity.create({
      vendorId: VendorIdVO.create(command.vendorId),
      userId: UserIdVO.create(command.userId),
      orderId: OrderIdVO.create(command.orderId),
      rating: RatingValueVO.create(command.rating),
      content: command.content ? ReviewContentVO.create(command.content) : null,
      status: ReviewStatusVO.create('pending'),
    });

    await this.reviewRepo.save(entity);

    const events = entity.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }

    return {
      id: entity.id.value,
      vendorId: entity.vendorId.value,
      userId: entity.userId.value,
      orderId: entity.orderId.value,
      rating: entity.rating.value,
      content: entity.content?.value ?? null,
      status: entity.status.value,
      createdAt: entity.createdAt,
    };
  }
}

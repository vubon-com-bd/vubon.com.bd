import { Injectable } from '@nestjs/common';
import type { ReviewResponseDTO } from '../../application/dtos/responses/review-response.dto';
import type { ReviewHttpResponseDto } from '../dtos/responses/review.response.dto';

@Injectable()
export class ReviewControllerMapper {
  toHttp(dto: ReviewResponseDTO): ReviewHttpResponseDto {
    const r = dto as unknown as {
      id: string;
      userId: string;
      rating: number;
      comment?: string;
    };
    return {
      id: r.id,
      productId: '',
      userId: r.userId,
      rating: r.rating,
      content: r.comment ?? '',
      status: 'published',
    } as unknown as ReviewHttpResponseDto;
  }
}

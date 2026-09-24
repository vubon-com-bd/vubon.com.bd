import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SubmitFeedbackRequestDto } from '../dtos/requests/feedback.request.dto';
import { FeedbackResponseDto } from '../dtos/responses/feedback.response.dto';

export const FeedbackSwagger = {
  Tag: () => ApiTags('Feedback'),

  Submit: () =>
    applyDecorators(
      ApiOperation({ summary: 'Submit feedback' }),
      ApiBody({ type: SubmitFeedbackRequestDto }),
      ApiResponse({ status: 201, type: FeedbackResponseDto }),
    ),
};

import { FLASH_SALE_PARTICIPANT } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-participant.constants';

export interface ParticipantInput {
  userId: string;
  flashSaleId: string;
  status: string;
}

export const validateParticipant = (
  participant: Partial<ParticipantInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!participant.userId) errors.push('User ID is required');
  if (!participant.flashSaleId) errors.push('Flash sale ID is required');
  if (
    participant.status &&
    !Object.keys(FLASH_SALE_PARTICIPANT.STATUS).includes(participant.status)
  ) {
    errors.push('Invalid participant status');
  }
  return { isValid: errors.length === 0, errors };
};

export const isParticipantValid = (participant: ParticipantInput): boolean => {
  return participant.status === 'confirmed' || participant.status === 'completed';
};

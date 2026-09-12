export interface SupportScheduleInput {
  agentId: string;
  shiftStart: string;
  shiftEnd: string;
}

export const validateSupportSchedule = (
  schedule: Partial<SupportScheduleInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!schedule.agentId) errors.push('Agent ID is required');
  if (!schedule.shiftStart) errors.push('Shift start is required');
  if (!schedule.shiftEnd) errors.push('Shift end is required');
  if (schedule.shiftStart && schedule.shiftEnd && schedule.shiftStart >= schedule.shiftEnd) {
    errors.push('Shift start must be before shift end');
  }
  return { isValid: errors.length === 0, errors };
};

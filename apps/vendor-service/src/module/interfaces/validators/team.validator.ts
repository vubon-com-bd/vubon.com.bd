import { Injectable } from '@nestjs/common';

@Injectable()
export class TeamValidator {
  validateAddMember(input: unknown): void {
    const data = input as Record<string, unknown>;
    if (!data.userId || typeof data.userId !== 'string') {
      throw new Error('userId is required');
    }
    if (!data.role || typeof data.role !== 'string') {
      throw new Error('role is required');
    }
  }
}

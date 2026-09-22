import { SetMetadata } from '@nestjs/common';

export const TEAM_MEMBER_KEY = 'teamMemberRequired';
export const TeamMember = (): MethodDecorator & ClassDecorator =>
  SetMetadata(TEAM_MEMBER_KEY, true);

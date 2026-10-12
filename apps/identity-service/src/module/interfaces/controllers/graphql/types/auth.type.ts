/**
 * Auth GraphQL Type
 * @module identity-service/interfaces/controllers/graphql/types
 */
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Auth')
export class AuthGqlType {
  @Field() readonly id!: string;
  @Field() readonly userId!: string;
  @Field() readonly type!: string;
  @Field() readonly provider!: string;
  @Field() readonly status!: string;
  @Field() readonly isEmailVerified!: boolean;
  @Field() readonly isPhoneVerified!: boolean;
  @Field() readonly isMfaEnabled!: boolean;
}

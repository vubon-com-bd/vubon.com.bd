/**
 * User GraphQL Type
 * @module identity-service/interfaces/controllers/graphql/types
 */
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class UserGqlType {
  @Field() readonly id!: string;
  @Field() readonly email!: string;
  @Field({ nullable: true }) readonly firstName?: string;
  @Field({ nullable: true }) readonly lastName?: string;
  @Field({ nullable: true }) readonly username?: string;
  @Field() readonly status!: string;
  @Field() readonly type!: string;
  @Field(() => [String]) readonly roles!: readonly string[];
  @Field() readonly emailVerified!: boolean;
  @Field() readonly phoneVerified!: boolean;
  @Field() readonly isMfaEnabled!: boolean;
  @Field() readonly createdAt!: string;
}

/**
 * CreateUser GraphQL Input
 * @module identity-service/interfaces/controllers/graphql/inputs
 */
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserGqlInput {
  @Field() readonly email!: string;
  @Field() readonly password!: string;
  @Field({ nullable: true }) readonly phone?: string;
  @Field({ nullable: true }) readonly username?: string;
  @Field({ nullable: true }) readonly firstName?: string;
  @Field({ nullable: true }) readonly lastName?: string;
  @Field() readonly type!: string;
  @Field({ nullable: true }) readonly role?: string;
}

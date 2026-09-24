import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class TicketType {
  @Field(() => ID)
  id!: string;

  @Field()
  number!: string;

  @Field()
  subject!: string;

  @Field()
  description!: string;

  @Field()
  status!: string;

  @Field()
  priority!: string;

  @Field()
  type!: string;

  @Field()
  userId!: string;

  @Field()
  createdAt!: string;

  @Field()
  updatedAt!: string;
}

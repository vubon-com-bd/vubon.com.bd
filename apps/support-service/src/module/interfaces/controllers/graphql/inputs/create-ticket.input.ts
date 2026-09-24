import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTicketInput {
  @Field()
  subject!: string;

  @Field()
  description!: string;

  @Field({ nullable: true })
  priority?: string;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  channel?: string;
}

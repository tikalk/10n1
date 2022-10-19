import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { prop } from '@typegoose/typegoose';

@ObjectType()
export class Availability {
  @Field(() => ID, { nullable: true })
  _id?: string;

  @Field()
  @prop({ required: true })
  day?: string;

  @Field()
  @prop({ required: true })
  startTime?: string;

  @Field()
  @prop({ required: true })
  endTime?: string;

  @Field()
  @prop({ required: true })
  key?: string;
}

@InputType()
export class AvailabilityInput {
  @Field(() => ID, { nullable: true })
  _id?: string;

  @Field()
  day?: string;

  @Field()
  startTime?: string;

  @Field()
  endTime?: string;

  @Field()
  key?: string;
}

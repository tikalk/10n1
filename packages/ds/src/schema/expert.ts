import {
  Arg,
  Field,
  ID,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { Expertise, ExpertiseInput } from './expertise';
import { Availability, AvailabilityInput } from './availability';

@ObjectType()
export class SlackData {
  @Field()
  @prop()
  authedUserId?: string;

  @Field()
  @prop()
  accessToken?: string;
}

@InputType()
export class SlackDataInput {
  @Field()
  authedUserId?: string;

  @Field()
  accessToken?: string;
}

@ObjectType()
export class Expert {
  @Field(() => ID, { nullable: true })
  _id?: string;

  @Field()
  @prop({ required: true })
  name?: string;

  @Field()
  @prop({ index: true, unique: true, required: true })
  email?: string;

  @Field({ nullable: true })
  @prop()
  bio?: string;

  @Field({ nullable: true })
  @prop()
  phone?: string;

  @Field({ nullable: true })
  @prop()
  image?: string;

  @Field(() => [Expertise])
  @prop({ itemsRef: 'Expertise', type: () => [Expertise], required: true })
  expertise?: Ref<Expertise>[];

  @Field(() => [Availability])
  @prop({ required: true, type: () => [Availability] })
  availability?: Ref<Availability>[];

  @Field(() => SlackData, { nullable: true })
  @prop({ type: () => SlackData, required: false })
  slackData?: Ref<SlackData>;
}

@InputType()
export class ExpertInput {
  @Field(() => ID, { nullable: true })
  _id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  image?: string;

  @Field(() => [ExpertiseInput], { nullable: true })
  expertise?: Ref<ExpertiseInput>[];

  @Field(() => [AvailabilityInput], { nullable: true })
  availability?: Ref<AvailabilityInput>[];

  @Field(() => SlackDataInput, { nullable: true })
  slackData?: Ref<SlackDataInput>;
}
export const ExpertModel = getModelForClass(Expert);

@Resolver(() => Expert)
export class ExpertResolver {
  @Query(() => [Expert], { nullable: 'items' })
  // eslint-disable-next-line class-methods-use-this
  async experts(): Promise<Expert[]> {
    return ExpertModel.find({ 'expertise.0': { $exists: true } });
  }

  @Query(() => Expert, { nullable: true })
  // eslint-disable-next-line class-methods-use-this
  async expert(
    @Arg('email', { nullable: false }) email?: string,
  ): Promise<Expert> {
    return ExpertModel.findOne({ email });
  }

  @Mutation(() => Expert)
  // eslint-disable-next-line class-methods-use-this
  async addExpert(@Arg('input') newExpert: ExpertInput): Promise<Expert> {
    const newDoc = new ExpertModel(newExpert);
    await newDoc.save();
    return newDoc;
  }

  @Mutation(() => Expert)
  // eslint-disable-next-line class-methods-use-this
  async deleteExpert(@Arg('email') email: string): Promise<Expert> {
    return ExpertModel.findOneAndDelete({ email });
  }

  @Mutation(() => Expert)
  // eslint-disable-next-line class-methods-use-this
  async updateExpert(@Arg('input') newExpert: ExpertInput): Promise<Expert> {
    // eslint-disable-next-line no-underscore-dangle
    return ExpertModel.findOneAndUpdate({ email: newExpert.email }, newExpert);
  }
}

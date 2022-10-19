import {
  Field,
  ID,
  InputType,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { prop } from '@typegoose/typegoose';
import { ExpertModel } from './expert';

@ObjectType()
export class Expertise {
  @Field(() => ID, { nullable: true })
  _id?: string;

  @Field()
  @prop({ required: true })
  name?: string;
}

@InputType()
export class ExpertiseInput {
  @Field(() => ID, { nullable: true })
  _id?: string;

  @Field()
  name?: string;
}

@ObjectType()
export class ExpertiseSum {
  @Field(() => ID, { nullable: true })
  _id?: string;

  @Field(() => ID, { nullable: true })
  value?: string;

  @Field()
  @prop()
  count?: number;
}

@Resolver(() => ExpertiseSum)
export class ExpertiseResolver {
  @Query(() => [ExpertiseSum], { nullable: 'items' })
  // eslint-disable-next-line class-methods-use-this
  async expertise(): Promise<Expertise[]> {
    const aggregatorOpts = [
      {
        $match: {
          expertise: { $not: { $size: 0 } },
        },
      },
      { $unwind: '$expertise' },
      {
        $group: {
          _id: { $toLower: '$expertise.name' },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 100 },
    ];
    return ExpertModel.aggregate(aggregatorOpts).exec();
  }
}

import { buildSchema } from 'type-graphql';
import { Expert, ExpertResolver } from '../schema/expert';
import { ExpertiseResolver } from '../schema/expertise';

const schema = buildSchema({
  resolvers: [ExpertResolver, ExpertiseResolver],
  orphanedTypes: [Expert],
});

export default schema;

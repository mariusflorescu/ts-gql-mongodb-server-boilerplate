import {
  Arg,
  FieldResolver,
  Query,
  Mutation,
  Resolver,
  Ctx,
  Root,
} from "type-graphql"

import TestSchema from "./TestSchema"

@Resolver(of => TestSchema)
export class TestResolver {
  @Query(() => String)
  sample(): String {
    return "Hello"
  }

}
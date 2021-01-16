import { Field, ObjectType, ID } from "type-graphql"
import { Length } from "class-validator"

@ObjectType({ description: "Test Schema" })
export default class Test {
  @Field(() => ID)
  id: String

  @Field()
  @Length(4, 30)
  name: String

  @Field()
  @Length(6,32)
  text: String
}
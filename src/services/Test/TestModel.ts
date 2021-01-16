import * as Mongoose from "mongoose"

export interface ITest extends Mongoose.Document {
  name: String
  text: String
}

const TestSchema:Mongoose.Schema = new Mongoose.Schema({
  name:{ type: String, required: true},
  text:{ type: String, requried: true}
})

export default Mongoose.model<ITest>("Test",TestSchema)